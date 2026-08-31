'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import type { BookingRequest, ServiceType } from '@/types'

const SERVICE_LABELS: Record<ServiceType, string> = {
  ambulatory: 'Ambulatory (Walking)',
  wheelchair: 'Wheelchair',
  stretcher: 'Stretcher / Cot',
}

const initialState: Omit<BookingRequest, 'status'> = {
  facility_name: '',
  facility_contact_name: '',
  facility_contact_phone: '',
  facility_contact_email: '',
  patient_initials: '',
  service_type: 'wheelchair',
  pickup_date: '',
  pickup_time: '',
  pickup_address: '',
  destination_name: '',
  destination_address: '',
  oxygen_required: false,
  bariatric: false,
  stairs: false,
  notes: '',
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
            We&apos;ll confirm this trip within 30 minutes during business hours.
            For urgent requests, call us directly.
          </p>
          <a href="tel:3179827417" style={{ display: 'inline-block', background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.75rem 1.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.9rem' }}>
            Call (317) 982-7417
          </a>
          <div style={{ marginTop: '1.5rem' }}>
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

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.5rem 0' }}>
        <p style={{ color: 'var(--text-2)', marginBottom: '2rem', lineHeight: 1.7, fontSize: '.95rem' }}>
          Serving Central Indiana since October 2016. Complete the form below and we&apos;ll confirm your trip within 30 minutes during business hours.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

          {/* FACILITY INFO */}
          <section>
            <SectionLabel>Facility Information</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <Field label="Facility Name" required>
                <input required value={form.facility_name} onChange={e => set('facility_name', e.target.value)} placeholder="Greenwood Meadows" />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                <Field label="Your Name" required>
                  <input required value={form.facility_contact_name} onChange={e => set('facility_contact_name', e.target.value)} placeholder="Jane Smith" />
                </Field>
                <Field label="Your Phone" required>
                  <input required type="tel" value={form.facility_contact_phone} onChange={e => set('facility_contact_phone', e.target.value)} placeholder="(317) 555-0100" />
                </Field>
              </div>
              <Field label="Your Email (optional — for confirmation)">
                <input type="email" value={form.facility_contact_email} onChange={e => set('facility_contact_email', e.target.value)} placeholder="jane@greenwoodmeadows.com" />
              </Field>
            </div>
          </section>

          {/* SERVICE TYPE */}
          <section>
            <SectionLabel>Service Type</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.5rem' }}>
              {(Object.entries(SERVICE_LABELS) as [ServiceType, string][]).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => set('service_type', val)}
                  style={{
                    padding: '.75rem .5rem',
                    borderRadius: '4px',
                    border: form.service_type === val ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: form.service_type === val ? 'var(--accent)' : 'var(--bg-panel)',
                    color: form.service_type === val ? 'var(--accent-fg)' : 'var(--text-2)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.82rem',
                    fontWeight: form.service_type === val ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          {/* TRIP DETAILS */}
          <section>
            <SectionLabel>Trip Details</SectionLabel>
            <div style={{ display: 'grid', gap: '.75rem' }}>
              <Field label="Patient Initials" required hint="Initials only — e.g. J.D.">
                <input required value={form.patient_initials} onChange={e => set('patient_initials', e.target.value)} placeholder="J.D." maxLength={6} style={{ maxWidth: '120px' }} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                <Field label="Pickup Date" required>
                  <input required type="date" value={form.pickup_date} onChange={e => set('pickup_date', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </Field>
                <Field label="Pickup Time" required>
                  <div style={{ display: 'flex', gap: '.4rem' }}>
                    <select
                      required
                      value={form.pickup_time ? form.pickup_time.split(':')[0].replace(/^0/, '') || '12' : ''}
                      onChange={e => {
                        const [, min, ampm] = (form.pickup_time || '::AM').split(/[: ]/)
                        const h = e.target.value
                        const h24 = ampm === 'PM' && h !== '12' ? String(+h + 12).padStart(2,'0') : ampm === 'AM' && h === '12' ? '00' : h.padStart(2,'0')
                        set('pickup_time', `${h24}:${min || '00'} ${ampm || 'AM'}`)
                      }}
                      style={{ flex: 1 }}
                    >
                      <option value="">Hr</option>
                      {Array.from({length:12},(_,i)=>i+1).map(h=><option key={h} value={h}>{h}</option>)}
                    </select>
                    <select
                      required
                      value={form.pickup_time ? form.pickup_time.split(':')[1]?.split(' ')[0] || '' : ''}
                      onChange={e => {
                        const [h24, rest] = (form.pickup_time || '00:00 AM').split(':')
                        const ampm = rest?.split(' ')[1] || 'AM'
                        set('pickup_time', `${h24}:${e.target.value} ${ampm}`)
                      }}
                      style={{ flex: 1 }}
                    >
                      <option value="">Min</option>
                      {['00','15','30','45'].map(m=><option key={m} value={m}>{m}</option>)}
                    </select>
                    <select
                      required
                      value={form.pickup_time ? (form.pickup_time.includes(' ') ? form.pickup_time.split(' ')[1] : '') : ''}
                      onChange={e => {
                        const [h24, minPart] = (form.pickup_time || '00:00').split(':')
                        const min = minPart?.split(' ')[0] || '00'
                        const ampm = e.target.value
                        const h12 = +h24 % 12 || 12
                        const h24new = ampm === 'PM' && h12 !== 12 ? String(h12 + 12).padStart(2,'0') : ampm === 'AM' && h12 === 12 ? '00' : String(h12).padStart(2,'0')
                        set('pickup_time', `${h24new}:${min} ${ampm}`)
                      }}
                      style={{ flex: 1 }}
                    >
                      <option value="">AM/PM</option>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </Field>
              </div>
              <Field label="Pickup Address" required>
                <input required value={form.pickup_address} onChange={e => set('pickup_address', e.target.value)} placeholder="1234 Facility Drive, Indianapolis, IN 46240" />
              </Field>
              <Field label="Destination Name" required>
                <input required value={form.destination_name} onChange={e => set('destination_name', e.target.value)} placeholder="IU Health Methodist Hospital" />
              </Field>
              <Field label="Destination Address" required>
                <input required value={form.destination_address} onChange={e => set('destination_address', e.target.value)} placeholder="1701 N Senate Blvd, Indianapolis, IN 46202" />
              </Field>
            </div>
          </section>

          {/* SPECIAL NEEDS */}
          <section>
            <SectionLabel>Special Requirements</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
              <CheckRow label="Oxygen required" checked={form.oxygen_required} onChange={v => set('oxygen_required', v)} />
              <CheckRow label="Bariatric transport needed" checked={form.bariatric} onChange={v => set('bariatric', v)} />
              <CheckRow label="Stairs involved at pickup or destination" checked={form.stairs} onChange={v => set('stairs', v)} />
            </div>
          </section>

          {/* NOTES */}
          <section>
            <SectionLabel>Additional Notes (optional)</SectionLabel>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              rows={3}
              placeholder="Any additional information that would help our team..."
              style={{ width: '100%', ...inputStyle }}
            />
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

// ── Small components ──────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '.65rem .8rem',
  background: 'var(--bg-panel)',
  border: '1px solid var(--border)',
  borderRadius: '4px',
  color: 'var(--text)',
  fontFamily: 'var(--font-sans)',
  fontSize: '.9rem',
  outline: 'none',
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

function Field({ label, children, required, hint }: { label: string; children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 500, color: 'var(--text-2)', marginBottom: '.35rem' }}>
        {label}{required && <span style={{ color: 'var(--crit)', marginLeft: '.2rem' }}>*</span>}
      </label>
      {hint && <div style={{ fontSize: '.73rem', color: 'var(--text-3)', marginBottom: '.3rem' }}>{hint}</div>}
      <style>{`input[type=text],input[type=tel],input[type=email],input[type=date],input[type=time],textarea,select{background:var(--bg-panel);border:1px solid var(--border);border-radius:4px;color:var(--text);font-family:var(--font-sans);font-size:.9rem;padding:.65rem .8rem;width:100%;outline:none;}input:focus,textarea:focus{border-color:var(--accent);}input::placeholder,textarea::placeholder{color:var(--text-3)}input[type=date]::-webkit-calendar-picker-indicator,input[type=time]::-webkit-calendar-picker-indicator{filter:invert(1);opacity:.6;cursor:pointer;}input[type=date],input[type=time]{cursor:pointer;}`}</style>
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
