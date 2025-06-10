import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'

import Header from './_components/Header/Header'
import './_styles/normalize.scss'
import './_styles/theme.scss'
import Providers from './providers'

const workSans = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Github API',
  description: 'Users list using Github API',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={workSans.className}>
        <Providers>
          <a href="#main-content" className="skip-link">
            Saltar al contenido principal
          </a>
          <Header />
          <main id="main-content" className="page-container">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
