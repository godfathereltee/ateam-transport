'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/faq', label: "FAQ's" },
  { href: '/join', label: 'Join Our TEAM' },
]

export default function Nav() {
  const path = usePathname()
  return (
    <nav style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.1rem' }}>Veteran-Owned · Indianapolis, IN</div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-.01em' }}>A-TEAM Transport Services</div>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: 'var(--font-mono)', fontSize: '.72rem', letterSpacing: '.06em', textTransform: 'uppercase',
              color: path === l.href ? 'var(--accent)' : 'var(--text-2)',
              textDecoration: 'none',
              fontWeight: path === l.href ? 700 : 400,
            }}>{l.label}</Link>
          ))}
          <a href="tel:3179827417" style={{ fontFamily: 'var(--font-mono)', fontSize: '.78rem', color: 'var(--text-2)', textDecoration: 'none' }}>(317) 982-7417</a>
          <Link href="/book" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.5rem 1.1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '.85rem', whiteSpace: 'nowrap' }}>
            Request a Trip
          </Link>
        </div>
      </div>
    </nav>
  )
}
