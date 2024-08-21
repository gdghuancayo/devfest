'use client'
import { cx } from '@/lib/utils'
import Image from 'next/image'

function InstaxImage({ className, src, width, height, alt, caption }) {
  return (
    <figure
      className={cx(
        'h-fit overflow-hidden rounded-lg bg-indigo shadow-xl shadow-black/10 ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-black/20 dark:bg-gray-900 dark:shadow-indigo-500/5 dark:ring-white/20 dark:hover:shadow-indigo-900/20',
        className,
      )}
    >
      <div className="p-2 bg-gray-50 dark:bg-gray-900">
        <div className="relative overflow-hidden rounded">
          <div className="absolute inset-0 shadow-[inset_0px_0px_3px_0px_rgb(0,0,0,1)]"></div>
          <Image src={src} alt={alt} width={width} height={height} />
        </div>
      </div>
      <div
        className={cx(
          'font-handwriting px-2 pb-2 pt-2 text-xl text-gray-700 dark:text-gray-300',
        )}
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
      className="max-w-3xl mx-auto mt-5 animate-slide-up-fade"
      style={{
        animationDuration: '600ms',
        animationDelay: '200ms',
        animationFillMode: 'backwards',
      }}
    >
      <h2 className="max-w-2xl mx-auto text-4xl font-medium tracking-tighter text-center text-white font-display sm:text-5xl">
          Regalos
        </h2>
      <div className="mt-20">
        <div className="flex flex-col items-center justify-center w-full md:flex-row">
          <InstaxImage
            className="w-[20rem] -rotate-6 sm:-ml-10"
            src="/images/polo.png"
            alt="Polo del evento"
            width={640}
            height={427}
            caption="Polo del evento"
          />
          {/* <InstaxImage
            className="w-[15rem] rotate-3"
            src="/images/cuadernito.png"
            alt="Cuadernito + lapicero"
            width={640}
            height={853}
            caption="Cuadernito + lapicero"
          /> */}
          <InstaxImage
            className="-mr-10 w-[16rem] rotate-1"
            src="/images/stiker.png"
            alt="Stikers"
            width={640}
            height={960}
            caption="Stikers"
          />
        </div>
        <div className="justify-between hidden w-full gap-4 mt-20 md:flex">
          <InstaxImage
            className="-ml-16 w-[18rem] rotate-1"
            src="/images/tomatodo.png"
            alt="Tomatodo"
            width={640}
            height={360}
            caption="Botella"
          />
          <InstaxImage
            className="-mt-10 w-[20rem] -rotate-3"
            src="/images/fotocheck.png"
            alt="Fotocheck"
            width={640}
            height={965}
            caption="Fotocheck"
          />
          <InstaxImage
            className="-mr-20 -mt-2 w-[17rem] rotate-[8deg]"
            src="/images/bolsa.png"
            alt="Insignia"
            width={1920}
            height={1281}
            caption="Insignia"
          />
        </div>
      </div>
    </section>
  )
}
