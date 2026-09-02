import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { facilities, getFacilityBySlug } from '@/lib/facilities'

export async function generateStaticParams() {
  return facilities.map(f => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const facility = getFacilityBySlug(slug)
  if (!facility) return {}
  return {
    title: `A-TEAM Transport — ${facility.name} Transportation Partner`,
    description: `A-TEAM Transport Services is a trusted NEMT partner for ${facility.name} in ${facility.city}, IN. Stretcher, wheelchair passenger, and bariatric transport for residents — seven days a week.`,
    robots: { index: false },
  }
}

const SERVICES = [
  {
    title: 'Stretcher Transport',
    desc: 'For residents unable to sit upright during transport. Safe, non-emergency stretcher loading with fully trained staff.',
  },
  {
    title: 'Wheelchair Passenger Transport',
    desc: 'Safe, dignified transport for persons using wheelchairs. Proper securement and ramp-equipped vehicles for all mobility devices.',
  },
  {
    title: 'Bariatric Transport',
    desc: 'Wide rear-entry ramps accommodating bariatric wheelchairs and chairs exceeding standard 35–36" ramp widths.',
  },
]

const TRIPS = [
  'Medical appointments',
  'Dental appointments',
  'Dialysis & specialty treatments',
  'Rehabilitation & physical therapy',
  'Routine & follow-up care',
  'Nursing facility discharges',
  'Hospital discharges',
]

export default async function FacilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const facility = getFacilityBySlug(slug)
  if (!facility) notFound()

  const bookUrl = `/book?facility=${encodeURIComponent(facility.name)}`

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: '4.5rem 1.5rem 3.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>
            Trusted NEMT Partner · {facility.city}, {facility.state}
          </div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-.02em' }}>
            A-TEAM Transport Services<br />
            <span style={{ color: 'var(--accent)' }}>{facility.name}</span>
          </h1>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '1.05rem', maxWidth: '54ch', marginBottom: '2rem' }}>
            A-TEAM Transport is a veteran-owned non-emergency medical transportation provider serving {facility.name} and the greater {facility.city} area. We provide stretcher, wheelchair passenger, and bariatric transport for your residents — seven days a week, including weekends and holidays.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href={bookUrl} style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
              Request a Trip →
            </Link>
            <a href="tel:3179827417" style={{ border: '1px solid var(--border)', color: 'var(--text)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', background: 'var(--bg-panel)' }}>
              Call (317) 982-7417
            </a>
          </div>
        </div>
      </section>

      {/* Why A-TEAM */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.5rem' }}>Why facilities choose A-TEAM</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { stat: '10+', label: 'Years serving Central Indiana' },
              { stat: '60+', label: 'Facility partners' },
              { stat: '5★', label: 'Consistent patient reviews' },
              { stat: '7', label: 'Days a week, incl. holidays' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{ background: 'var(--bg)', padding: '1.5rem 1.25rem', textAlign: 'center', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '.25rem' }}>{s.stat}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.07em', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.5rem' }}>Transport services available</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {SERVICES.map(s => (
              <div key={s.title} style={{ background: 'var(--bg-panel)', padding: '1.5rem 1.25rem' }}>
                <div style={{ width: '1.5rem', height: '2px', background: 'var(--accent)', marginBottom: '.85rem' }} />
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.5rem', fontSize: '1rem' }}>{s.title}</div>
                <div style={{ color: 'var(--text-2)', fontSize: '.92rem', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Types */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.5rem' }}>We go where your residents need to go</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginBottom: '2rem' }}>
            {TRIPS.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.05em', color: 'var(--text-2)', border: '1px solid var(--border)', borderRadius: '3px', padding: '.3rem .75rem', background: 'var(--bg)' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.5rem' }}>How to request a trip</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              { step: '01', title: 'Submit online', desc: 'Use our trip request form — facility name is pre-filled for you.' },
              { step: '02', title: 'We confirm', desc: 'Dispatch confirms within 30 minutes during business hours.' },
              { step: '03', title: 'We arrive', desc: 'Your resident is picked up on time by a trained, professional driver.' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', color: 'var(--accent)', letterSpacing: '.1em' }}>{s.step}</div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '1rem' }}>{s.title}</div>
                <div style={{ color: 'var(--text-2)', fontSize: '.92rem', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href={bookUrl} style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
              Request a Trip for {facility.name} →
            </Link>
            <a href="tel:3179827417" style={{ border: '1px solid var(--border)', color: 'var(--text)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem', background: 'var(--bg-panel)' }}>
              Call (317) 982-7417
            </a>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Our commitment</div>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.9, fontSize: '1.05rem', maxWidth: '54ch', marginBottom: '.5rem' }}>
            Every resident we transport is someone&apos;s family member. We treat them that way — with patience, dignity, and professionalism — every trip, every time.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>
            Veteran-Owned · Est. October 2016 · &ldquo;A-TEAM CARES!&rdquo;
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
