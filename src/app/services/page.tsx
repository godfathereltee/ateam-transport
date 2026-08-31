import Link from 'next/link'
import Nav from '@/components/Nav'

const services = [
  {
    id: 'stretcher',
    title: 'Stretcher Transport',
    body: `A-TEAM offers Stretcher Transportation at a much more cost-effective rate. Our vehicles are equipped specifically for non-emergency stretcher loading and secure transport. This service provides mobility to passengers who are unable to sit up straight during transport.`,
  },
  {
    id: 'wheelchair',
    title: 'Wheelchair Transport',
    body: `A-TEAM's Wheelchair Transportation service allows passengers to be transported according to their different needs and requirements. Our vehicle fleet is equipped with the proper wheelchair securement system and offers wider entry ramp access for wider wheelchairs.`,
  },
  {
    id: 'bariatric',
    title: 'Bariatric Transport',
    body: `A-TEAM provides bariatric transportation designed to ensure every passenger has access to safe, reliable, and comfortable mobility services. Our wheelchair-accessible vehicles feature wider rear-entry ramps capable of accommodating a broader range of mobility devices, including bariatric wheelchairs and many personally owned chairs. This enhanced accessibility allows us to serve passengers whose mobility devices may not be compatible with the narrower 35 or 36 inch ramps commonly used by other transportation providers. Our approach reflects A-TEAM CARES — providing transportation with professionalism, respect, and a genuine commitment to the people we serve.`,
  },
]

export default function ServicesPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <Nav />

      {/* Page hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
            Veteran-Owned · Indianapolis, IN
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text)', letterSpacing: '-.02em', marginBottom: '1rem' }}>
            Services
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '52ch' }}>
            A-TEAM Transport provides non-emergency medical transportation for passengers of all mobility needs. Every vehicle is properly equipped and every driver trained to A-TEAM CARES standards.
          </p>
        </div>
      </section>

      {/* Service cards */}
      {services.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          style={{
            padding: '3.5rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            background: i % 2 === 1 ? 'var(--bg-panel)' : 'var(--bg)',
            scrollMarginTop: '80px',
          }}
        >
          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            <div style={{ width: '2.5rem', height: '3px', background: 'var(--accent)', marginBottom: '1.25rem' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, marginBottom: '1.25rem', letterSpacing: '-.02em' }}>
              {s.title}
            </h2>
            <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.9, maxWidth: '62ch' }}>
              {s.body}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.75rem 1.75rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', display: 'inline-block' }}>
                Request This Service →
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Where We Go */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Transport Services</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-.02em' }}>
            We go where you need to go.
          </h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '1.05rem', maxWidth: '58ch', marginBottom: '2rem' }}>
            Medical appointments, dialysis, rehabilitation, hospital discharges — and everyday life. Saturdays, Sundays, holidays, birthdays included.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '.5rem' }}>
            {[
              'Medical appointments', 'Dental appointments', 'Dialysis & specialty treatments',
              'Rehabilitation & Physical Therapy', 'Routine & follow-up care', 'Nursing facility discharges',
              'Hospital discharges', 'Airport pick-up & drop-off', 'Ride to work',
              'Ride to school', 'Family outings', 'Home visits with family',
              'Everyday errands', 'Religious services', 'Funerals',
              'Grocery trips', 'Hair appointments', 'Family dinners',
              'Holiday gatherings', 'Birthday trips',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.6rem .75rem', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg-panel)', fontSize: '.95rem', color: 'var(--text-2)' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>—</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{ padding: '3.5rem 1.5rem', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Available 7 Days a Week</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem', letterSpacing: '-.02em' }}>Ready to schedule a trip?</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '1.75rem', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '50ch' }}>Submit a request online or call us directly. We confirm within 30 minutes during business hours.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem' }}>
              Request Online →
            </Link>
            <a href="tel:3179827417" style={{ border: '1px solid var(--border)', color: 'var(--text)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem', background: 'var(--bg)' }}>
              Call (317) 982-7417
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
