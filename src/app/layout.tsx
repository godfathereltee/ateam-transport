import type { Metadata } from 'next'
import { DM_Sans, Space_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600'],
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
})

const BASE_URL = 'https://www.myateamtransport.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'A-TEAM Transport Services | NEMT Indianapolis, IN',
    template: '%s | A-TEAM Transport Services',
  },
  description: 'Veteran-owned non-emergency medical transportation in Indianapolis, IN. Wheelchair, stretcher, gurney & bariatric transport for hospital discharges, nursing facility transfers, dialysis, rehab, senior care & more. Serving Central Indiana since 2016.',
  keywords: [
    // Core service identity
    'non-emergency medical transportation Indianapolis',
    'NEMT Indianapolis Indiana',
    'medical transportation Central Indiana',
    'veteran owned NEMT Indiana',
    'A-TEAM Transport Services',
    'ATEAM Transport Indianapolis',
    // Transport types
    'wheelchair transport Indianapolis',
    'stretcher transportation Indianapolis',
    'gurney transportation Indianapolis',
    'cot transportation Indianapolis',
    'ambulance alternative Indianapolis',
    'non-emergency ambulance Indianapolis',
    'bariatric transportation Indianapolis',
    'bariatric wheelchair transport Indiana',
    'ambulatory transport Indianapolis',
    // Medical destinations & needs
    'hospital discharge transportation Indianapolis',
    'nursing facility transportation Indiana',
    'nursing home transportation Indianapolis',
    'home health transportation Indiana',
    'home care patient transportation Indiana',
    'dialysis transportation Indianapolis',
    'senior transportation Indianapolis',
    'senior care transportation Indiana',
    'medical appointment transportation Indianapolis',
    'rehabilitation transportation Indianapolis',
    // Airport & extended service
    'airport transportation medical Indianapolis',
    'long distance medical transportation Indiana',
    // Facility-facing keywords
    'NEMT provider for hospitals Indiana',
    'transportation for nursing facilities Indianapolis',
    'discharge transportation partner Indianapolis',
  ],
  authors: [{ name: 'A-TEAM Transport Services' }],
  creator: 'A-TEAM Transport Services',
  publisher: 'A-TEAM Transport Services',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'A-TEAM Transport Services',
    title: 'A-TEAM Transport Services | NEMT Indianapolis, IN',
    description: 'Veteran-owned non-emergency medical transportation serving Central Indiana since 2016. Wheelchair, stretcher, gurney & bariatric transport for hospital discharges, nursing facility transfers, dialysis, senior care & more.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A-TEAM Transport Services — Indianapolis NEMT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-TEAM Transport Services | NEMT Indianapolis, IN',
    description: 'Veteran-owned non-emergency medical transportation serving Central Indiana since 2016.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'A-TEAM Transport Services',
  alternateName: 'ATEAM Transport',
  description: 'Veteran-owned non-emergency medical transportation (NEMT) serving Central Indiana since 2016. Specializing in wheelchair, stretcher, bariatric, and ambulatory transport to medical appointments, dialysis, rehabilitation, and more.',
  url: 'https://www.myateamtransport.com',
  telephone: '+13179827417',
  email: 'dispatch@myateamtransport.com',
  foundingDate: '2016-10',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indianapolis',
    addressRegion: 'IN',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'City', name: 'Indianapolis' },
    { '@type': 'City', name: 'Bloomington' },
    { '@type': 'City', name: 'Columbus' },
    { '@type': 'City', name: 'Greenwood' },
    { '@type': 'City', name: 'Franklin' },
    { '@type': 'City', name: 'Martinsville' },
    { '@type': 'City', name: 'Spencer' },
    { '@type': 'City', name: 'Linton' },
    { '@type': 'City', name: 'Bedford' },
    { '@type': 'State', name: 'Indiana' },
  ],
  serviceType: [
    'Non-Emergency Medical Transportation',
    'Wheelchair Transportation',
    'Stretcher Transportation',
    'Gurney Transportation',
    'Bariatric Transportation',
    'Ambulatory Transportation',
    'Dialysis Transportation',
    'Medical Appointment Transportation',
    'Hospital Discharge Transportation',
    'Nursing Facility Transportation',
    'Home Health Patient Transportation',
    'Senior Care Transportation',
    'Rehabilitation Transportation',
    'Airport Medical Transportation',
    'Non-Emergency Ambulance Alternative',
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  identifier: {
    '@type': 'PropertyValue',
    name: 'Veteran-Owned Small Business',
    value: 'true',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
