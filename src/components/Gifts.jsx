import { cx } from '@/lib/utils'
import Image from 'next/image'
import BreakImage from '@/images/regalos/break.jpg'
import StikerImage from '@/images/regalos/stiker.png'
import EventoImage from '@/images/regalos/evento.jpeg'
import CertificadoImage from '@/images/regalos/certificado.jpg'

function InstaxImage({ className, src, width, height, alt, caption }) {
  return (
    <figure
      className={cx(
        'bg-indigo h-fit overflow-hidden rounded-lg bg-gray-900 shadow-xl shadow-indigo-500/5 ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:shadow-indigo-900/20',
        className,
      )}
    >
      <div className="p-2 bg-gray-900">
        <div className="relative overflow-hidden rounded">
          <div className="absolute inset-0 shadow-[inset_0px_0px_3px_0px_rgb(0,0,0,1)]"></div>
          <Image src={src} alt={alt} width={width} height={height} />
        </div>
      </div>
      <div
        className={cx('px-2 pb-2 pt-2 font-handwriting text-2xl text-gray-300')}
      >
        <figcaption className="text-center">{caption}</figcaption>
      </div>
    </figure>
  )
}

export function Gifts() {
  return (
    <section
      aria-labelledby="teamwork-title"
      className="max-w-3xl mx-auto animate-slide-up-fade"
      style={{
        animationDuration: '600ms',
        animationDelay: '200ms',
        animationFillMode: 'backwards',
      }}
      id="gifts"
    >
      <h2 className="max-w-2xl mx-auto text-4xl font-medium tracking-tighter text-center text-white font-display sm:text-5xl">
        Regalos
      </h2>
      <div className="mt-20">
        <div className="flex flex-col items-center justify-center w-full gap-4 mt-20 md:flex-rowflex">
          <InstaxImage
            className="-mt-10 w-[20rem] -rotate-3"
            src={CertificadoImage}
            alt="Certificado"
            width={640}
            height={965}
            caption="Certificado"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-8 md:flex-row">
          <InstaxImage
            className="w-[20rem] -rotate-6 sm:-ml-10"
            src={BreakImage}
            alt="Polo del evento"
            width={640}
            height={427}
            caption="x 3 Refrigerios"
          />
          <InstaxImage
            className="-mr-10 mt-8 w-[16rem] rotate-1 md:mt-0"
            src={StikerImage}
            alt="Swags"
            width={640}
            height={960}
            caption="Stickers y más"
          />
        </div>
      </div>
    </section>
  )
}
