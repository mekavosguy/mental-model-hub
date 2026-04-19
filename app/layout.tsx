import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mental Model Hub — Think clearly. Decide better.',
  description: 'A structured library of mental models that helps you understand WHAT is happening, WHY it happens, and HOW it plays out.',
  openGraph: {
    title: 'Mental Model Hub',
    description: 'Think clearly. Decide better.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
