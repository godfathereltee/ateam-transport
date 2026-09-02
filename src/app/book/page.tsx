'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { BookingRequest, TransportType, TripType } from '@/types'

const TRANSPORT_OPTIONS: { value: TransportType; label: string }[] = [
  { value: 'standard_wheelchair', label: 'Standard Wheelchair (up to 299 lbs)' },
  { value: 'bariatric_wheelchair', label: 'Bariatric Wheelchair (300+ lbs)' },
  { value: 'stretcher', label: 'Stretcher' },
  { value: 'ambulatory', label: 'Ambulatory (Walking)' },
]

const initialState = {
  facility_contact_name: '',
  facility_contact_phone: '',
  facility_name: '',
  confirmation_email: '',
  patient_name: '',
  patient_weight: '',
  doctor_name: '',
  transport_type: 'standard_wheelchair' as TransportType,
  trip_type: 'one_way' as TripType,
  pickup_date: '',
  appt_time: '',
  pickup_time: '',
  appt_duration: '',
  pickup_street: '',
  pickup_room: '',
  pickup_city: '',
  pickup_state: '',
  pickup_zip: '',
  pickup_stairs: null as boolean | null,
  pickup_notes: '',
  destination_street: '',
  destination_suite: '',
  destination_city: '',
  destination_state: '',
  destination_zip: '',
  dropoff_stairs: null as boolean | null,
  dropoff_notes: '',
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState(() => ({
    ...initialState,
    facility_name: searchParams.get('facility') ?? '',
  }))
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showPickupWarning, setShowPickupWarning] = useState(false)
  const [pickupWarningConfirmed, setPickupWarningConfirmed] = useState(false)
  const [timeError, setTimeError] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')

  useEffect(() => {
    (window as any).onTurnstileSuccess = (token: string) => setTurnstileToken(token)
    return () => { delete (window as any).onTurnstileSuccess }
  }, [])

  function set(field: keyof typeof initialState, value: string | boolean | null) { // eslint-disable-line @typescript-eslint/no-explicit-any
    setForm(prev => {
      const next = { ...prev, [field]: value }
      // Clear time error whenever either time field changes
      if (field === 'appt_time' || field === 'pickup_time') setTimeError('')
      return next
    })
    setError('')
  }

  function validateTimes(appt: string, pickup: string): string {
    if (appt && pickup) {
      if (pickup >= appt) return 'The Requested Pickup Time must be before the Appointment Time.'
    }
    return ''
  }

  function handleApptTimeChange(v: string) {
    set('appt_time', v)
    if (v && form.pickup_time) {
      const err = validateTimes(v, form.pickup_time)
      setTimeError(err)
    }
  }

  function handlePickupTimeChange(v: string) {
    set('pickup_time', v)
    if (v && form.appt_time) {
      const err = validateTimes(form.appt_time, v)
      setTimeError(err)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) return // silent bot rejection
    if (!turnstileToken) { setError('Please complete the security verification below.'); return }
    if (!form.pickup_date) { setError('Please select a Date of Transport.'); return }
    if (!form.pickup_street || !form.pickup_city || !form.pickup_state || !form.pickup_zip) { setError('Please complete all Pickup Address fields.'); return }
    if (!form.destination_street || !form.destination_city || !form.destination_state || !form.destination_zip) { setError('Please complete all Drop-Off Address fields.'); return }
    if (!form.appt_time && !form.pickup_time) { setError('Please enter an Appointment Time or a Requested Pickup Time.'); return }
    if (form.appt_time && form.pickup_time) {
      const tErr = validateTimes(form.appt_time, form.pickup_time)
      if (tErr) { setTimeError(tErr); setError(tErr); return }
    }
    if (form.pickup_stairs === null) { setError('Please indicate whether there are stairs at the pickup location.'); return }
    if (form.dropoff_stairs === null) { setError('Please indicate whether there are stairs at the drop-off location.'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          pickup_address: [form.pickup_street, form.pickup_room ? `Room ${form.pickup_room}` : '', form.pickup_city, `${form.pickup_state} ${form.pickup_zip}`].filter(Boolean).join(', '),
          destination_address: [form.destination_street, form.destination_suite ? `Suite ${form.destination_suite}` : '', form.destination_city, `${form.destination_state} ${form.destination_zip}`].filter(Boolean).join(', '),
          turnstileToken,
          status: 'pending',
        }),
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
        @media(max-width:520px){
          .addr-row{grid-template-columns:1fr!important;}
          .addr-csz{grid-template-columns:1fr 60px 80px!important;}
        }
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
              <Field label="Trip Confirmation Email" required>
                <input required type="email" value={form.confirmation_email} onChange={e => set('confirmation_email', e.target.value)} placeholder="dispatch@facility.com" />
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
              <Field label="Date of Transport" required>
                <DatePicker value={form.pickup_date} onChange={v => set('pickup_date', v)} />
              </Field>
              <Field label="Appointment Time" required>
                <TimePicker value={form.appt_time ?? ''} onChange={handleApptTimeChange} />
                {timeError && (
                  <div style={{ fontSize: '.8rem', color: 'var(--crit)', marginTop: '.35rem' }}>{timeError}</div>
                )}
              </Field>
              <div>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--text-2)', marginBottom: '.35rem' }}>
                  Requested Pickup Time{' '}
                  <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1rem' }}>
                    — Pickup times are assigned by dispatch &mdash; only enter this if no appointment time applies.
                  </span>
                </label>
                <TimePicker
                  value={form.pickup_time}
                  onChange={handlePickupTimeChange}
                  onFirstInteract={() => {
                    if (!pickupWarningConfirmed) setShowPickupWarning(true)
                  }}
                />
                {timeError && (
                  <div style={{ fontSize: '.8rem', color: 'var(--crit)', marginTop: '.35rem' }}>{timeError}</div>
                )}
              </div>
              {form.trip_type === 'round_trip' && (
                <Field label="Estimated Duration of Appointment (if known)">
                  <select value={form.appt_duration} onChange={e => set('appt_duration', e.target.value)}>
                    <option value="">Select duration</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="1 hour">1 hour</option>
                    <option value="1.5 hours">1.5 hours</option>
                    <option value="2 hours">2 hours</option>
                    <option value="2.5 hours">2.5 hours</option>
                    <option value="3 hours">3 hours</option>
                    <option value="3+ hours">3+ hours</option>
                  </select>
                  <div style={{ fontSize: '.75rem', color: 'var(--text-3)', marginTop: '.35rem' }}>Helps dispatch estimate when the passenger may be ready for the return trip.</div>
                </Field>
              )}
            </div>
          </section>

          {/* PICKUP */}
          <section>
            <SectionLabel>Pickup Details</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div className="addr-row" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '.75rem' }}>
                <Field label="Pickup Address" required>
                  <textarea rows={2} style={{ resize: 'none' }} value={form.pickup_street} onChange={e => set('pickup_street', e.target.value)} placeholder="3050 N. Lintel Drive" />
                </Field>
                <Field label="Room #">
                  <input value={form.pickup_room} onChange={e => set('pickup_room', e.target.value)} placeholder="205" />
                </Field>
              </div>
              <div className="addr-csz" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.75rem' }}>
                <Field label="City" required>
                  <input value={form.pickup_city} onChange={e => set('pickup_city', e.target.value)} placeholder="Bloomington" />
                </Field>
                <Field label="State" required>
                  <input value={form.pickup_state} onChange={e => set('pickup_state', e.target.value)} placeholder="IN" maxLength={2} style={{ textTransform: 'uppercase' }} />
                </Field>
                <Field label="Zip" required>
                  <input value={form.pickup_zip} onChange={e => set('pickup_zip', e.target.value)} placeholder="47404" maxLength={5} />
                </Field>
              </div>
              <YesNo label="Are there stairs at the pickup location?" required value={form.pickup_stairs} onChange={v => set('pickup_stairs', v)} />
              <Field label="Pickup Notes (entrance, special instructions, etc.)">
                <textarea value={form.pickup_notes} onChange={e => set('pickup_notes', e.target.value)} rows={2} placeholder="Pick up at the front entrance." />
              </Field>
            </div>
          </section>

          {/* DROP-OFF */}
          <section>
            <SectionLabel>Drop-Off Details</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <div className="addr-row" style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '.75rem' }}>
                <Field label="Drop-Off Address" required>
                  <textarea rows={2} style={{ resize: 'none' }} value={form.destination_street} onChange={e => set('destination_street', e.target.value)} placeholder="618 Glenburn Rd" />
                </Field>
                <Field label="Suite #">
                  <input value={form.destination_suite} onChange={e => set('destination_suite', e.target.value)} placeholder="100" />
                </Field>
              </div>
              <div className="addr-csz" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.75rem' }}>
                <Field label="City" required>
                  <input value={form.destination_city} onChange={e => set('destination_city', e.target.value)} placeholder="Linton" />
                </Field>
                <Field label="State" required>
                  <input value={form.destination_state} onChange={e => set('destination_state', e.target.value)} placeholder="IN" maxLength={2} style={{ textTransform: 'uppercase' }} />
                </Field>
                <Field label="Zip" required>
                  <input value={form.destination_zip} onChange={e => set('destination_zip', e.target.value)} placeholder="47441" maxLength={5} />
                </Field>
              </div>
              <YesNo label="Are there stairs at the drop-off location?" required value={form.dropoff_stairs} onChange={v => set('dropoff_stairs', v)} />
              <Field label="Drop-Off Notes">
                <textarea value={form.dropoff_notes} onChange={e => set('dropoff_notes', e.target.value)} rows={2} placeholder="Pt may be dropped off at the front entrance." />
              </Field>
              <Field label="Name of Doctor (if known)">
                <input value={form.doctor_name} onChange={e => set('doctor_name', e.target.value)} placeholder="Dr. Smith" />
              </Field>
            </div>
          </section>

          {/* Honeypot — hidden from humans, bots fill it */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Turnstile */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="cf-turnstile" data-sitekey="0x4AAAAAAElEr2KY6wmm_hfY" data-callback="onTurnstileSuccess" data-theme="dark" />
          </div>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async strategy="afterInteractive" />

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
            Information submitted is handled in accordance with our{' '}
            <a href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Privacy Policy</a>.
            <br />A-TEAM Transport Services · Indianapolis, IN · Veteran-Owned
          </p>
        </form>
      </div>

      <Footer />

      {showPickupWarning && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
        }}>
          <div style={{
            background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '8px',
            maxWidth: '440px', width: '100%', padding: '2rem', boxShadow: '0 8px 32px rgba(0,0,0,.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                background: 'rgba(232,152,24,.15)', border: '1px solid var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
              }}>⚠</div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                Requested Pickup Time
              </h3>
            </div>
            <p style={{ fontSize: '.9rem', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This field should only be used when an appointment time is <strong>not available</strong>, or when the customer specifically needs to request a pickup time.
            </p>
            <p style={{ fontSize: '.85rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              If both are entered, the pickup time <strong>must be before</strong> the appointment time.
            </p>
            <div style={{ display: 'flex', gap: '.75rem' }}>
              <button
                type="button"
                onClick={() => { setShowPickupWarning(false); set('pickup_time', ''); }}
                style={{
                  flex: 1, padding: '.7rem', border: '1px solid var(--border)', borderRadius: '4px',
                  background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem', cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => { setShowPickupWarning(false); setPickupWarningConfirmed(true); }}
                style={{
                  flex: 1, padding: '.7rem', border: 'none', borderRadius: '4px',
                  background: 'var(--accent)', color: 'var(--accent-fg)', fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem', fontWeight: 600, cursor: 'pointer',
                }}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function DatePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const today = new Date()
  const [month, setMonth] = useState(value ? String(parseInt(value.split('-')[1])) : '')
  const [day, setDay] = useState(value ? String(parseInt(value.split('-')[2])) : '')
  const [year, setYear] = useState(value ? value.split('-')[0] : '')

  function emit(m: string, d: string, y: string) {
    if (m && d && y) {
      onChange(`${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`)
    }
  }

  const daysInMonth = month && year ? new Date(parseInt(year), parseInt(month), 0).getDate() : 31
  const years = Array.from({ length: 3 }, (_, i) => today.getFullYear() + i)

  const sel: React.CSSProperties = {
    flex: 1, padding: '.65rem .4rem', background: 'var(--bg-panel)',
    border: '1px solid var(--border)', borderRadius: '4px',
    color: 'var(--text)', fontFamily: 'var(--font-sans)',
    fontSize: '.9rem', outline: 'none', cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', gap: '.4rem' }}>
      <select style={{ ...sel, flex: 2 }} value={month} onChange={e => {
        const newMonth = e.target.value
        const maxDay = newMonth && year ? new Date(parseInt(year), parseInt(newMonth), 0).getDate() : 31
        const safeDay = day && parseInt(day) > maxDay ? '' : day
        setMonth(newMonth)
        if (safeDay !== day) setDay('')
        emit(newMonth, safeDay, year)
      }}>
        <option value="">Month</option>
        {MONTHS.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}
      </select>
      <select style={sel} value={day} onChange={e => { setDay(e.target.value); emit(month, e.target.value, year) }}>
        <option value="">Day</option>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => <option key={d} value={String(d)}>{d}</option>)}
      </select>
      <select style={{ ...sel, flex: 2 }} value={year} onChange={e => { setYear(e.target.value); emit(month, day, e.target.value) }}>
        <option value="">Year</option>
        {years.map(y => <option key={y} value={String(y)}>{y}</option>)}
      </select>
    </div>
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

function TimePicker({ onChange, onFirstInteract }: { value: string; onChange: (v: string) => void; onFirstInteract?: () => void }) {
  const [hr, setHr] = useState('')
  const [min, setMin] = useState('')
  const [ampm, setAmpm] = useState('')
  const interacted = useState(false)

  function handleInteract() {
    if (!interacted[0] && onFirstInteract) {
      interacted[1](true)
      onFirstInteract()
    }
  }

  function emit(h: string, m: string, ap: string) {
    if (h && m && ap) {
      const h24 = ap === 'PM' && h !== '12' ? String(+h + 12) : ap === 'AM' && h === '12' ? '00' : h.padStart(2, '0')
      onChange(`${h24.padStart(2, '0')}:${m}`)
    }
  }

  const sel: React.CSSProperties = {
    flex: 1, padding: '.65rem .4rem', background: 'var(--bg-panel)',
    border: '1px solid var(--border)', borderRadius: '4px',
    color: 'var(--text)', fontFamily: 'var(--font-sans)',
    fontSize: '.9rem', outline: 'none', cursor: 'pointer',
  }

  return (
    <div style={{ display: 'flex', gap: '.4rem' }}>
      <select style={sel} value={hr} onFocus={handleInteract} onChange={e => { setHr(e.target.value); emit(e.target.value, min, ampm) }}>
        <option value="">Hour</option>
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(h => <option key={h} value={String(h)}>{h}</option>)}
      </select>
      <select style={sel} value={min} onFocus={handleInteract} onChange={e => { setMin(e.target.value); emit(hr, e.target.value, ampm) }}>
        <option value="">Min</option>
        {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
      </select>
      <select style={sel} value={ampm} onFocus={handleInteract} onChange={e => { setAmpm(e.target.value); emit(hr, min, e.target.value) }}>
        <option value="">AM/PM</option>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  )
}

function YesNo({ label, value, onChange, required }: { label: string; value: boolean | null; onChange: (v: boolean) => void; required?: boolean }) {
  const btn = (active: boolean, text: string): React.CSSProperties => ({
    flex: 1, padding: '.55rem', borderRadius: '4px', border: value === active ? '2px solid var(--accent)' : '1px solid var(--border)',
    background: value === active ? 'var(--accent)' : 'var(--bg-panel)',
    color: value === active ? 'var(--accent-fg)' : 'var(--text-2)',
    fontFamily: 'var(--font-sans)', fontSize: '.88rem',
    fontWeight: value === active ? 700 : 400, cursor: 'pointer',
  })
  return (
    <div>
      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--text-2)', marginBottom: '.35rem' }}>
        {label}{required && <span style={{ color: 'var(--crit)', marginLeft: '.2rem' }}>*</span>}
      </label>
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <button type="button" style={btn(true, 'Yes')} onClick={() => onChange(true)}>Yes</button>
        <button type="button" style={btn(false, 'No')} onClick={() => onChange(false)}>No</button>
      </div>
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
