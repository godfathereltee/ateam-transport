import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Nav */}
      <nav style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.1rem' }}>Veteran-Owned · Indianapolis, IN</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-.01em' }}>A-TEAM Transport Services</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <a href="tel:3179827417" style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--text-2)', textDecoration: 'none' }}>(317) 982-7417</a>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.5rem 1.1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.85rem', whiteSpace: 'nowrap' }}>
              Request a Trip
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.25rem' }}>
            Veteran-Owned · Celebrating 10 Years of Service
          </div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.05, color: 'var(--text)', maxWidth: '14ch', marginBottom: '1.5rem', letterSpacing: '-.02em' }}>
            When your residents need to get there safely.
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', maxWidth: '52ch', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Indianapolis&apos; original NEMT stretcher provider. Now celebrating 10 years of trusted relationships with Central Indiana&apos;s skilled nursing and assisted living communities.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', letterSpacing: '.01em' }}>
              Request a Trip →
            </Link>
            <a href="tel:3179827417" style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '.9rem', fontFamily: 'var(--font-mono)' }}>
              or call (317) 982-7417
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { val: '2016', label: 'Founded' },
            { val: '60+', label: 'Facility partners' },
            { val: '3', label: 'Service types' },
            { val: '24/7', label: 'Dispatch' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '1.5rem 1rem',
              textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '.2rem' }}>{s.val}</div>
              <div style={{ fontSize: '.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.75rem' }}>Our Services</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { title: 'Stretcher & Cot Transport', desc: 'Indianapolis\' original stretcher NEMT provider. Trained staff, proper equipment, zero shortcuts. Our core service since day one.' },
              { title: 'Wheelchair Transport', desc: 'Accessible vehicles and experienced drivers for residents who travel by wheelchair to appointments across Central Indiana.' },
              { title: 'Ambulatory Transport', desc: 'Safe, comfortable transport for ambulatory patients who need assistance, escort, or simply a reliable ride.' },
            ].map(s => (
              <div key={s.title} style={{ background: 'var(--bg-panel)', padding: '1.75rem 1.5rem' }}>
                <div style={{ width: '2rem', height: '2px', background: 'var(--accent)', marginBottom: '1rem' }} />
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.6rem', fontSize: '.95rem' }}>{s.title}</div>
                <div style={{ color: 'var(--text-2)', fontSize: '.87rem', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Year */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Est. October 2016 · Celebrating 10 Years of Service</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-.02em', maxWidth: '20ch' }}>The original. Still the standard.</h2>
          <p style={{ color: 'var(--text-2)', lineHeight: 1.8, fontSize: '.95rem', maxWidth: '58ch', marginBottom: '0' }}>
            A-TEAM Transport was founded by a disabled veteran with one mission: move patients safely, every time, no exceptions. This October, we celebrate 10 years of doing exactly that — a decade of trusted relationships, thousands of safe trips, and a standard that has never wavered. Thank you, Central Indiana, for trusting us with the people who matter most.
          </p>
        </div>
      </section>

      {/* Service Area */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.75rem' }}>Service Area</div>
          <p style={{ color: 'var(--text-2)', fontSize: '.95rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '58ch' }}>
            We serve skilled nursing facilities, assisted living communities, and hospitals across Indiana — from Lafayette to Jeffersonville, Fort Wayne to Bloomington.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
            {['Indianapolis', 'Greenwood', 'Carmel', 'Fishers', 'Lawrence', 'Beech Grove', 'Speedway', 'Plainfield', 'Avon', 'Brownsburg', 'Noblesville', 'Anderson', 'Columbus', 'Bloomington', 'Jeffersonville', 'Lafayette', 'Fort Wayne', 'Greenfield', 'Richmond'].map(city => (
              <span key={city} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.68rem',
                letterSpacing: '.06em',
                color: 'var(--text-2)',
                border: '1px solid var(--border)',
                borderRadius: '3px',
                padding: '.3rem .65rem',
                background: 'var(--bg-panel)',
              }}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '1.75rem' }}>What Facilities Say</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { quote: "When we're in a bind, ATEAM always comes through for our facility residents — getting them to their medical appointments on time, even when we contact them at the last minute.", name: 'Shelia G., LPN' },
              { quote: "ATEAM is the best. They took care of my mother's transportation needs when I had nowhere to turn. Thank you so much for all you've done for mom.", name: 'Hollie M.' },
              { quote: "I want to thank you for the great trip for my Dad. The trip went very well and the driver was wonderful. I would like to mention ATEAM with a strong endorsement.", name: 'Jim P.' },
            ].map(t => (
              <div key={t.name} style={{ background: 'var(--bg)', padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: 'var(--text-2)', fontSize: '.9rem', lineHeight: 1.8, fontStyle: 'italic', margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Ready to schedule?</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem', letterSpacing: '-.02em' }}>Submit online or call us directly.</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '2rem', fontSize: '.95rem', lineHeight: 1.75, maxWidth: '50ch' }}>We confirm trip requests within 30 minutes during business hours. For urgent trips, call us directly.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '.95rem' }}>
              Request Online →
            </Link>
            <a href="tel:3179827417" style={{ border: '1px solid var(--border)', color: 'var(--text)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.95rem', background: 'var(--bg)' }}>
              Call (317) 982-7417
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: 'var(--text-3)', letterSpacing: '.08em' }}>
            A-TEAM TRANSPORT SERVICES · INDIANAPOLIS, IN · VETERAN-OWNED · EST. 2016
          </div>
          <Link href="/dashboard" style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', color: 'var(--text-3)', textDecoration: 'none', letterSpacing: '.06em' }}>
            STAFF LOGIN →
          </Link>
        </div>
      </footer>
    </main>
  )
}
