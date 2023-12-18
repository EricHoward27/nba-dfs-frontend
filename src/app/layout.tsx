import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ServerSideNav from '@/components/ServerSideNav'
import { PlayerProvider } from './context/PlayerContext'
import { NextAuthProvider } from './providers/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        </ThemeProvider>
      </body>
    </html>
  )
}
