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
    <div className="flex flex-col min-h-screen bg-black md:flex-row">
      {/* Navegación lateral */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 px-4 py-2 bg-black border-t border-gray-700 shadow-2xl rounded-t-4xl bg-opacity-60 backdrop-blur-lg backdrop-filter md:static md:h-full md:w-60 md:rounded-none md:border-r md:border-t-0 md:shadow-none">
        {/* Logo en la parte superior para pantallas md y superiores */}
        <div className="items-center justify-center hidden mb-4 md:flex">
          <h2 className="z-10 flex px-2 mt-6 text-3xl font-bold tracking-tighter text-center text-transparent bg-gradient-to-b from-white to-indigo-100 bg-clip-text">
            <svg
              className="w-12 h-12 mr-2 -mt-1.5"
              viewBox="0 0 381 211"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M162.479 20.7169C175.416 38.7182 171.311 63.7981 153.31 76.7354L67.566 138.357C49.5647 151.294 24.4848 147.189 11.5475 129.187C-1.38984 111.186 2.71548 86.106 20.7168 73.1687L106.461 11.5476C124.462 -1.38974 149.542 2.71559 162.479 20.7169Z"
                fill="#EA4335"
                stroke="#0F0F0F"
                stroke-width="6.66665"
                stroke-miterlimit="10"
              />
              <path
                d="M11.5475 82.3519C-1.38984 100.353 2.71549 125.433 20.7168 138.37L106.461 199.992C124.462 212.929 149.542 208.824 162.479 190.822C175.416 172.821 171.311 147.741 153.31 134.804L67.566 73.1826C49.5647 60.2453 24.4848 64.3506 11.5475 82.3519Z"
                fill="#4285FA"
                stroke="#0F0F0F"
                stroke-width="6.66665"
                stroke-miterlimit="10"
              />
              <path
                d="M369.669 82.3519C382.607 100.353 378.501 125.433 360.5 138.37L274.756 199.992C256.755 212.929 231.675 208.824 218.738 190.822C205.801 172.821 209.906 147.741 227.907 134.804L313.651 73.1826C331.652 60.2453 356.732 64.3506 369.669 82.3519Z"
                fill="#F9AB00"
                stroke="#0F0F0F"
                stroke-width="6.66665"
                stroke-miterlimit="10"
              />
              <path
                d="M218.737 20.7169C205.8 38.7182 209.905 63.7981 227.907 76.7354L313.651 138.357C331.652 151.294 356.732 147.189 369.669 129.187C382.606 111.186 378.501 86.106 360.5 73.1687L274.756 11.5476C256.755 -1.38974 231.675 2.71559 218.737 20.7169Z"
                fill="#34A853"
                stroke="#0F0F0F"
                stroke-width="6.66665"
                stroke-miterlimit="10"
              />
            </svg>
            DevFest
          </h2>
        </div>
        {/* Elementos de navegación */}
        <ul className="flex items-center justify-around md:flex-col md:items-start md:mt-8">
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
            <li key={tab} className="relative mb-2 md:mb-4">
              <button
                className={`flex flex-col items-center transition-all duration-300 md:flex-row md:space-x-2 ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
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
                      ? '-mt-2 translate-y-1 transform rounded-full bg-blue-500 p-2.5 md:p-3 shadow-lg transition-transform duration-300'
                      : 'rounded-full bg-transparent p-3 transition-colors duration-300 hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs md:text-sm font-semibold ${
                    activeTab === tab ? 'mt-2 md:mt-0' : 'mt-1 md:mt-0'
                  }`}
                >
                  {label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenido principal */}
      <div className="z-10 flex-1 min-h-screen p-3 bg-gradient-to-br from-blue-900 via-black to-indigo-900">
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
            {activeTab === 'entrada' && (
              <TicketCard attendeeData={loginInfo.data} />
            )}
            {activeTab === 'calendar' && <Schedule />}
          </>
        )}
      </div>
    </div>
  )
}
