import { createContext, useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'

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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log(user)
        
        setNewLoginState(true)
        setNewLoginInfo({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
        setAuthLoading(false)

        // const docRef = doc(db, 'users', user.uid)

        // onSnapshot(
        //   docRef,
        //   (querySnapshot) => {
        //     let userInfoCopy = querySnapshot.data()
        //     setNewUserInfo(userInfoCopy)
        //     setNewLoginInfo({
        //       uid: user.uid,
        //       name: user.displayName,
        //       email: user.email,
        //       photo: user.photoURL,
        //     })
        //     setAuthLoading(false)
        //   },
        //   (error) => {
        //     console.log(error)
        //   },
        // )
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
