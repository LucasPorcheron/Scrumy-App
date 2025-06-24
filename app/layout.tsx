import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scrumy',
  description: 'Simule un projet Scrum de façon ludique',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  )
}
