import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'

import './_styles/normalize.scss'
import './_styles/theme.scss'
import Providers from './providers'

const workSans = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fravega Challenge',
  description: 'Fravega Challenge - Frontend',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={workSans.className}>
        <Providers>
          <div className="page-container">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
