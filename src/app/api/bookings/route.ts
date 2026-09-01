import { NextRequest, NextResponse } from 'next/server'
import type { BookingRequest } from '@/types'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TRANSPORT_LABELS: Record<string, string> = {
  standard_wheelchair: 'Standard Wheelchair (up to 250 lbs)',
  bariatric_wheelchair: 'Bariatric Wheelchair (250+ lbs)',
  stretcher: 'Stretcher',
  ambulatory: 'Ambulatory (Walking)',
}

export async function POST(req: NextRequest) {
  try {
    const booking: BookingRequest = await req.json()

    const required = ['facility_contact_name', 'facility_contact_phone', 'confirmation_email',
      'patient_name', 'transport_type', 'trip_type', 'pickup_date',
      'pickup_address', 'destination_address']
    for (const field of required) {
      if (!booking[field as keyof BookingRequest]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const transportLabel = TRANSPORT_LABELS[booking.transport_type] || booking.transport_type
    const tripLabel = booking.trip_type === 'round_trip' ? 'Round Trip' : 'One-Way'

    const summary = `
NEW TRIP REQUEST — A-TEAM Transport Services
${'='.repeat(48)}

REQUESTER INFORMATION
Requester Name:         ${booking.facility_contact_name}
Requester Phone:        ${booking.facility_contact_phone}
Requesting Facility:    ${booking.facility_name || 'N/A'}
Confirmation Email:     ${booking.confirmation_email || 'N/A'}

PATIENT INFORMATION
Patient Name:           ${booking.patient_name}
Patient Weight:         ${booking.patient_weight || 'Not provided'}

TRIP DETAILS
Type of Transport:      ${transportLabel}
Trip Type:              ${tripLabel}
Date of Transport:      ${booking.pickup_date}
Appointment Time:       ${booking.appt_time || 'N/A'}
Requested Pickup Time:  ${booking.pickup_time || 'N/A'}
PICKUP
Pickup Address:         ${booking.pickup_address}
Stairs at Pickup:       ${booking.pickup_stairs ? 'Yes' : 'No'}
Pickup Notes:           ${booking.pickup_notes || 'None'}

DROP-OFF
Drop-Off Address:       ${booking.destination_address}
Stairs at Drop-Off:     ${booking.dropoff_stairs ? 'Yes' : 'No'}
Drop-Off Notes:         ${booking.dropoff_notes || 'None'}
    `.trim()

    console.log('[BOOKING RECEIVED]\n', summary)

    const { error: dbError } = await supabase.from('bookings').insert({
      facility_contact_name: booking.facility_contact_name,
      facility_contact_phone: booking.facility_contact_phone,
      facility_name: booking.facility_name || null,
      confirmation_email: booking.confirmation_email || null,
      patient_name: booking.patient_name,
      patient_weight: booking.patient_weight || null,
      transport_type: booking.transport_type,
      trip_type: booking.trip_type,
      pickup_date: booking.pickup_date,
      appt_time: booking.appt_time || null,
      pickup_time: booking.pickup_time || null,
      pickup_address: booking.pickup_address,
      pickup_stairs: booking.pickup_stairs,
      pickup_notes: booking.pickup_notes || null,
      destination_address: booking.destination_address,
      dropoff_stairs: booking.dropoff_stairs,
      dropoff_notes: booking.dropoff_notes || null,
      oxygen_required: booking.oxygen_required,
      status: 'pending',
    })

    if (dbError) {
      console.error('[SUPABASE ERROR]', dbError)
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
    }

    await resend.emails.send({
      from: 'dispatch@myateamtransport.com',
      to: 'dispatch@myateamtransport.com',
      replyTo: booking.confirmation_email,
      subject: `NEW TRIP REQUEST — ${booking.facility_name || booking.facility_contact_name} · ${booking.pickup_date}`,
      text: summary,
    })

    // Customer confirmation email
    await resend.emails.send({
      from: 'dispatch@myateamtransport.com',
      to: booking.confirmation_email!,
      subject: 'Trip Request Received – ATEAM Transport Services',
      text: `Thank you for inquiring about our transportation services.

If this is a request to schedule transportation with us, our dispatch team will begin processing your request as soon as possible during our regular business hours, Monday–Friday, 9:00 AM–5:00 PM ET, excluding major holidays. All other inquiries will be responded to in a timely manner.

If your message was sent outside of our regular business hours, we will review and reply to your email during our normal operating hours.

Should you have further questions or need clarification, feel free to reach out to our team at dispatch@myateamtransport.com or visit our website at www.myateamtransport.com.

────────────────────────────────────────
Cancellation / No-Show Policy
If cancellations occur within 24 hours of the scheduled appointment or drop-off time, a cancellation fee will apply.
────────────────────────────────────────

A-TEAM Transport Services
Indianapolis, IN · Veteran-Owned
(317) 982-7417 · dispatch@myateamtransport.com
www.myateamtransport.com`,
    })

    return NextResponse.json({ success: true, message: 'Trip request received' }, { status: 201 })
  } catch (err) {
    console.error('[BOOKING ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
