import Nav from '@/components/Nav'

export const metadata = {
  title: 'Privacy Policy | A-TEAM Transport Services',
}

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', padding: '0 0 5rem' }}>
      <Nav />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '.75rem' }}>
            Legal
          </p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.2 }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '.88rem', lineHeight: 1.7 }}>
            Effective Date: October 1, 2024 &nbsp;·&nbsp; Last Updated: September 2026
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          <Section title="Overview">
            <p>
              A-TEAM Transport Services (&ldquo;A-TEAM,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a veteran-owned non-emergency medical transportation (NEMT) company based in Indianapolis, Indiana. We are committed to protecting the privacy and confidentiality of all individuals who use our services or submit information through our website.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we use it, how we protect it, and your rights regarding that information. Because we transport patients to and from medical appointments, some of the information we handle may constitute Protected Health Information (PHI) under the Health Insurance Portability and Accountability Act (HIPAA).
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>When you submit a trip request through our website or contact us directly, we may collect the following:</p>
            <ul>
              <li><strong>Requester Information</strong> — Name, phone number, facility name, and email address of the person arranging transportation.</li>
              <li><strong>Patient Information</strong> — Patient name, weight, and the name of the attending physician (if provided).</li>
              <li><strong>Trip Details</strong> — Pickup and drop-off addresses, date and time of transport, type of transport required, and any special instructions or accessibility needs.</li>
              <li><strong>Communications</strong> — Any messages, emails, or notes exchanged with our dispatch team.</li>
            </ul>
            <p>
              We do not collect Social Security numbers, insurance policy numbers, financial account information, or detailed medical diagnoses through our website.
            </p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information we collect solely to operate and improve our transportation services, including to:</p>
            <ul>
              <li>Schedule, coordinate, and confirm transportation arrangements</li>
              <li>Communicate with requesters and authorized facility contacts regarding trip status</li>
              <li>Send trip confirmation and follow-up communications to the email address provided</li>
              <li>Maintain internal records for operational, safety, and compliance purposes</li>
              <li>Respond to inquiries submitted through our website or by phone</li>
            </ul>
            <p>We do not use your information for marketing purposes, and we do not sell, rent, or trade your personal information to any third party.</p>
          </Section>

          <Section title="How We Share Your Information">
            <p>A-TEAM Transport Services does not sell or share personal or patient information with outside parties for commercial purposes. We may share information in the following limited circumstances:</p>
            <ul>
              <li><strong>Drivers and Dispatch Staff</strong> — Authorized A-TEAM personnel involved in fulfilling your trip request will have access to trip details on a need-to-know basis.</li>
              <li><strong>Service Providers</strong> — We use trusted third-party platforms (including secure cloud database and email delivery services) to store and transmit booking information. These providers are contractually required to handle data securely and confidentially.</li>
              <li><strong>Legal Compliance</strong> — We may disclose information if required by law, court order, or governmental authority.</li>
            </ul>
          </Section>

          <Section title="HIPAA & Protected Health Information">
            <p>
              As a non-emergency medical transportation provider, A-TEAM Transport Services may function as a Business Associate under HIPAA when transporting patients on behalf of covered healthcare entities. In those cases, we operate under the terms of a Business Associate Agreement (BAA) and handle PHI in accordance with applicable HIPAA Privacy and Security Rules.
            </p>
            <p>
              Trip information submitted through our online form is transmitted and stored using encrypted, access-controlled systems. Access to patient-related information is limited to personnel directly involved in arranging or completing the transportation.
            </p>
            <p>
              If you are a healthcare facility or covered entity and require a Business Associate Agreement, please contact us at <a href="mailto:dispatch@myateamtransport.com" style={{ color: 'var(--accent)' }}>dispatch@myateamtransport.com</a>.
            </p>
          </Section>

          <Section title="Data Retention">
            <p>
              We retain trip records and associated information for a minimum of seven (7) years in accordance with Indiana state recordkeeping requirements and general healthcare industry standards. Records may be retained longer if required for legal, audit, or compliance purposes.
            </p>
            <p>
              When records are no longer needed, they are securely deleted or destroyed.
            </p>
          </Section>

          <Section title="Data Security">
            <p>
              We take reasonable administrative, technical, and physical measures to protect the personal and health-related information we handle. Our systems use encrypted data transmission (HTTPS), access controls, and secure third-party infrastructure. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
            <p>
              If you believe your information has been compromised, please contact us immediately at <a href="mailto:dispatch@myateamtransport.com" style={{ color: 'var(--accent)' }}>dispatch@myateamtransport.com</a> or call <a href="tel:3179827417" style={{ color: 'var(--accent)' }}>(317) 982-7417</a>.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>Depending on applicable law, you may have the right to:</p>
            <ul>
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information, subject to legal retention requirements</li>
              <li>Withdraw consent for communications where consent was the basis for processing</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:dispatch@myateamtransport.com" style={{ color: 'var(--accent)' }}>dispatch@myateamtransport.com</a>. We will respond within a reasonable timeframe and in accordance with applicable law.
            </p>
          </Section>

          <Section title="Children's Privacy">
            <p>
              Our website and services are not directed at children under the age of 13. We do not knowingly collect personal information from children without parental or guardian consent. If a minor is being transported, all booking information must be submitted by a responsible adult or authorized healthcare provider.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we do, we will update the &ldquo;Last Updated&rdquo; date at the top of this page. Continued use of our services after any update constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>If you have questions or concerns about this Privacy Policy or how your information is handled, please reach out:</p>
            <div style={{ marginTop: '1rem', padding: '1.25rem 1.5rem', background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: '6px', lineHeight: 2 }}>
              <strong style={{ color: 'var(--text)' }}>A-TEAM Transport Services</strong><br />
              Indianapolis, Indiana<br />
              <a href="tel:3179827417" style={{ color: 'var(--accent)' }}>(317) 982-7417</a><br />
              <a href="mailto:dispatch@myateamtransport.com" style={{ color: 'var(--accent)' }}>dispatch@myateamtransport.com</a><br />
              <a href="https://www.myateamtransport.com" style={{ color: 'var(--accent)' }}>www.myateamtransport.com</a>
            </div>
          </Section>

        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
        <div style={{ width: '1.5rem', height: '2px', background: 'var(--accent)', flexShrink: 0 }} />
        <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
          {title}
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem', color: 'var(--text-2)', lineHeight: 1.8, fontSize: '.92rem' }}>
        {children}
      </div>
    </section>
  )
}
