'use client'

import { useEffect, useState } from 'react'

export const Schedule = () => {
  const timezone = useGetTimezone()

  return (
    <section id="agenda" className="mx-auto max-w-[802px] px-4 pb-40 pt-20">
      <h2 className="max-w-2xl mx-auto text-4xl font-medium tracking-tighter text-center text-white font-display sm:text-5xl">
        Agenda
      </h2>
      <p className="mt-4 text-center text-xl text-white/80 [text-wrap:balance]">
        Conferencia / Talleres / Experiencias
      </p>
      <div className="w-full mx-auto mt-2 space-y-4 text-center">
        <span className="inline-flex flex-wrap items-center justify-center px-3 py-1 text-sm font-medium text-white rounded-full text-primary-300 shadow-inset bg-sky-950 shadow-white">
          <span className="flex items-center gap-1 mr-1 opacity-75">
            <svg
              aria-hidden="true"
              className="w-3 h-3 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="#fff"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            Zona horaria de la agenda:
          </span>{' '}
          <span>{timezone}</span>
        </span>
      </div>
      <div className="flex flex-col gap-8 mt-12 md:hidden lg:mt-16">
        {LIST_OF_TALKS.map((talk) => (
          <AgendaItemMobile key={talk.speaker.name} {...talk} />
        ))}
      </div>
      <div className="flex-col hidden gap-8 mt-12 md:flex lg:mt-16">
        {LIST_OF_TALKS.map((talk) => (
          <AgendaItem key={talk.speaker.name} {...talk} />
        ))}
      </div>
    </section>
  )
}

const AgendaItem = ({ startAt, durationInMinutes, title, speaker }) => {
  const time = useTime({ timestamp: startAt, durationInMinutes })

  return (
    <article className="relative flex w-full flex-col gap-5 overflow-hidden rounded-[20px] border border-white/[5%] bg-white/[3%] p-6 shadow before:absolute before:inset-0 before:-z-10 before:h-full before:w-full sm:flex-row sm:items-stretch">
      <p className="flex items-center justify-center w-auto text-5xl font-bold shrink-0 text-white/60 sm:w-32 sm:text-right">
        {time?.startAt}
      </p>
      <div className="flex-1">
        <header className="flex flex-row items-center gap-x-2">
          <h4 className="font-medium leading-tight text-transparent bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text">
            {speaker.name}
          </h4>
          <span className="text-white/70">- {speaker.description}</span>
        </header>
        <h4 className="mt-2 text-xl font-bold text-white">{title}</h4>
        <div className="flex items-center gap-3">
          <img
            className="absolute right-0 top-0 -z-10 h-full w-[200px] shrink-0 object-cover object-center brightness-50 sm:brightness-100"
            src={speaker.imgUrl}
            alt={`Foto de ${speaker.name}`}
            style={{
              maskImage: 'linear-gradient(to left, black 50%, transparent 90%)',
            }}
          />
        </div>
      </div>
    </article>
  )
}

const AgendaItemMobile = ({ startAt, durationInMinutes, title, speaker }) => {
  const time = useTime({ timestamp: startAt, durationInMinutes })

  return (
    <article>
      <header className="flex items-center gap-x-4">
        <h4 className="text-sm text-transparent bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text">
          {speaker.name}
        </h4>
        <div className="bg-midu-primary h-[1px] w-full flex-1"></div>
        <span className="text-sm text-white/50">
          {time?.startAt} - {time?.endAt}
        </span>
      </header>
      <div className="flex items-center mt-3 gap-x-3">
        <img
          className="object-cover object-center w-16 h-16 rounded-full"
          src={speaker.imgUrl}
          alt={`Foto de ${speaker.name}`}
        />
        <h5 className="font-bold text-white">{title}</h5>
      </div>
    </article>
  )
}

const AgendaRaffle = ({ title, sponsor }) => {
  const accesibilityLink = `Ir al sitio de ${sponsor.name}`

  return (
    <div className="relative w-full max-w-md p-4 mx-auto overflow-hidden text-white border border-midu-primary/50 bg-button md:shadow-button group cursor-crosshair rounded-2xl">
      <h4 className="font-bold">{title}</h4>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-sm text-white/60">Patrocinado por:</span>
        <a
          href={sponsor.url}
          target="_blank"
          title={accesibilityLink}
          aria-label={accesibilityLink}
        >
          <sponsor.logo />
        </a>
      </div>
      <div
        aria-disabled
        className="absolute bottom-0 right-0 -z-10 h-auto w-max -rotate-12 scale-125 opacity-50 transition-transform group-hover:-rotate-[24deg] group-hover:scale-150"
      >
        <sponsor.logo />
      </div>
    </div>
  )
}

const useTime = ({ timestamp, durationInMinutes }) => {
  const [time, setTime] = useState(null)

  useEffect(() => {
    // get HH:MM in the local user timezone
    const timeFormatConfig = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }

    const durationInMs = durationInMinutes * 60 * 1000

    const startAt = new Date(timestamp).toLocaleTimeString([], timeFormatConfig)
    const endAt = new Date(timestamp + durationInMs).toLocaleTimeString(
      [],
      timeFormatConfig,
    )

    // setTime(`${localTime} - ${endTime}`)
    setTime({
      startAt,
      endAt,
    })
  }, [])

  return time
}

export const useGetTimezone = () => {
  const [timezone, setTimezone] = useState(null)

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(timezone)
  }, [])

  return timezone
}

const LIST_OF_TALKS = [
  {
    speaker: {
      name: 'Miguel Ángel Durán',
      description: 'Creador de contenido y divulgador',
      imgUrl: '/images/man.jpg',
    },
    title: '¡Hola, miduConf 👋!',
    startAt: 1726153200000,
    durationInMinutes: 15,
  },
  {
    speaker: {
      name: 'Guillermo Rauch',
      description: 'CEO de Vercel',
      imgUrl: '/images/man.jpg',
    },
    title: 'Como la IA Revolucionará el mundo Web',
    startAt: 1726154100000,
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Carmen Ansio',
      description: 'UX Engineer Freelance',
      imgUrl: '/images/man.jpg',
    },
    title: 'CSS en 2024',
    startAt: 1726155900000,
    durationInMinutes: 30,
  },
]
