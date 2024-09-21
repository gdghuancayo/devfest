import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'
import '@/styles/global.css'
import '@/styles/tailwind.css'
import Initializer from './initializer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata = {
  title: 'Devfest Huancayo',
  description:
    'DevFest es una conferencia de tecnología descentralizada que se celebra en Huancayo, Perú. Únete a nosotros para aprender, compartir y colaborar en la tecnología del futuro.',
  openGraph: {
    title: 'Devfest Huancayo',
    description:
      'DevFest es una conferencia de tecnología descentralizada que se celebra en Huancayo, Perú. Únete a nosotros para aprender, compartir y colaborar en la tecnología del futuro.',
    url: 'https://app.doctoc.health/',
    siteName: 'Devfest',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/devfesthyo.appspot.com/o/Frame%2054%20(1).png?alt=media&token=08a56800-7277-4188-9c71-1b64e8190613',
        width: 800,
        height: 600,
        alt: 'Devfest Huancayo',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  category: 'event',
  appLinks: {
    web: {
      url: 'https://devfest.huancayo.dev/',
      should_fallback: true,
    },
  },
  icons: {
    icon: '/icon-192x192.png',
    shortcut: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  },
  appeWebApp: {
    title: 'Devfest',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full bg-gray-950 antialiased',
        inter.variable,
        dmSans.variable,
      )}
    >
      <body className="flex min-h-full">
        <div className="flex flex-col w-full">
          <Initializer>{children}</Initializer>
        </div>
      </body>
    </html>
  )
}
