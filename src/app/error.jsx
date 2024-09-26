'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)

    // Recarga la página 1 segundo después del error
    const timeout = setTimeout(() => {
      window.location.reload()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [error])

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="mt-10 text-3xl font-bold text-white md:text-5xl lg:text-6xl xl:text-7xl">
        Ups ocurrió un error
      </div>

      <div className="mt-8 text-sm font-medium text-gray-400 md:text-xl lg:text-2xl">
        Por favor si no se soluciona el problema contacte con soporte
      </div>

      <button
        className="inline-flex items-center px-6 py-3 mt-6 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => reset()}
      >
        Recargar
      </button>
    </div>
  )
}
// () => {
//           window.location.reload();
//         }
