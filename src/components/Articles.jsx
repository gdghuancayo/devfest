'use client'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export const Articles = () => {
  const router = useRouter()
  
  const register = async (type) => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    auth.languageCode = 'es'
    await signInWithPopup(auth, provider)
    router.push(`/registro?type=${type}`)
  }

  return (
    <>
      <article
        className="Ticket md:col-span-2"
        style={{
          '--bgTicket': `url(https://firebasestorage.googleapis.com/v0/b/job-venture-141e2.appspot.com/o/ticketbg_online_9a57bb0a8e.webp?alt=media&token=92f9ccdb-8fbb-4a7d-87c5-af92d3849f51)`,
        }}
      >
        <div className="BuyTicket-info">
          <h3 className="truncate BuyTicket-info-title">Ticket Online</h3>
          <p className="truncate BuyTicket-info-description sm:overflow-visible sm:whitespace-normal">
            Disfruta del DevFest desde cualquier lugar vía streaming
          </p>
        </div>
        <div className="Ticket-divider">
          <div className="Ticket-divider--left"></div>
          <hr />
          <div className="Ticket-divider--right"></div>
        </div>
        <div className="BuyTicket-cta">
          <button
            className="bg-gray-800 rounded-lg"
            onClick={() => register('online')}
          >
            Regístrate Online
          </button>
        </div>
      </article>
      <article
        className="Ticket md:col-span-2"
        style={{
          '--bgTicket': `url(https://firebasestorage.googleapis.com/v0/b/job-venture-141e2.appspot.com/o/ticketbg_onsite_d823603ae9.webp?alt=media&token=864632cb-c7df-4645-a4bd-8e9a202c0ed8)`,
        }}
      >
        <div className="BuyTicket-info">
          <h3 className="truncate BuyTicket-info-title">Ticket Presencial</h3>
          <p className="truncate BuyTicket-info-description sm:overflow-visible sm:whitespace-normal">
            Asiste en persona a la Universidad Continental
          </p>
        </div>
        <div className="Ticket-divider">
          <div className="Ticket-divider--left"></div>
          <hr />
          <div className="Ticket-divider--right"></div>
        </div>
        <div className="BuyTicket-cta">
          <button
            className="px-4 py-2 font-bold text-white rounded-lg bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900"
            onClick={() => register('presencial')}
          >
            Regístrate Presencial
          </button>
        </div>
      </article>
    </>
  )
}
