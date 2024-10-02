import Image from 'next/image'
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
import EdwardImage from '@/images/ponentes/codi.jpeg'
import SamuelImage from '@/images/ponentes/samuel.png'
import YancelImage from '@/images/ponentes/yancel.jpg'
import AfterImage from '@/images/experiencies/after.png'
import ConcursoImage from '@/images/experiencies/concurso.jpg'
import GamerImage from '@/images/experiencies/gamer.jpg'
import IatonImage from '@/images/experiencies/iaton.png'
import MarketingImage from '@/images/experiencies/marketing.png'

function generarStartAt(hora) {
  const [horas, minutos] = hora.split(':').map(Number)
  const fecha = new Date(2024, 9, 13)
  fecha.setHours(horas, minutos, 0, 0)
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
      description: 'Doctoc',
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
  },
]

const LIST_OF_EXPERIENCES = [
  {
    speaker: {
      name: 'Feria de Tecnología',
      description: 'Atracciones y sponsors',
      imgUrl: GamerImage,
    },
    startAt: generarStartAt('8:00'),
    title: 'VS Gaming 🎮, VR y más',
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Concurso',
      description: 'EAP. Industrial UC',
      imgUrl: MarketingImage,
    },
    startAt: generarStartAt('9:30'),
    title: 'Soluciones con Google ADS 🏭',
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'FestCode',
      description: 'Concurso de programación',
      imgUrl: ConcursoImage,
    },
    startAt: generarStartAt('10:30'),
    title: 'Final en vivo 🏆',
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Jorge cano',
      description: 'Google Expert',
      imgUrl: JorgeImage,
    },
    startAt: generarStartAt('12:00'),
    title: 'Primeros pasos en programación 🚶‍♂️',
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'Wichay',
      description: 'UC',
      imgUrl: IatonImage,
    },
    startAt: generarStartAt('12:30'),
    title: 'Premiación IdIAtón  🏅',
    durationInMinutes: 30,
  },
  {
    speaker: {
      name: 'After Party',
      description: 'Cierre del evento',
      imgUrl: AfterImage,
    },
    startAt: generarStartAt('20:30'),
    title: 'Música, comida y más 🎉',
  },
]

const getTime = ({ timestamp, durationInMinutes }) => {
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

  return {
    startAt,
    endAt,
  }
}

const AgendaItem = ({ startAt, durationInMinutes, title, speaker }) => {
  const time = getTime({ timestamp: startAt, durationInMinutes })

  return (
    <article className="mb-3 relative flex w-full flex-col gap-5 overflow-hidden rounded-[20px] border border-white/[5%] bg-white/[3%] p-6 shadow before:absolute before:inset-0 before:-z-10 before:h-full before:w-full sm:flex-row sm:items-stretch">
      <p className="flex items-center justify-center w-auto text-5xl font-bold shrink-0 text-white/60 sm:w-32 sm:text-right">
        {time.startAt}
      </p>
      <div className="flex-1">
        <header className="flex flex-row items-center gap-x-2">
          <h4 className="font-medium leading-tight text-transparent truncate bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text">
            {speaker.name}
          </h4>
          <span className="truncate text-white/70">
            - {speaker.description}
          </span>
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
            quality={75}
          />
        </div>
      </div>
    </article>
  )
}

export const Schedule = () => {
  return (
    <section id="agenda" className="mx-auto max-w-[802px] px-4 pb-40 pt-10">
      <h2 className="max-w-2xl mx-auto text-4xl font-medium tracking-tighter text-center text-white font-display sm:text-5xl">
        Agenda
      </h2>

      <div className="flex flex-col gap-8 mt-12">
        {/* Conferencia abierta por defecto */}
        <details className="group" open>
          <summary className="p-4 text-2xl font-medium text-white transition-all border-2 border-indigo-900 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-900/60 to-black/10 group-hover:from-indigo-900/80 group-hover:to-black/10">
            Conferencia
          </summary>
          <div id="conference" className="p-4">
            {LIST_OF_TALKS.map((item) => (
              <AgendaItem key={item.speaker.name} {...item} />
            ))}
          </div>
        </details>

        <details className="group">
          <summary className="p-4 text-2xl font-bold text-white transition-all border-2 border-indigo-900 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-900/60 to-black/60 group-hover:from-indigo-900/80 group-hover:to-black/80">
            Talleres
          </summary>
          <div id="talleres" className="p-4">
            {LIST_OF_WORKSHOPS.map((item) => (
              <AgendaItem key={item.speaker.name} {...item} />
            ))}
          </div>
        </details>

        <details className="group">
          <summary className="p-4 text-2xl font-bold text-white transition-all border-2 border-indigo-900 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-900/60 to-black/60 group-hover:from-indigo-900/80 group-hover:to-black/80">
            Experiencias
          </summary>
          <div id="experiencias" className="p-4">
            {LIST_OF_EXPERIENCES.map((item) => (
              <AgendaItem key={item.speaker.name} {...item} />
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}

