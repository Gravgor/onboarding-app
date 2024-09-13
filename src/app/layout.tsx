import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Employee Onboarding Compliance Software',
  description: 'Streamline your employee onboarding process with our compliance software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        </body>
    </html>
  )
}