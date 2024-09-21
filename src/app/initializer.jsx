'use client'

import { AppProvider } from './context'
import { initializeApp } from 'firebase/app'

export default function Initializer({ children }) {
  // Firebase init
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: `${process.env.NEXT_PUBLIC_proyect}.firebaseapp.com`,
    databaseURL: `https://${process.env.NEXT_PUBLIC_proyect}-default-rtdb.firebaseio.com`,
    projectId: process.env.NEXT_PUBLIC_proyect,
    storageBucket: `${process.env.NEXT_PUBLIC_proyect}.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId,
  }
  const app = initializeApp(firebaseConfig)
  
  return <AppProvider>{children}</AppProvider>
}
