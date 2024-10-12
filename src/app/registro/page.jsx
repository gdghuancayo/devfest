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
  const [googleAuth, setGoogleAuth] = useState(false)

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
        setGoogleAuth(true)
      }
    }
  }, [authLoading, loginState])

  const register = async () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()
    auth.languageCode = 'es'
    await signInWithPopup(auth, provider)
    setResolver(true)
  }
  return (
    <Suspense fallback={<div></div>}>
      {!resolver ? (
        <div className="flex items-center justify-center h-96">
         {googleAuth ? (
            <div className='w-full'>
              <div className="m-10 text-2xl font-bold text-center text-gray-100">
                Estas a un paso de inscribirte : )
              </div>
              <div
                onClick={() => register()}
                className="px-4 py-2 mx-auto font-bold text-gray-900 rounded w-fit white bg-gray-50 hover:bg-gray-100"
              >
                <svg viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"
                className='inline-block w-6 h-6 mr-2'
                >
                  <path d="M790.467 407.484C790.467 374.708 787.808 350.791 782.052 325.988H407.786V473.921H627.472C623.044 510.684 599.127 566.049 545.976 603.252L545.231 608.205L663.566 699.878L671.765 700.696C747.06 631.157 790.467 528.843 790.467 407.484Z" fill="#4285F4"/>
                  <path d="M407.786 797.252C515.414 797.252 605.768 761.817 671.765 700.696L545.976 603.252C512.315 626.727 467.136 643.114 407.786 643.114C302.373 643.114 212.904 573.579 181.011 477.466L176.336 477.863L53.2885 573.09L51.6794 577.563C117.231 707.78 251.878 797.252 407.786 797.252Z" fill="#34A853"/>
                  <path d="M181.011 477.466C172.595 452.663 167.725 426.086 167.725 398.626C167.725 371.163 172.595 344.589 180.568 319.786L180.345 314.504L55.7557 217.747L51.6794 219.685C24.6626 273.722 9.16031 334.403 9.16031 398.626C9.16031 462.849 24.6626 523.527 51.6794 577.563L181.011 477.466Z" fill="#FBBC05"/>
                  <path d="M407.786 154.134C482.638 154.134 533.13 186.467 561.921 213.487L674.421 103.643C605.328 39.4198 515.414 0 407.786 0C251.878 0 117.231 89.4687 51.6794 219.685L180.568 319.786C212.904 223.673 302.372 154.134 407.786 154.134Z" fill="#EB4335"/>
                </svg>{' '}	
                Iniciar con Google
              </div>
            </div>
          ) : (
             <div className="wrapper">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>
      ) : (
        <Form />
      )}
    </Suspense>
  )
}
