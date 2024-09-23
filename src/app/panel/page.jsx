'use client'

import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/app/context'
import { Ticket, User, Calendar, LogOut } from 'lucide-react'
import { TicketCard } from '@/components/Ticket'
import { useRouter } from 'next/navigation'
import { getAuth, signOut } from 'firebase/auth'
import { Schedule } from '@/components/Schedule'

export default function Panel() {
  const router = useRouter()
  const { authLoading, loginState, loginInfo } = useContext(AppContext)
  const [resolver, setResolver] = useState(false)
  const [activeTab, setActiveTab] = useState('entrada')

  // Auth redirect
  useEffect(() => {
    if (!authLoading) {
      if (loginState) {
        if (loginInfo.data !== null) {
          setResolver(true)
        } else {
          router.push('/')
        }
         setResolver(true)
      } else {
        // router.push('/')
      }
    }
  }, [authLoading, loginState])

  const logout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        // An error happened.
      })
  }
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="min-h-screen p-3 bg-gradient-to-br from-blue-900 via-black to-indigo-900">
        {/* Main */}
        {!resolver ? (
          <div className="flex items-center justify-center h-96">
            <div className="wrapper">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        ) : (
          <>
          {activeTab === 'entrada' && <TicketCard attendeeData={loginInfo.data} />}
          {activeTab === 'calendar' && <Schedule/>}
          </>
        )}
      </div>
      <nav className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-black border-t border-gray-700 shadow-2xl rounded-t-4xl bg-opacity-60 backdrop-blur-lg backdrop-filter">
        {/* { label: 'Perfil', icon: User, tab: 'profile' }, */}
        <ul className="flex items-center justify-around">
          {[
            { label: 'Entrada', icon: Ticket, tab: 'entrada' },
            { label: 'Agenda', icon: Calendar, tab: 'calendar' },
            {
              label: 'Salir',
              icon: LogOut,
              tab: 'logout',
              onClick: () => logout(),
            },
          ].map(({ label, icon: Icon, tab, onClick }) => (
            <li key={tab} className="relative">
              <button
                className={`flex flex-col items-center transition-all ${
                  activeTab === tab ? 'text-white' : 'text-gray-400'
                }`}
                onClick={() => {
                  setActiveTab(tab)
                  if (onClick) onClick()
                }}
                disabled={!resolver}
              >
                <div
                  className={`${
                    activeTab === tab
                      ? 'translate-y-1 transform rounded-full bg-blue-500 p-2.5 shadow-lg transition-transform'
                      : 'bg-transparent p-3'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-semibold ${activeTab === tab ? 'mt-2' : 'mt-1'}`}
                >
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
