import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import './globals.css'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Migration Museum — All of us',
  description:
    'A permanent home for migration stories. Opening Spring 2028 at 65 Crutched Friars, City of London.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={workSans.className}>{children}</body>
    </html>
  )
}
