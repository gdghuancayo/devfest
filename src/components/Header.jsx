'use client'

import useScroll from '@/lib/use-scroll'
import { cx } from '@/lib/utils'
import React from 'react'
import { UsersRound, Calendar, Sparkles, Gift } from 'lucide-react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export function Header() {
  const scrolled = useScroll(15)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaQueryChange = (event) => {
      setOpen(false)
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange)
    handleMediaQueryChange({
      matches: mediaQuery.matches,
    })
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  const login = async () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    auth.languageCode = 'es'
    await signInWithPopup(auth, provider)
    router.push(`/panel`)
  }
  function scrollToTitle(idref) {
    const titleElement = document.getElementById(idref)
    titleElement.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <header
      className={cx(
        'animate-slide-down-fade fixed inset-x-3 top-4 z-50 mx-auto flex max-w-6xl transform-gpu justify-center overflow-hidden rounded-xl border border-transparent px-3 py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1.03)] will-change-transform',
        open === true ? 'h-52' : 'h-16',
        scrolled || open === true
          ? 'backdrop-blur-nav max-w-4xl border-gray-100 bg-white/80 shadow-xl shadow-black/5 dark:border-white/15 dark:bg-black/70'
          : 'bg-white/0 dark:bg-gray-950/0',
      )}
    >
      <div className="w-full md:my-auto">
        <div className="relative flex items-center justify-between">
          <div>
            <span className="sr-only">Devfest Huancayo</span>
            <div className="flex">
              <svg
                className="w-auto h-10"
                viewBox="0 0 168 413"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.40132 253.157H30.3266C37.7839 253.157 43.8306 259.203 43.8306 266.661V341.478C43.8306 378.768 74.0612 408.999 111.352 408.999H158.501C159.21 408.999 159.913 408.86 160.568 408.588C161.224 408.317 161.819 407.919 162.321 407.417C162.822 406.916 163.22 406.32 163.491 405.665C163.763 405.01 163.902 404.307 163.902 403.598V327.837C163.902 326.404 163.333 325.03 162.32 324.017C161.307 323.004 159.934 322.434 158.501 322.434H123.902C116.445 322.434 110.398 316.389 110.398 308.93V104.068C110.398 96.6105 116.445 90.5638 123.902 90.5638H158.501C159.21 90.564 159.913 90.4244 160.568 90.153C161.224 89.8816 161.819 89.4838 162.321 88.9822C162.822 88.4806 163.22 87.8851 163.491 87.2297C163.763 86.5743 163.902 85.8718 163.902 85.1625V9.40134C163.902 7.96882 163.333 6.59496 162.32 5.58201C161.307 4.56907 159.933 4.00003 158.501 4.00003H111.352C74.0612 4.00003 43.8306 34.2293 43.8306 71.5212V149.713C43.8306 157.17 37.7839 163.217 30.3266 163.217H9.40132C8.69201 163.217 7.98964 163.357 7.33432 163.628C6.67901 163.9 6.08357 164.297 5.58201 164.799C5.08045 165.301 4.68259 165.896 4.41115 166.551C4.13971 167.207 4 167.909 4 168.618V247.755C4 249.188 4.56907 250.562 5.58201 251.575C6.59495 252.588 7.9688 253.157 9.40132 253.157Z"
                  fill="#CCF6CF"
                  stroke="#1E1E1E"
                  stroke-width="6.66665"
                  stroke-miterlimit="10"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="mx-2 text-2xl font-bold text-white">GDG</p>
              <svg
                className="w-auto h-10"
                viewBox="0 0 168 413"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M158.501 159.842H137.576C130.118 159.842 124.072 153.796 124.072 146.338L124.072 71.5212C124.072 34.2306 93.8411 4 56.5505 4L9.40133 4C8.69197 3.99982 7.98952 4.13942 7.33413 4.4108C6.67873 4.68218 6.08322 5.08003 5.58163 5.58162C5.08004 6.08321 4.68218 6.67872 4.41081 7.33412C4.13943 7.98952 3.99983 8.69196 4.00001 9.40132V85.1625C4.00001 86.5951 4.56903 87.9691 5.58193 88.9823C6.59484 89.9954 7.96869 90.5648 9.40133 90.5651H43.9999C51.4572 90.5651 57.5039 96.6104 57.5039 104.069L57.5039 308.931C57.5039 316.389 51.4572 322.435 43.9999 322.435H9.40133C8.69197 322.435 7.98952 322.575 7.33413 322.846C6.67873 323.117 6.08322 323.515 5.58163 324.017C5.08004 324.518 4.68218 325.114 4.41081 325.769C4.13943 326.425 3.99983 327.127 4.00001 327.837V403.598C4.00001 405.03 4.56907 406.404 5.58202 407.417C6.59496 408.43 7.96881 408.999 9.40133 408.999H56.5505C93.8411 408.999 124.072 378.77 124.072 341.478V263.286C124.072 255.829 130.118 249.782 137.576 249.782H158.501C159.21 249.782 159.913 249.642 160.568 249.371C161.223 249.099 161.819 248.702 162.32 248.2C162.822 247.699 163.22 247.103 163.491 246.448C163.763 245.792 163.902 245.09 163.902 244.381L163.902 165.244C163.902 163.811 163.333 162.437 162.32 161.424C161.307 160.411 159.933 159.842 158.501 159.842Z"
                  fill="#CCF6CF"
                  stroke="#1E1E1E"
                  stroke-width="6.66665"
                  stroke-miterlimit="10"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <nav className="hidden md:absolute md:left-1/2 md:top-1/2 md:block md:-translate-x-1/2 md:-translate-y-1/2 md:transform">
            <div className="flex items-center gap-10 font-medium">
              <button
                className="flex px-2 py-1 text-gray-50"
                onClick={() => scrollToTitle('speakers')}
              >
                <UsersRound className="w-6 h-6 mr-2" /> Speakers
              </button>
              <button
                className="flex px-2 py-1 text-gray-50"
                onClick={() => scrollToTitle('agenda')}
              >
                <Calendar className="w-6 h-6 mr-2" /> Agenda
              </button>
              <button
                className="flex px-2 py-1 text-gray-50"
                onClick={() => scrollToTitle('gifts')}
              >
                <Gift className="w-6 h-6 mr-2" />
                Regalos
              </button>
              <button
                className="flex px-2 py-1 text-gray-50"
                onClick={() => scrollToTitle('sponsors')}
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Patrocinadores
              </button>
            </div>
          </nav>

          <button
            className="hidden h-10 px-4 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 md:block"
            onClick={() => login()}
          >
            Ingresar
          </button>

          <div className="flex gap-x-2 md:hidden">
            <button
              className="h-10 px-4 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900"
              onClick={() => login()}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
