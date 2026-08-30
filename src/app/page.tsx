import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Nav */}
      <nav style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.15rem' }}>Veteran-Owned · Indianapolis, IN</div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>A-TEAM Transport Services</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <a href="tel:3179827417" style={{ fontFamily: 'var(--font-mono)', fontSize: '.8rem', color: 'var(--text-2)', textDecoration: 'none' }}>(317) 982-7417</a>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.55rem 1.1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.88rem', whiteSpace: 'nowrap' }}>
              Request a Trip
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
            Veteran-Owned · Est. October 2016
          </div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text)', maxWidth: '14ch', marginBottom: '1.25rem' }}>
            When your residents need to get there safely.
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', maxWidth: '50ch', lineHeight: 1.75, marginBottom: '2rem' }}>
            Indianapolis&apos; original NEMT stretcher provider. Approaching a decade of trusted relationships with Central Indiana&apos;s skilled nursing and assisted living communities.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.85rem 1.75rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>
              Request a Trip →
            </Link>
            <a href="tel:3179827417" style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '.95rem', fontFamily: 'var(--font-mono)' }}>
              or call (317) 982-7417
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '3rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.5rem' }}>Our Services</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { title: 'Stretcher & Cot Transport', desc: 'Indianapolis\' original stretcher NEMT provider. Trained staff, proper equipment, zero shortcuts.' },
              { title: 'Wheelchair Transport', desc: 'Accessible vehicles and experienced drivers for residents who travel by wheelchair.' },
              { title: 'Ambulatory Transport', desc: 'Safe, comfortable transport for ambulatory patients who need assistance or escort.' },
            ].map(s => (
              <div key={s.title} style={{ background: 'var(--bg-panel)', padding: '1.5rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.5rem', fontSize: '.95rem' }}>{s.title}</div>
                <div style={{ color: 'var(--text-2)', fontSize: '.87rem', lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Year */}
      <section style={{ padding: '3rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Est. October 2016 · 10 Years Coming</div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: '1rem' }}>The original. Still the standard.</h2>
            <p style={{ color: 'var(--text-2)', lineHeight: 1.75, fontSize: '.92rem' }}>
              A-TEAM Transport was founded by a disabled veteran with one mission: move patients safely, every time, no exceptions. As we approach our 10th year in October 2026, that standard hasn&apos;t changed — and now our technology has caught up with our commitment.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { val: '\'16', label: 'Serving Central Indiana since Oct. 2016' },
              { val: '60+', label: 'Facility relationships built' },
              { val: '3', label: 'Service types available' },
              { val: '24/7', label: 'Dispatch availability' },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'var(--bg)', padding: '1.25rem 1rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '.25rem' }}>{stat.val}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text-3)', lineHeight: 1.4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '3rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.5rem' }}>What Facilities Say</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { quote: "When we're in a bind, ATEAM always comes through for our facility residents — getting them to their medical appointments on time, even when we contact them at the last minute.", name: 'Shelia G., LPN' },
              { quote: "ATEAM is the best. They took care of my mother's transportation needs when I had nowhere to turn. Thank you so much for all you've done for mom.", name: 'Hollie M.' },
              { quote: "I want to thank you for the great trip for my Dad. The trip went very well and the driver was wonderful. I would like to mention ATEAM with a strong endorsement.", name: 'Jim P.' },
            ].map(t => (
              <div key={t.name} style={{ background: 'var(--bg-panel)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ color: 'var(--text-2)', fontSize: '.88rem', lineHeight: 1.75, fontStyle: 'italic', margin: 0, maxWidth: '100%' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.08em', color: 'var(--accent)', textTransform: 'uppercase' }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem' }}>Ready to schedule a trip?</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '1.5rem', fontSize: '.95rem' }}>Submit a request online or call us directly. We confirm within 30 minutes during business hours.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.85rem 1.75rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '.95rem' }}>
              Request Online →
            </Link>
            <a href="tel:3179827417" style={{ border: '1px solid var(--border)', color: 'var(--text)', padding: '.85rem 1.75rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.95rem', background: 'var(--bg-panel)' }}>
              Call (317) 982-7417
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', color: 'var(--text-3)', letterSpacing: '.06em' }}>
            A-TEAM TRANSPORT SERVICES · INDIANAPOLIS, IN · VETERAN-OWNED
          </div>
          <Link href="/dashboard" style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: 'var(--text-3)', textDecoration: 'none', letterSpacing: '.06em' }}>
            STAFF LOGIN →
          </Link>
        </div>
      </footer>
    </main>
  )
}
