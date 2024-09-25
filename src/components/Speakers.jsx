'use client'

import { useEffect, useId, useState } from 'react'
import Image from 'next/image'
import { TabGroup, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'

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

const speakers = [
  {
    name: 'Leslie Lugo 🇵🇪',
    role: 'Google Analytical Lead',
    image: LeslieImage,
  },
  {
    name: 'Damian Sire 🇺🇾',
    role: 'Google Expert',
    image: DamianImage,
  },
  {
    name: 'Aarón Guerrero 🇲🇽',
    role: 'Google Expert',
    image: AaronImage,
  },
  {
    name: 'Jorge Cano 🇦🇷',
    role: 'Google Expert',
    image: JorgeImage,
  },
  {
    name: 'Nicolas Molina 🇧🇴',
    role: 'Platzi & Google Expert',
    image: NicolasImage,
  },
  {
    name: 'Cesar Cervantes 🇵🇪',
    role: 'Platzi',
    image: CesarImage,
  },
  {
    name: 'Erik Sibille 🇵🇪',
    role: 'Musa',
    image: ErikImage,
  },
  {
    name: 'Felícitas Pila 🇵🇪',
    role: 'Nasa Space Apps',
    image: FelicitasImage,
  },
  {
    name: 'José Eduardo 🇵🇪',
    role: 'GitHub Campus Expert',
    image: EduardoImage,
  },
  {
    name: 'Gonzalo Caira 🇵🇪',
    role: 'Full Time Force',
    image: GonzaloImage,
  },
  {
    name: 'Jürgen Anders 🇵🇪',
    role: 'Datapath',
    image: AndersImage,
  },
  {
    name: 'Lucero Beatriz 🇵🇪',
    role: 'Gobierno Regional de Junín',
    image: LuceroImage,
  },
]

function ImageClipPaths({ id, ...props }) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Speakers() {
  let id = useId()
  let [tabOrientation, setTabOrientation] = useState('horizontal')

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  return (
    <div className="py-20 mt-5 sm:py-32" id="speakers">
      <ImageClipPaths id={id} />
      <Container>
        <div className="mx-auto lg:mx-0">
          <h2
            id="speakers-title"
            className="text-4xl font-medium tracking-tighter text-center text-white font-display sm:text-5xl"
          >
            Sobre nuestros{' '}
            <span className="text-transparent bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text">
              Speakers
            </span>
          </h2>
        </div>
        <TabGroup
          className="grid items-start grid-cols-1 mt-14 gap-x-8 gap-y-8 sm:mt-16 sm:gap-y-16 lg:mt-24"
          vertical={tabOrientation === 'vertical'}
        >
          <TabPanels className="mx-auto">
            <TabPanel
              className="grid grid-cols-1 gap-x-8 gap-y-10 ui-not-focus-visible:outline-none sm:grid-cols-2 sm:gap-y-16 md:grid-cols-4"
              unmount={false}
            >
              {speakers.map((speaker, speakerIndex) => (
                <div key={speakerIndex}>
                  <div className="group relative h-[17.5rem] transform overflow-hidden rounded-4xl sm:w-auto">
                    <div
                      className={clsx(
                        'absolute bottom-6 left-0 right-4 top-0 rounded-4xl border transition duration-300 group-hover:scale-95 xl:right-6',
                        [
                          'border-indigo-300',
                          'border-indigo-300',
                          'border-indigo-300',
                        ][speakerIndex % 3],
                      )}
                    />
                    <div
                      className="absolute inset-0 bg-indigo-50"
                      style={{ clipPath: `url(#${id}-${speakerIndex % 3})` }}
                    >
                      <Image
                        className="absolute inset-0 object-cover w-full h-full transition duration-300 group-hover:scale-110"
                        src={speaker.image}
                        alt=""
                        sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                        quality={75}
                      />
                    </div>
                  </div>
                  <h3 className="mt-8 text-xl font-bold tracking-tight text-white font-display">
                    {speaker.name}
                  </h3>
                  <p className="mt-1 text-base tracking-tight text-slate-500">
                    {speaker.role}
                  </p>
                </div>
              ))}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Container>
    </div>
  )
}
