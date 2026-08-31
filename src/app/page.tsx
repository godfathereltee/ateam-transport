import Link from 'next/link'

const S = {
  label: { fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--text-3)', marginBottom: '1.75rem' },
  accentLabel: { fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'var(--accent)', marginBottom: '.75rem' },
  section: { padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)' },
  sectionPanel: { padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' },
  wrap: { maxWidth: '960px', margin: '0 auto' },
  h2: { fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-.02em' as const },
  body: { color: 'var(--text-2)', lineHeight: 1.8, fontSize: '1.05rem' },
}

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Nav */}
      <nav style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ ...S.wrap, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.1rem' }}>Veteran-Owned · Indianapolis, IN</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-.01em' }}>A-TEAM Transport Services</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/services" style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--text-2)', textDecoration: 'none', letterSpacing: '.06em', textTransform: 'uppercase' }}>Services</Link>
            <Link href="/faq" style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--text-2)', textDecoration: 'none', letterSpacing: '.06em', textTransform: 'uppercase' }}>FAQ</Link>
            <Link href="/join" style={{ fontFamily: 'var(--font-mono)', fontSize: '.72rem', color: 'var(--text-2)', textDecoration: 'none', letterSpacing: '.06em', textTransform: 'uppercase' }}>Join</Link>
            <a href="tel:3179827417" style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--text-2)', textDecoration: 'none' }}>(317) 982-7417</a>
            <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.5rem 1.1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.85rem', whiteSpace: 'nowrap' }}>
              Request a Trip
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', borderBottom: '1px solid var(--border)' }}>
        <div style={S.wrap}>
          <div style={{ ...S.accentLabel }}>Veteran-Owned · Celebrating 10 Years of Service</div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2.4rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.05, color: 'var(--text)', maxWidth: '14ch', marginBottom: '1.5rem', letterSpacing: '-.02em' }}>
            When your residents need to get there safely.
          </h1>
          <p style={{ ...S.body, maxWidth: '52ch', marginBottom: '2.5rem' }}>
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
        <div style={{ ...S.wrap, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { val: '2016', label: 'Founded' },
            { val: '60+', label: 'Facility partners' },
            { val: '3', label: 'Service types' },
            { val: '24/7', label: 'Dispatch' },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: '1.5rem 1rem', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '.2rem' }}>{s.val}</div>
              <div style={{ fontSize: '.72rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section style={S.sectionPanel}>
        <div style={S.wrap}>
          <div style={S.label}>Our Services</div>
          <h2 style={S.h2}>Safe, reliable transport for every need.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden', marginTop: '1.75rem' }}>
            {[
              { title: 'Stretcher Transport', desc: 'For passengers unable to sit upright during transport. Cost-effective, non-emergency stretcher loading and secure transport.', href: '/services#stretcher' },
              { title: 'Wheelchair Transport', desc: 'Proper wheelchair securement and wider entry ramp access for passengers with varying mobility devices and requirements.', href: '/services#wheelchair' },
              { title: 'Bariatric Transport', desc: 'Wide rear-entry ramps accommodating bariatric wheelchairs and personally owned chairs that exceed standard 35–36" ramp widths.', href: '/services#bariatric' },
            ].map(s => (
              <a key={s.title} href={s.href} style={{ background: 'var(--bg)', padding: '1.75rem 1.5rem', textDecoration: 'none', display: 'block', transition: 'background .15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-panel)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}>
                <div style={{ width: '2rem', height: '2px', background: 'var(--accent)', marginBottom: '1rem' }} />
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.6rem', fontSize: '1.1rem' }}>{s.title}</div>
                <div style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1rem' }}>{s.desc}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.08em', color: 'var(--accent)', textTransform: 'uppercase' }}>Learn more →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section style={S.section}>
        <div style={S.wrap}>
          <div style={S.label}>Who We Serve</div>
          <h2 style={S.h2}>Serving individuals, facilities, and care providers.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { title: 'Individual Passengers', desc: 'Anyone who needs a safe, reliable ride — from a single appointment to recurring trips.' },
              { title: 'Nursing Facilities', desc: 'Trusted partner for skilled nursing and assisted living communities across Central Indiana.' },
              { title: 'Hospitals', desc: 'Discharge transport and inter-facility transfers handled with care and professionalism.' },
              { title: 'Home Care Providers', desc: 'Coordinated transport for home care patients who need consistent, dependable service.' },
            ].map(s => (
              <div key={s.title} style={{ background: 'var(--bg-panel)', padding: '1.75rem 1.5rem' }}>
                <div style={{ width: '2rem', height: '2px', background: 'var(--accent)', marginBottom: '1rem' }} />
                <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '.6rem', fontSize: '1.05rem' }}>{s.title}</div>
                <div style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A-TEAM CARES */}
      <section style={S.section}>
        <div style={S.wrap}>
          <div style={S.accentLabel}>Our Values</div>
          <h2 style={S.h2}><span style={{ whiteSpace: 'nowrap' }}>A-TEAM</span> CARES.</h2>
          <p style={{ ...S.body, maxWidth: '58ch', marginBottom: '2.5rem' }}>
            Over 10 years of service, our reviews have consistently pointed to one thing — A-TEAM drivers and staff genuinely care about every passenger they serve. So much so, we made it the foundation of everything we do. Every team member is held to the A-TEAM CARES standard, every trip, every time.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '1px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', paddingBottom: '.5rem' }}>A-TEAM</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', paddingBottom: '.5rem' }}>CARES</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { letter: 'A', word: 'Accountability',       side: 'A-TEAM' },
              { letter: 'C', word: 'Communication',        side: 'CARES' },
              { letter: 'T', word: 'Teamwork',             side: 'A-TEAM' },
              { letter: 'A', word: 'Attitude',             side: 'CARES' },
              { letter: 'E', word: 'Engagingness',         side: 'A-TEAM' },
              { letter: 'R', word: 'Reliability',          side: 'CARES' },
              { letter: 'A', word: 'Appearance & Presence',side: 'A-TEAM' },
              { letter: 'E', word: 'Excellence',           side: 'CARES' },
              { letter: 'M', word: 'Mastery',              side: 'A-TEAM' },
              { letter: 'S', word: 'Selfless Service',     side: 'CARES' },
            ].map((v, i) => (
              <div key={i} style={{ background: 'var(--bg-panel)', padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)', minWidth: '2rem', textAlign: 'center' }}>{v.letter}</div>
                <div style={{ color: 'var(--text)', fontSize: '1rem', fontWeight: 500 }}>{v.word}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Year */}
      <section style={S.sectionPanel}>
        <div style={S.wrap}>
          <div style={S.accentLabel}>Est. October 2016 · Celebrating 10 Years of Service</div>
          <h2 style={S.h2}>The original. Still the standard.</h2>
          <p style={{ ...S.body, maxWidth: '58ch' }}>
            A-TEAM Transport was founded by a disabled veteran with one mission: move patients safely, every time, no exceptions. This October, we celebrate 10 years of doing exactly that — a decade of trusted relationships, thousands of safe trips, and a standard that has never wavered. Thank you, Central Indiana, for trusting us with the people who matter most.
          </p>
        </div>
      </section>

      {/* Service Area */}
      <section style={S.section}>
        <div style={S.wrap}>
          <div style={S.label}>Service Area</div>
          <p style={{ ...S.body, marginBottom: '1.5rem', maxWidth: '58ch' }}>
            We serve skilled nursing facilities, assisted living communities, and hospitals across Indiana — from Indianapolis to Lafayette to Terre Haute. Fort Wayne to Bloomington to Jeffersonville.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
            {['Indianapolis', 'Greenwood', 'Carmel', 'Fishers', 'Lawrence', 'Beech Grove', 'Speedway', 'Plainfield', 'Avon', 'Brownsburg', 'Noblesville', 'Anderson', 'Columbus', 'Bloomington', 'Jeffersonville', 'Lafayette', 'Fort Wayne', 'Greenfield', 'Richmond'].map(city => (
              <span key={city} style={{ fontFamily: 'var(--font-mono)', fontSize: '.68rem', letterSpacing: '.06em', color: 'var(--text-2)', border: '1px solid var(--border)', borderRadius: '3px', padding: '.3rem .65rem', background: 'var(--bg-panel)' }}>{city}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={S.sectionPanel}>
        <div style={S.wrap}>
          <div style={S.label}>What Passengers Say About A-TEAM</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
            {[
              { quote: "When we're in a bind, ATEAM always comes through for our facility residents — getting them to their medical appointments on time, even when we contact them at the last minute.", name: 'Shelia G., LPN' },
              { quote: "ATEAM is the best. They took care of my mother's transportation needs when I had nowhere to turn. Thank you so much for all you've done for mom.", name: 'Hollie M.' },
              { quote: "I want to thank you for the great trip for my Dad. The trip went very well and the driver was wonderful. I would like to mention ATEAM with a strong endorsement.", name: 'Jim P.' },
            ].map(t => (
              <div key={t.name} style={{ background: 'var(--bg)', padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.8, fontStyle: 'italic', margin: 0 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)' }}>
        <div style={S.wrap}>
          <div style={S.accentLabel}>Ready to schedule?</div>
          <h2 style={S.h2}>Submit online or call us directly.</h2>
          <p style={{ ...S.body, marginBottom: '2rem', maxWidth: '50ch' }}>We confirm trip requests within 30 minutes during business hours. For urgent trips, call us directly. Seven days a week.</p>
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

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem', background: 'var(--bg)' }}>
        <div style={{ ...S.wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
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
