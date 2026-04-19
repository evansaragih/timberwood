import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Timberwood — The Thirty Six',
  description: 'Savor every moment from sunrise to sunset at The Thirty Six.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
