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

    const required = ['facility_contact_name', 'facility_contact_phone', 'patient_name',
      'transport_type', 'trip_type', 'pickup_date', 'pickup_time',
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
Requested Pickup Time:  ${booking.pickup_time}
Oxygen Required:        ${booking.oxygen_required ? 'Yes' : 'No'}

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
      pickup_time: booking.pickup_time,
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
      subject: `NEW TRIP REQUEST — ${booking.facility_name || booking.facility_contact_name} · ${booking.pickup_date}`,
      text: summary,
    })

    return NextResponse.json({ success: true, message: 'Trip request received' }, { status: 201 })
  } catch (err) {
    console.error('[BOOKING ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
