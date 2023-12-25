import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ServerSideNav from '@/components/ServerSideNav'
import { PlayerProvider } from './context/PlayerContext'
import { NextAuthProvider } from './providers/NextAuthProvider'
import Footer from '@/components/footer'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

const inter = Inter({ subsets: ['latin'] })

if (process.env.NODE_ENV === 'production') disableReactDevTools();

export const metadata: Metadata = {
  title: 'ERA NBA LINEUP GENERATOR',
  description: 'Free Optimal Lineup Generator Tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <ServerSideNav />
          <NextAuthProvider>
          <PlayerProvider>
         
           {children}
          </PlayerProvider>
          </NextAuthProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
