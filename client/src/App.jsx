import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utility/firebase'
import { useData } from './utility/DataContext'
import { Type } from './utility/action.type'
import AppRouter from './Router'
import DataProvider from './components/DataProvider/DataProvider'
import { reducer, initialState } from './utility/reducer'
import './App.css'

/**
 * AppContent Component
 * Subscribes to Firebase Authentication state changes and synchronizes global User state
 */
function AppContent() {
  const [, dispatch] = useData()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            name: authUser.displayName || authUser.email?.split('@')[0]
          }
        })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null
        })
      }
    })

    return () => unsubscribe()
  }, [dispatch])

  return (
    <div className="app">
      <AppRouter />
    </div>
  )
}

/**
 * Root Application Component
 * Provides global state (Cart, User, Orders) and loads application routing
 */
function App() {
  return (
    <DataProvider reducer={reducer} initialState={initialState}>
      <AppContent />
    </DataProvider>
  )
}

export default App
