'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import type { BookingRequest, TransportType, TripType } from '@/types'

const TRANSPORT_OPTIONS: { value: TransportType; label: string }[] = [
  { value: 'standard_wheelchair', label: 'Standard Wheelchair (up to 250 lbs)' },
  { value: 'bariatric_wheelchair', label: 'Bariatric Wheelchair (250+ lbs)' },
  { value: 'stretcher', label: 'Stretcher' },
  { value: 'ambulatory', label: 'Ambulatory (Walking)' },
]

const initialState: Omit<BookingRequest, 'status'> = {
  facility_contact_name: '',
  facility_contact_phone: '',
  facility_name: '',
  confirmation_email: '',
  patient_name: '',
  patient_weight: '',
  transport_type: 'standard_wheelchair',
  trip_type: 'one_way',
  pickup_date: '',
  appt_time: '',
  pickup_time: '',
  pickup_address: '',
  pickup_stairs: false,
  pickup_notes: '',
  destination_address: '',
  dropoff_stairs: false,
  dropoff_notes: '',
  oxygen_required: false,
}

export default function BookingPage() {
  const [form, setForm] = useState(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function set(field: keyof typeof initialState, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.appt_time && !form.pickup_time) { setError('Please enter an Appointment Time or a Requested Pickup Time.'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: 'pending' }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us at (317) 982-7417 to request your trip.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--pos)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>✓</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text)', marginBottom: '.75rem' }}>Trip Request Received</h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            We&apos;ll confirm this trip within 30 minutes during business hours. For urgent requests, call us directly.
          </p>
          <a href="tel:3179827417" style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.75rem 1.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
            Call (317) 982-7417
          </a>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.75rem' }}>
            <a href="/" style={{ display: 'inline-block', border: '1px solid var(--border)', color: 'var(--text)', background: 'var(--bg-panel)', padding: '.75rem 1.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
              Return to Homepage
            </a>
            <button onClick={() => { setSubmitted(false); setForm(initialState) }} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.9rem', textDecoration: 'underline' }}>
              Submit another request
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '0 0 4rem' }}>
      <Nav />
      <style>{`
        input[type=text],input[type=tel],input[type=email],input[type=date],input[type=time],input[type=number],textarea,select {
          background:var(--bg-panel);border:1px solid var(--border);border-radius:4px;color:var(--text);
          font-family:var(--font-sans);font-size:.9rem;padding:.65rem .8rem;width:100%;outline:none;
        }
        input:focus,textarea:focus,select:focus{border-color:var(--accent);}
        input::placeholder,textarea::placeholder{color:var(--text-3)}
        input[type=date]::-webkit-calendar-picker-indicator,input[type=time]::-webkit-calendar-picker-indicator{filter:invert(1);opacity:.6;cursor:pointer;}
        input[type=date],input[type=time]{cursor:pointer;}
      `}</style>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <p style={{ color: 'var(--text-2)', marginBottom: '2rem', lineHeight: 1.7, fontSize: '.95rem' }}>
          Serving Central Indiana since October 2016. Complete the form below and we&apos;ll confirm your trip within 30 minutes during business hours.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* REQUESTER INFO */}
          <section>
            <SectionLabel>Requester Information</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                <Field label="Requester Name" required>
                  <input required value={form.facility_contact_name} onChange={e => set('facility_contact_name', e.target.value)} placeholder="Jane Doe" />
                </Field>
                <Field label="Requester Phone Number" required>
                  <input required type="tel" value={form.facility_contact_phone} onChange={e => set('facility_contact_phone', e.target.value)} placeholder="(812) 123-4567" />
                </Field>
              </div>
              <Field label="Requesting Facility Name (if applicable)">
                <input value={form.facility_name} onChange={e => set('facility_name', e.target.value)} placeholder="Bloomington Regional Rehabilitation Hospital" />
              </Field>
              <Field label="Trip Confirmation Email (optional)">
                <input type="email" value={form.confirmation_email} onChange={e => set('confirmation_email', e.target.value)} placeholder="dispatch@facility.com" />
              </Field>
            </div>
          </section>

          {/* PATIENT INFO */}
          <section>
            <SectionLabel>Patient Information</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <Field label="Patient Name" required>
                <input required value={form.patient_name} onChange={e => set('patient_name', e.target.value)} placeholder="Robert Mathis" />
              </Field>
              <Field label="Patient Weight (lbs)">
                <input type="number" value={form.patient_weight} onChange={e => set('patient_weight', e.target.value)} placeholder="150" style={{ maxWidth: '160px' }} />
              </Field>
            </div>
          </section>

          {/* TRANSPORT TYPE */}
          <section>
            <SectionLabel>Type of Transport</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {TRANSPORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set('transport_type', opt.value)}
                  style={{
                    padding: '.75rem .75rem',
                    borderRadius: '4px',
                    border: form.transport_type === opt.value ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: form.transport_type === opt.value ? 'var(--accent)' : 'var(--bg-panel)',
                    color: form.transport_type === opt.value ? 'var(--accent-fg)' : 'var(--text-2)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.82rem',
                    fontWeight: form.transport_type === opt.value ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    lineHeight: 1.35,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* TRIP DETAILS */}
          <section>
            <SectionLabel>Trip Details</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <Field label="Trip Type" required>
                <div style={{ display: 'flex', gap: '.5rem' }}>
                  {([['one_way','One-Way'],['round_trip','Round Trip']] as [TripType,string][]).map(([val, label]) => (
                    <button key={val} type="button" onClick={() => set('trip_type', val)}
                      style={{
                        flex: 1, padding: '.65rem', borderRadius: '4px',
                        border: form.trip_type === val ? '2px solid var(--accent)' : '1px solid var(--border)',
                        background: form.trip_type === val ? 'var(--accent)' : 'var(--bg-panel)',
                        color: form.trip_type === val ? 'var(--accent-fg)' : 'var(--text-2)',
                        fontFamily: 'var(--font-sans)', fontSize: '.88rem',
                        fontWeight: form.trip_type === val ? 600 : 400, cursor: 'pointer',
                      }}>{label}</button>
                  ))}
                </div>
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                <Field label="Date of Transport" required>
                  <input required type="date" value={form.pickup_date} onChange={e => set('pickup_date', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </Field>
                <Field label="Appointment Time">
                  <input type="time" value={form.appt_time ?? ''} onChange={e => set('appt_time', e.target.value)} style={{ colorScheme: 'dark' }} />
                </Field>
              </div>
              <Field label="Requested Pickup Time (if appt time not applicable)">
                <input type="time" value={form.pickup_time} onChange={e => set('pickup_time', e.target.value)} style={{ colorScheme: 'dark' }} />
              </Field>
              <CheckRow label="Oxygen required" checked={form.oxygen_required} onChange={v => set('oxygen_required', v)} />
            </div>
          </section>

          {/* PICKUP */}
          <section>
            <SectionLabel>Pickup Details</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <Field label="Pickup Address" required>
                <input required value={form.pickup_address} onChange={e => set('pickup_address', e.target.value)} placeholder="BRRH, 3050 N. Lintel Drive, Bloomington, IN 47404" />
              </Field>
              <CheckRow label="Are there stairs at the pickup location?" checked={form.pickup_stairs} onChange={v => set('pickup_stairs', v)} />
              <Field label="Pickup Notes (room number, entrance, etc.)">
                <textarea value={form.pickup_notes} onChange={e => set('pickup_notes', e.target.value)} rows={2} placeholder="Pt is in room 205. Pick up at the front entrance." />
              </Field>
            </div>
          </section>

          {/* DROP-OFF */}
          <section>
            <SectionLabel>Drop-Off Details</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <Field label="Drop-Off Address" required>
                <input required value={form.destination_address} onChange={e => set('destination_address', e.target.value)} placeholder="Glenburn Senior Living, 618 Glenburn Rd, Linton, IN 47441" />
              </Field>
              <CheckRow label="Are there stairs at the drop-off location?" checked={form.dropoff_stairs} onChange={v => set('dropoff_stairs', v)} />
              <Field label="Drop-Off Notes">
                <textarea value={form.dropoff_notes} onChange={e => set('dropoff_notes', e.target.value)} rows={2} placeholder="Pt may be dropped off at the front entrance." />
              </Field>
            </div>
          </section>

          {error && (
            <div style={{ padding: '.85rem 1rem', background: 'rgba(176,48,32,.09)', border: '1px solid var(--crit)', borderRadius: '4px', color: 'var(--crit)', fontSize: '.88rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: submitting ? 'var(--text-3)' : 'var(--accent)',
              color: 'var(--accent-fg)',
              padding: '1rem',
              borderRadius: '4px',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: submitting ? 'not-allowed' : 'pointer',
              letterSpacing: '.02em',
            }}
          >
            {submitting ? 'Submitting…' : 'Submit Trip Request'}
          </button>

          <p style={{ fontSize: '.78rem', color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6 }}>
            By submitting this form you confirm you are authorized to arrange transportation for this patient.
            A-TEAM Transport Services · Indianapolis, IN · Veteran-Owned
          </p>
        </form>
      </div>
    </main>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.85rem' }}>
      <div style={{ width: '1.5rem', height: '2px', background: 'var(--accent)', flexShrink: 0 }} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
        {children}
      </span>
    </div>
  )
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--text-2)', marginBottom: '.35rem' }}>
        {label}{required && <span style={{ color: 'var(--crit)', marginLeft: '.2rem' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '.65rem', cursor: 'pointer', fontSize: '.88rem', color: 'var(--text-2)' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '18px', height: '18px', flexShrink: 0,
          border: checked ? '2px solid var(--accent)' : '1px solid var(--border)',
          borderRadius: '3px',
          background: checked ? 'var(--accent)' : 'var(--bg-panel)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        {checked && <span style={{ color: 'var(--accent-fg)', fontSize: '.7rem', fontWeight: 700 }}>✓</span>}
      </div>
      {label}
    </label>
  )
}
