import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request a Trip — Book NEMT in Indianapolis',
  description: 'Submit a non-emergency medical transportation request online. A-TEAM Transport Services serves Indianapolis and Central Indiana — wheelchair, stretcher & ambulatory transport.',
  alternates: { canonical: 'https://www.myateamtransport.com/book' },
  openGraph: { url: 'https://www.myateamtransport.com/book' },
  robots: { index: false }, // keep booking form out of search results
}
