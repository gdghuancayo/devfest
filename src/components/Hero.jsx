import { Articles } from './Articles'

export const Hero = () => {
  return (
    <div id="main-container" className="px-3 pt-4">
      <div
        id="content"
        className="relative flex flex-col items-center justify-center w-full max-w-6xl pt-24 mx-auto mt-20 overflow-hidden shadow-xl rounded-3xl bg-gray-950 shadow-black/30"
      >
        <div className="absolute top-[17rem] size-[40rem] rounded-full bg-indigo-800 blur-3xl md:top-[20rem]" />
        <div className="container3d z-10 inline-block rounded-lg border border-indigo-400/20 bg-indigo-800/20 px-3 py-2.5 text-lg font-semibold leading-4 tracking-tight">
          <span className="text-transparent bg-gradient-to-b from-indigo-200 to-indigo-400 bg-clip-text">
            Google Developers
          </span>
        </div>
        <div className="z-10 flex flex-col items-center container3d">
          <h2 className="z-10 flex px-2 mt-6 text-5xl font-bold tracking-tighter text-center text-transparent textoSobresaliente bg-gradient-to-b from-white to-indigo-100 bg-clip-text md:text-8xl">
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
        </div>
        <div className="z-10 flex mt-1 text-white truncate container3dneon text-md opacity-80 md:-mt-2 md:text-lg">
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
            target="_blank"
            className="z-40 cursor-pointer"
          >
            UC / Huancayo
          </a>
        </div>
        {/* Esfera */}
        <img
          src="https://firebasestorage.googleapis.com/v0/b/devfesthyo.appspot.com/o/mundofinal.png?alt=media&token=17b4473e-b065-49b6-86ca-bf39c395d10b"
          className="container3d absolute w-full object-cover md:pt-48 lg:w-[80%]"
          style={{ filter: 'contrast(1.5)' }}
        />
        <div className="z-20 mt-10 h-[36rem] w-full overflow-hidden md:-mt-36">
          <div className="absolute bottom-0 w-full h-3/5 bg-gradient-to-b from-transparent via-gray-950/95 to-gray-950" />
          <div className="max-w-lg m-auto inset-x-6 bottom-12 md:absolute md:top-2/3 md:max-w-5xl">
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 rounded-4xl border border-white/[15%] bg-white/[3%] px-6 py-6 shadow-xl backdrop-blur md:-mt-6 md:grid-cols-5 md:p-8 lg:grid-cols-6">
              <div className="flex flex-col gap-2 lg:col-span-2 lg:mt-6">
                <h3 className="text-2xl text-transparent bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text lg:text-3xl">
                  Regístrate ahora
                </h3>
                <p className="text-md leading-6 text-indigo-200/80 lg:mr-14 lg:text-[1.05rem]">
                  Ingresa o crea tu cuenta de Google.{' '}
                  <span className="hidden lg:inline">
                    Cupos muy limitados, no pierdas tu entrada.
                  </span>
                </p>
              </div>
              {/* Artículos de tickets */}
              <Articles />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
