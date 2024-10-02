'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  // useEffect(() => {
  //   console.error(error)

  //   // Recarga la página 1 segundo después del error
  //   const timeout = setTimeout(() => {
  //     window.location.reload()
  //   }, 1000)

  //   return () => clearTimeout(timeout)
  // }, [error])

  return (
    <div className="flex items-center justify-center h-96">
      <div className="wrapper">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  )
}
