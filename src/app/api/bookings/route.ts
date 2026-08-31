import { NextRequest, NextResponse } from 'next/server'
import type { BookingRequest } from '@/types'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const booking: BookingRequest = await req.json()

    // Validate required fields
    const required = ['facility_name', 'facility_contact_name', 'facility_contact_phone',
      'patient_initials', 'service_type', 'pickup_date', 'pickup_time',
      'pickup_address', 'destination_name', 'destination_address']
    for (const field of required) {
      if (!booking[field as keyof BookingRequest]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Format for owner notification email
    const serviceLabel = { wheelchair: 'Wheelchair', stretcher: 'Stretcher / Cot', ambulatory: 'Ambulatory' }[booking.service_type]
    const specialNeeds = [
      booking.oxygen_required && 'Oxygen required',
      booking.bariatric && 'Bariatric',
      booking.stairs && 'Stairs',
    ].filter(Boolean).join(', ') || 'None'

    const summary = `
NEW TRIP REQUEST — A-TEAM Transport Services

Facility: ${booking.facility_name}
Contact: ${booking.facility_contact_name} — ${booking.facility_contact_phone}
${booking.facility_contact_email ? `Email: ${booking.facility_contact_email}` : ''}

Patient Initials: ${booking.patient_initials}
Service Type: ${serviceLabel}
Date: ${booking.pickup_date} at ${booking.pickup_time}

Pickup: ${booking.pickup_address}
Destination: ${booking.destination_name}
           ${booking.destination_address}

Special Requirements: ${specialNeeds}
${booking.notes ? `\nNotes: ${booking.notes}` : ''}
    `.trim()

    console.log('[BOOKING RECEIVED]\n', summary)

    const { error: dbError } = await supabase.from('bookings').insert({
      facility_name: booking.facility_name,
      facility_contact_name: booking.facility_contact_name,
      facility_contact_phone: booking.facility_contact_phone,
      facility_contact_email: booking.facility_contact_email || null,
      patient_initials: booking.patient_initials,
      service_type: booking.service_type,
      pickup_date: booking.pickup_date,
      pickup_time: booking.pickup_time,
      pickup_address: booking.pickup_address,
      destination_name: booking.destination_name,
      destination_address: booking.destination_address,
      oxygen_required: booking.oxygen_required,
      bariatric: booking.bariatric,
      stairs: booking.stairs,
      notes: booking.notes || null,
      status: 'pending',
    })

    if (dbError) {
      console.error('[SUPABASE ERROR]', dbError)
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
    }

    await resend.emails.send({
      from: 'dispatch@myateamtransport.com',
      to: 'dispatch@myateamtransport.com',
      subject: `NEW TRIP REQUEST — ${booking.facility_name} · ${booking.pickup_date}`,
      text: summary,
    })

    return NextResponse.json({ success: true, message: 'Trip request received' }, { status: 201 })
  } catch (err) {
    console.error('[BOOKING ERROR]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
