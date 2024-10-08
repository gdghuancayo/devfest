"use client"

import Form from '@/components/Form'
import { Suspense } from 'react'
import { AppContext } from '@/app/context'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default function Registro() {
  const router = useRouter()
  const { authLoading, loginState, loginInfo } = useContext(AppContext)
  const [resolver, setResolver] = useState(false)

  // Auth redirect
  useEffect(() => {
    if (!authLoading) {
      if (loginState) {
        if (loginInfo.data !== null) {
          router.push('/panel')
        } else {
          setResolver(true)
        }
      } else {
        const register = async (type) => {
          const provider = new GoogleAuthProvider()
          const auth = getAuth()
          auth.languageCode = 'es'
          await signInWithPopup(auth, provider)
          setResolver(true)
        }
        register('online')
      }
    }
  }, [authLoading, loginState])

  return (
    <Suspense fallback={<div></div>}>
      {!resolver ? (
        <div className="flex items-center justify-center h-96">
          <div className="wrapper">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      ) : (
        <Form />
      )}
    </Suspense>
  )
}
