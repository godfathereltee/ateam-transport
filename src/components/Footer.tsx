import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-panel)', padding: '2rem 1.5rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.75rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
          A-TEAM Transport Services
        </div>
        <p style={{ fontSize: '.78rem', color: 'var(--text-3)', lineHeight: 1.7 }}>
          Indianapolis, IN · Veteran-Owned · <a href="tel:3179827417" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>(317) 982-7417</a> · <a href="mailto:dispatch@myateamtransport.com" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>dispatch@myateamtransport.com</a>
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/privacy" style={{ fontSize: '.75rem', color: 'var(--text-3)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
            Privacy Policy
          </Link>
        </div>
        <p style={{ fontSize: '.72rem', color: 'var(--text-3)', marginTop: '.25rem' }}>
          © {new Date().getFullYear()} A-TEAM Transport Services. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
