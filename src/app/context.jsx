import { createContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const AppContext = createContext()

function AppProvider(props) {
  const [loginState, setNewLoginState] = useState(false)
  const [loginInfo, setNewLoginInfo] = useState({})
  const [userInfo, setNewUserInfo] = useState({})
  const [authLoading, setAuthLoading] = useState(true)
  const [errorState, setNewErrorState] = useState(false)
  // auth re
  const auth = getAuth()
  const db = getFirestore()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const execute = async () => {
          const docRef = doc(db, 'register', user.uid)
          const docSnap = await getDoc(docRef)
          
          if (docSnap.exists()) {
            setNewLoginInfo({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              data: docSnap.data(),
            })
          } else {
            setNewLoginInfo({
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              data: null,
            })
          }
          setNewLoginState(true)
          setAuthLoading(false)
        }
        execute()
      } else {
        setNewLoginState(false)
        setAuthLoading(false)
      }
    })
    window.addEventListener('online', async () => {
      setNewErrorState(false)
    })
    window.addEventListener('offline', async () => {
      setNewErrorState(true)
      alert('Conexión de internet perdida')
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        authLoading,
        setAuthLoading,
        loginState,
        setNewLoginState,
        loginInfo,
        setNewLoginInfo,
        errorState,
        setNewErrorState,
        userInfo,
        setNewUserInfo,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
