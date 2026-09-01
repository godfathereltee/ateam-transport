'use client'
import Link from 'next/link'
import { useState } from 'react'
import Nav from '@/components/Nav'

const faqs = [
  {
    q: 'Why is Non-Emergency Medical Transportation (NEMT) important?',
    a: 'Non-Emergency Medical Transportation is a critical service that ensures individuals who lack reliable transportation can access their medical appointments, treatments, and other essential health services. Without NEMT, many patients — especially those with disabilities, chronic conditions, or limited mobility — would miss vital appointments, leading to worsening health outcomes. A-TEAM Transport bridges this gap by providing safe, reliable, and compassionate transportation that keeps our passengers connected to the care they need.',
  },
  {
    q: 'Does A-TEAM offer Bariatric and Stretcher transportation?',
    a: 'Yes. A-TEAM Transport is proud to offer both Bariatric and Stretcher transportation services. Our vehicles are specially equipped with wider rear-entry ramps and securement systems designed to accommodate bariatric wheelchairs and other mobility devices that may not be compatible with standard NEMT ramps. Our stretcher transport service is available for passengers who are unable to sit up during transport, providing a safe and comfortable alternative to ambulance services for non-emergency needs.',
  },
  {
    q: 'What is door-through-door service?',
    a: 'Door-through-door service means our drivers go beyond simply dropping you off at the entrance. We assist passengers from inside their origin location — whether that\'s a private residence, nursing facility, or clinic — all the way to the interior of their destination. This level of hands-on support is especially important for passengers with limited mobility, cognitive challenges, or those who require additional assistance navigating hallways, elevators, or doorways. It\'s part of our commitment to truly caring for each person we serve.',
  },
  {
    q: 'Does A-TEAM transport passengers to and from skilled nursing facilities and long-term care facilities?',
    a: 'Absolutely. A-TEAM Transport has extensive experience working with skilled nursing facilities (SNFs), long-term care facilities, assisted living communities, and rehabilitation centers throughout the Indianapolis metro area and beyond. We coordinate closely with facility staff to ensure seamless pickups, safe transfers, and on-time arrivals for medical appointments, therapy sessions, and other essential outings.',
  },
  {
    q: 'Can I hire A-TEAM privately without going through a Medicaid broker or insurance plan?',
    a: 'Yes. A-TEAM Transport accepts private-pay bookings directly. Whether you\'re coordinating transportation for a family member, a patient, or yourself, you can contact us directly to schedule a trip without going through a Medicaid broker or managed care organization. Private-pay passengers enjoy the same high standard of care and professionalism as all A-TEAM passengers.',
  },
  {
    q: 'Does A-TEAM transport passengers on holidays?',
    a: 'Yes. A-TEAM Transport operates 365 days a year, including all major holidays. We understand that medical needs don\'t take holidays, and we\'re committed to being there when you need us most. Please note that holiday scheduling may require advance notice, so we encourage you to book as early as possible for holiday trips.',
  },
  {
    q: 'Can I bring my personal wheelchair or mobility device?',
    a: 'Yes. A-TEAM\'s vehicles are equipped to accommodate a wide range of personal wheelchairs and mobility devices, including standard, power, and bariatric wheelchairs. Our drivers are trained in proper wheelchair securement to ensure your chair is safely fastened during transport. If you have a specialized or oversized mobility device, we encourage you to let us know when booking so we can confirm the right vehicle for your needs.',
  },
  {
    q: 'Can a family member or caregiver ride along during transport?',
    a: 'Yes. A-TEAM Transport welcomes caregivers, family members, and support persons to accompany passengers during their trips. We recognize the important role that caregivers play in a patient\'s health and wellbeing, and we\'re happy to accommodate them whenever possible. Please mention when booking that an additional rider will be joining so we can plan accordingly.',
  },
  {
    q: 'Does A-TEAM provide long-distance transportation?',
    a: 'Yes. A-TEAM Transport provides long-distance medical transportation. Whether you need to travel to a specialist in another city or require transport to a medical facility across the state, we can accommodate your needs. Long-distance trips are available based on scheduling and vehicle availability. We encourage you to contact us in advance to discuss the details of your trip and receive a quote.',
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      <Nav />

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>FAQ</div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--text)', letterSpacing: '-.02em', marginBottom: '1rem' }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '52ch' }}>
            Everything you need to know about A-TEAM Transport Services. Don&apos;t see your question? Call us directly.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ padding: '3rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid var(--border)',
                marginBottom: 0,
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  padding: '1.5rem 0',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.4, flex: 1 }}>
                  {faq.q}
                </span>
                <span style={{
                  color: 'var(--accent)',
                  fontSize: '1.25rem',
                  lineHeight: 1,
                  flexShrink: 0,
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform .2s',
                  marginTop: '.15rem',
                }}>
                  +
                </span>
              </button>
              {open === i && (
                <div style={{ paddingBottom: '1.5rem' }}>
                  <p style={{ color: 'var(--text-2)', fontSize: '1rem', lineHeight: 1.9, maxWidth: '66ch', margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3.5rem 1.5rem', background: 'var(--bg-panel)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>Still Have Questions?</div>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '.75rem', letterSpacing: '-.02em' }}>We&apos;re happy to help.</h2>
          <p style={{ color: 'var(--text-2)', marginBottom: '1.75rem', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '48ch' }}>Call us directly or submit a booking request and we&apos;ll reach out.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:3179827417" style={{ background: 'var(--accent)', color: 'var(--accent-fg)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem', display: 'inline-block' }}>
              Call (317) 982-7417
            </a>
            <Link href="/book" style={{ border: '1px solid var(--border)', color: 'var(--text)', padding: '.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem', background: 'var(--bg)', display: 'inline-block' }}>
              Request a Trip →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
