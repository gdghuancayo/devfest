'use client'

import createGlobe from 'cobe'

import { useState, useEffect, useRef } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date('2024-11-09') - +new Date()
      let timeLeft = {}

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return timeLeft
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return null // Or a loading placeholder
  }

  return (
    <div className="flex items-center justify-center mt-20 font-semibold text-white text-7xl">
      <div className="mx-2 text-center">
        <div>{timeLeft.days || '0'}</div>
        <div className="text-lg md:text-2xl">Días</div>
      </div>
      <div className="mx-2 -mt-12">:</div>
      <div className="mx-2 text-center">
        <div>{timeLeft.hours || '0'}</div>
        <div className="text-lg md:text-2xl">Horas</div>
      </div>
      <div className="mx-2 -mt-12">:</div>
      <div className="mx-2 text-center">
        <div>{timeLeft.minutes || '0'}</div>
        <div className="text-lg md:text-2xl">Minutos</div>
      </div>
      <div className="mx-2 -mt-12">:</div>
      <div className="mx-2 text-center">
        <div>{timeLeft.seconds || '0'}</div>
        <div className="text-lg md:text-2xl">Segundos</div>
      </div>
    </div>
  )
}

export const Hero = () => {
  const router = useRouter()

  const canvasRef = useRef(null)

  useEffect(() => {
    let phi = 4.7

    if (canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 1200 * 2,
        height: 1200 * 2,
        phi: 0,
        theta: -0.3,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 25000,
        mapBrightness: 13,
        mapBaseBrightness: 0.05,
        baseColor: [0.3, 0.3, 0.3],
        glowColor: [0.15, 0.15, 0.15],
        markerColor: [100, 100, 100],
        markers: [
          // { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
          // { location: [40.7128, -74.006], size: 0.03 }, // New York City
          // { location: [35.6895, 139.6917], size: 0.03 }, // Tokyo
          // { location: [28.7041, 77.1025], size: 0.03 }, // Delhi
        ],
        onRender: (state) => {
          state.phi = phi
          phi += 0.0002
        },
      })

      return () => {
        globe.destroy()
      }
    }
  }, [])

  const handleGoogleLogin = async (type) => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    auth.languageCode = 'es'
    await signInWithPopup(auth, provider)
    router.push(`/registro?type=${type}`)
  }
  return (
    <div className="px-3 pt-4">
      <section
        aria-labelledby="global-database-title"
        className="relative flex flex-col items-center justify-center w-full max-w-6xl pt-24 mx-auto mt-20 overflow-hidden shadow-xl rounded-3xl bg-gray-950 shadow-black/30"
      >
        <div className="absolute top-[17rem] size-[40rem] rounded-full bg-indigo-800 blur-3xl md:top-[20rem]" />
        <div className="z-10 inline-block rounded-lg border border-indigo-400/20 bg-indigo-800/20 px-3 py-2.5 text-lg font-semibold leading-4 tracking-tight">
          <span className="text-transparent bg-gradient-to-b from-indigo-200 to-indigo-400 bg-clip-text">
            Google Developers
          </span>
        </div>
        <h2
          id="global-database-title"
          className="z-10 flex px-2 mt-6 text-5xl font-bold tracking-tighter text-center text-transparent bg-gradient-to-b from-white to-indigo-100 bg-clip-text md:text-8xl"
        >
          <svg
            className="w-20 h-20 mr-2 -mt-3 md:-mt-8 md:h-40 md:w-40"
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
        <div className="z-10 flex -mt-4 text-lg text-white opacity-80">
          <date>Noviembre 09</date>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-2 h-2 mx-4 mt-2"
          >
            <path
              fill="currentColor"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"
            ></path>
          </svg>
          <a
            href="https://maps.app.goo.gl/SCakGFUdBbvJFAtN9"
            data-trans="conf_hero_location"
            rel="noopener noreferrer"
            target="_blank"
          >
            UC / Huancayo
          </a>
        </div>
        <canvas
          className="absolute top-[7.1rem] z-20 mt-4 aspect-square size-full max-w-fit md:top-[12rem]"
          ref={canvasRef}
          style={{ width: 1200, height: 1200 }}
        />
        <div className="z-20 mt-28 h-[36rem] w-full overflow-hidden md:-mt-36">
          <div className="absolute bottom-0 w-full h-3/5 bg-gradient-to-b from-transparent via-gray-950/95 to-gray-950" />
          <div className="absolute max-w-6xl m-auto inset-x-6 bottom-12 md:top-2/3">
            <div className="grid grid-cols-1 gap-x-10 gap-y-6 rounded-4xl border border-white/[15%] bg-white/[3%] px-6 py-6 shadow-xl backdrop-blur md:-mt-6 md:grid-cols-7 md:p-8">
              <div className="flex flex-col gap-2 md:col-span-3 md:mt-6">
                <h3 className="text-3xl text-transparent bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text">
                  Regístrate ahora
                </h3>
                <p className="text-lg leading-6 text-indigo-200/80 md:mr-10">
                  Ingresa o crea tu cuenta de Google. Cupos muy limitados, no
                  pierdas tu entrada.
                </p>
              </div>
              <article
                className="Ticket md:col-span-2"
                style={{
                  '--bgTicket': `url(https://firebasestorage.googleapis.com/v0/b/job-venture-141e2.appspot.com/o/ticketbg_online_9a57bb0a8e.webp?alt=media&token=92f9ccdb-8fbb-4a7d-87c5-af92d3849f51)`,
                }}
              >
                <div className="BuyTicket-info">
                  <h3 className="BuyTicket-info-title">Ticket Online</h3>
                  <p className="BuyTicket-info-description">
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
                    onClick={() => handleGoogleLogin('online')}
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
                  <h3 className="BuyTicket-info-title">Ticket Presencial</h3>
                  <p className="BuyTicket-info-description">
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
                    onClick={() => handleGoogleLogin('presencial')}
                  >
                    Regístrate Presencial
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <Countdown />
    </div>
  )
}
