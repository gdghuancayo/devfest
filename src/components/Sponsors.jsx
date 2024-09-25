import Image from 'next/image'

import { Container } from '@/components/Container'
import OnzasImage from '@/images/sponsors/onzas.png'
import GestumImage from '@/images/sponsors/gestum.png'
import GOREImage from '@/images/sponsors/gore.png'
import KiruImage from '@/images/sponsors/kiru.jpg'
import LaBaseImage from '@/images/sponsors/base.png'
import LalosImage from '@/images/sponsors/lalos.png'
import LatinFlowImage from '@/images/sponsors/latin.png'
import MusaImage from '@/images/sponsors/musa.png'
import OgregonImage from '@/images/sponsors/obregon.png'
import SettingImage from '@/images/sponsors/setting.png'
import TurismoRarazImage from '@/images/sponsors/raraz.png'
import FabLabImage from '@/images/sponsors/fablab.png'
import AncosurImage from '@/images/sponsors/ancosur.png'
import DoctocImage from '@/images/sponsors/doctoc.png'
import WakaiImage from '@/images/sponsors/wakai.jpg'
import GoogleImage from '@/images/aliados/google.png'
import Uc from '@/images/aliados/uc.png'
import Ic from '@/images/aliados/ic.png'
import Cuf from '@/images/aliados/cuf.png'
import Wichay from '@/images/aliados/wichay.webp'

const sponsors = [
  {
    name: 'GORE',
    logo: GOREImage,
  },
  {
    name: 'Lalos',
    logo: LalosImage,
  },
  {
    name: 'Latin Flow',
    logo: LatinFlowImage,
  },
  {
    name: 'Setting',
    logo: SettingImage,
  },
  {
    name: 'Turismo Raraz',
    logo: TurismoRarazImage,
  },
  {
    name: 'Fab Lab',
    logo: FabLabImage,
  },
  {
    name: 'Musa',
    logo: MusaImage,
  },
  {
    name: 'Ogregon',
    logo: OgregonImage,
  },
  {
    name: 'Ancosur',
    logo: AncosurImage,
  },
  {
    name: '4 Onzas',
    logo: OnzasImage,
  },
  {
    name: 'Gestum',
    logo: GestumImage,
  },
  {
    name: 'Kiru',
    logo: KiruImage,
  },
  {
    name: 'La Base',
    logo: LaBaseImage,
  },
  {
    name: 'Doctoc',
    logo: DoctocImage,
  },
  {
    name: 'Wakai',
    logo: WakaiImage,
  }
]
const aliados = [
  {
    name: 'Continental University of Florida',
    logo: Cuf,
  },
  {
    name: 'Instituto Continental',
    logo: Ic,
  },
  {
    name: 'Wichay',
    logo: Wichay,
  },
]
export function Sponsors() {
  return (
    <section id="sponsors" aria-label="Sponsors" className="py-20 md:py-32">
      <Container>
        <h2 className="max-w-2xl mx-auto text-4xl font-medium tracking-tighter text-center text-white font-display sm:text-5xl">
          Patrocinadores
        </h2>
        <div className="mx-auto mt-10 w-fit">
          <Image
            className="p-4 bg-white rounded-lg"
            src={Uc}
            alt="Universidad Continental"
            quality={75}
            width={300}
            height={100}
          />
        </div>
        <div className="grid grid-cols-1 mx-auto mt-14 max-w-max place-content-center gap-x-32 gap-y-12 sm:grid-cols-3 md:gap-x-16">
          {aliados.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <Image
                className="object-scale-down px-2 bg-white rounded-lg h-28"
                src={sponsor.logo}
                alt={sponsor.name}
                quality={75}
                width={200}
                height={100}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 mx-auto mt-14 max-w-max place-content-center gap-y-12 sm:grid-cols-3 gap-x-16">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center"
            >
              <Image
                className="object-scale-down h-20 px-2 bg-white rounded-lg"
                src={sponsor.logo}
                alt={sponsor.name}
                quality={75}
                width={150}
                height={100}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
