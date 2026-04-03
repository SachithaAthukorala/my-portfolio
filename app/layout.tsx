import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: {
    default: 'Sachitha Athukorala — Full-Stack Developer & Photographer',
    template: '%s | Sachitha Athukorala',
  },
  description:
    'Full-Stack Developer specialising in web, mobile, and desktop applications. Based in Anuradhapura, Sri Lanka. Also a professional photographer.',
  keywords: ['Full-Stack Developer', 'Flutter', 'Next.js', 'React', 'Sri Lanka', 'Photographer'],
  authors: [{ name: 'Sachitha Athukorala' }],
  openGraph: {
    title: 'Sachitha Athukorala — Full-Stack Developer & Photographer',
    description: 'Full-Stack Developer & Photographer based in Sri Lanka.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} ${jetbrains.variable}`}>
      <body className="bg-navy-700 text-white antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
