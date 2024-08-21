import { DM_Sans, Inter } from 'next/font/google'
import clsx from 'clsx'
import '@/styles/global.css'
import '@/styles/tailwind.css'

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
  title: "Devfest",
  description:
    'DevFest es una conferencia de tecnología descentralizada que se celebra en Huancayo, Perú. Únete a nosotros para aprender, compartir y colaborar en la tecnología del futuro.',
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
        <div className="flex flex-col w-full">{children}</div>
      </body>
    </html>
  )
}
