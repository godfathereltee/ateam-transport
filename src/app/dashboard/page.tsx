// LMAC Command Center — dashboard shell (Phase 2: connected to Supabase)
export default function DashboardPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>LMAC · Command Center</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem' }}>Dashboard Coming Soon</h1>
        <p style={{ color: 'var(--text-2)', fontSize: '.9rem', lineHeight: 1.7 }}>
          The LMAC Command Center is in active development. Trip tracking, facility intelligence, driver compliance, and owner briefing will live here.
        </p>
      </div>
    </main>
  )
}
