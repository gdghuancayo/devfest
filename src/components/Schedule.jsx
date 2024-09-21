'use client'

import { useEffect, useState } from 'react'
import LeslieImage from '@/images/ponentes/leslie.jpg'
import DamianImage from '@/images/ponentes/damian.png'
import AaronImage from '@/images/ponentes/aaron.jpeg'
import JorgeImage from '@/images/ponentes/jorge.jpg'
import NicolasImage from '@/images/ponentes/nicolas.jpg'
import CesarImage from '@/images/ponentes/cesar.jpg'
import ErikImage from '@/images/ponentes/erik.jpg'
import FelicitasImage from '@/images/ponentes/felicitas.jpeg'
import EduardoImage from '@/images/ponentes/eduardo.jpg'
import GonzaloImage from '@/images/ponentes/gonzalo.jpg'
import AndersImage from '@/images/ponentes/anders.png'
import LuceroImage from '@/images/ponentes/lucero.jpg'
import EdwardImage from '@/images/ponentes/edward.png'
import SamuelImage from '@/images/ponentes/samuel.jpg'
import YancelImage from '@/images/ponentes/yancel.jpg'
import Image from 'next/image'

function generarStartAt(hora) {
  const [horas, minutos] = hora.split(':').map(Number)

  // Establecer la fecha deseada (por ejemplo, 13 de octubre de 2024)
  const fecha = new Date(2024, 9, 13) // Nota: los meses en JavaScript van de 0 (enero) a 11 (diciembre)

  // Establecer las horas y minutos
  fecha.setHours(horas, minutos, 0, 0)

  // Retornar el timestamp en milisegundos
  return fecha.getTime()
}

const LIST_OF_TALKS = [
  {
    speaker: {
      name: 'José Eduardo',
      description: 'GitHub Campus Expert',
      imgUrl: EduardoImage,
    },
    title: 'En comunidad crecemos todos ✨',
    startAt: generarStartAt('14:00'),
    durationInMinutes: 20,
  },
  {
    speaker: {
      name: 'Cesar Cervantes',
      description: 'Platzi',
      imgUrl: CesarImage,
    },
    title: 'Nunca pares de aprender 💪',
    startAt: generarStartAt('14:30'),
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Damian Sire',
      description: 'Google Expert',
      imgUrl: DamianImage,
    },
    title: 'Conoce Angular en 20 minutos 📱',
    startAt: generarStartAt('15:10'),
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Felícitas Pila',
      description: 'Nasa Space Apps',
      imgUrl: FelicitasImage,
    },
    title: 'Tecnología al rescate 🌍',
    startAt: generarStartAt('15:50'),
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Nicolas Molina',
      description: 'Platzi',
      imgUrl: NicolasImage,
    },
    title: 'Signals y RxJs 🚦',
    startAt: generarStartAt('16:30'),
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Aarón Guerrero',
      description: 'Google Expert',
      imgUrl: AaronImage,
    },
    title: 'Certificate con Google 🎓',
    startAt: generarStartAt('17:00'),
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Leslie Lugo',
      description: 'Google Analytical Lead',
      imgUrl: LeslieImage,
    },
    title: 'Surfea la ola de la IA 🤖',
    startAt: generarStartAt('17:30'),
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Erik Sibille',
      description: 'Musa',
      imgUrl: ErikImage,
    },
    title: 'El secreto de las startups 🚀',
    startAt: generarStartAt('18:10'),
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Lucero Beatriz',
      description: 'GORE Junín',
      imgUrl: LuceroImage,
    },
    title: 'Gobierno y tecnología 🏛️',
    startAt: generarStartAt('18:50'),
    durationInMinutes: 30,
  },
]

const LIST_OF_WORKSHOPS = [
  {
    speaker: {
      name: 'Jürgen Anders',
      description: 'Datapath',
      imgUrl: AndersImage,
    },
    title: 'Taller de IoT 📡',
    startAt: generarStartAt('8:00'),
    durationInMinutes: 120,
  },
  {
    speaker: {
      name: 'Gonzalo Caira',
      description: 'Full Time Force',
      imgUrl: GonzaloImage,
    },
    title: 'Taller de Flutter 🦋',
    startAt: generarStartAt('8:00'),
    durationInMinutes: 120,
  },
  {
    speaker: {
      name: 'Edward Luna',
      description: 'Dotoc',
      imgUrl: EdwardImage,
    },
    title: 'Taller de AppScript 📊',
    startAt: generarStartAt('8:00'),
    durationInMinutes: 120,
  },
  {
    speaker: {
      name: 'Samuel Rojas',
      description: 'INIA',
      imgUrl: SamuelImage,
    },
    title: 'Taller de Google Earth Engine 🌍',
    startAt: generarStartAt('8:00'),
    durationInMinutes: 120,
  },
  {
    speaker: {
      name: 'Yancel Valdivia',
      description: 'Zébrands',
      imgUrl: YancelImage,
    },
    title: 'Taller de IA con Gemini 🌌',
    startAt: generarStartAt('8:00'),
    durationInMinutes: 120,
  }
]

export const Schedule = () => {
  const timezone = useGetTimezone()
  const [activeTab, setActiveTab] = useState('Conferencia')
  const [arrayRender, setArrayRender] = useState([])
  useEffect(() => {
    if (activeTab === 'Conferencia') {
      setArrayRender(LIST_OF_TALKS)
    } else if (activeTab === 'Talleres') {
      setArrayRender(LIST_OF_WORKSHOPS)
    }
  }, [activeTab])
  return (
    <section id="agenda" className="mx-auto max-w-[802px] px-4 pb-40 pt-20">
      <h2 className="max-w-2xl mx-auto text-4xl font-medium tracking-tighter text-center text-white font-display sm:text-5xl">
        Agenda
      </h2>
      <p className="mt-4 text-center text-xl text-white/80 [text-wrap:balance]">
        <button
          className={`mx-2 text-midu-primary font-bold ${activeTab === 'Conferencia' ? 'rounded-full bg-indigo-900 px-3 py-1' : ''} `}
          onClick={() => setActiveTab('Conferencia')}
        >
          Conferencia
        </button>{' '}
        |{' '}
        <button
          className={`mx-2 text-midu-primary font-bold ${activeTab === 'Talleres' ? 'rounded-full bg-indigo-900 px-3 py-1' : ''} `}
          onClick={() => setActiveTab('Talleres')}
        >
          Talleres
        </button>{' '}
        |{' '}
        <button
          className={`mx-2 text-midu-primary font-bold ${activeTab === 'Experiencias' ? 'rounded-full bg-indigo-900 px-3 py-1' : ''} `}
          onClick={() => setActiveTab('Experiencias')}
        >
          Experiencias
        </button>
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
        {arrayRender.map((talk) => (
          <AgendaItemMobile key={talk.speaker.name} {...talk} />
        ))}
      </div>
      <div className="flex-col hidden gap-8 mt-12 md:flex lg:mt-16">
        {arrayRender.map((talk) => (
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
          <Image
            className="absolute right-0 top-0 -z-10 h-full w-[200px] shrink-0 object-cover object-top brightness-50 sm:brightness-100"
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
        <Image
          className="object-cover object-top w-16 h-16 rounded-full"
          src={speaker.imgUrl}
          alt={`Foto de ${speaker.name}`}
        />
        <h5 className="font-bold text-white">{title}</h5>
      </div>
    </article>
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
