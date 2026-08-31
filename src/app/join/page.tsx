import Link from 'next/link'
import Nav from '@/components/Nav'

export default function JoinPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <Nav />

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>Careers</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text)', letterSpacing: '-.02em', marginBottom: '1.25rem' }}>
            Join Our Team!
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.9, maxWidth: '58ch' }}>
            We are A-TEAM. Every team member at A-TEAM is valued. An entrepreneurial spirit in each team member increases our ability to problem-solve the way to continued success. If you&apos;re successful, we are successful.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Our Mission</div>
          <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.9, maxWidth: '62ch' }}>
            Our mission is to provide our customers with the most reliable, efficient, and safest transportation services throughout Indiana. It is our #1 priority to deliver grade &ldquo;A&rdquo; quality service and solutions that exceed the needs and expectations of our customers.
          </p>
        </div>
      </section>

      {/* Vision */}
      <section style={{ padding: '3.5rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Vision Statement</div>
          <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.9, maxWidth: '62ch' }}>
            As a proven provider of family and community-based services, A-TEAM Transport consistently seeks valued win-win partnerships that foster effective management solutions with the best possible care for the people we serve. Our goal is to provide a range of services and solutions that promote safety, reliability, and cost savings for our entire ecosystem.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3.5rem 1.5rem', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Ready to Join?</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem', letterSpacing: '-.02em' }}>Call us or send us a message.</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '1.75rem', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '48ch' }}>Interested in joining the A-TEAM? Reach out directly and let&apos;s talk.</p>
          <a href="tel:3179827417" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem', display: 'inline-block' }}>
            Call (317) 982-7417
          </a>
        </div>
      </section>

    </main>
  )
}
