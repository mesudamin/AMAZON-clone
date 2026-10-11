import AppRouter from './Router'
import DataProvider from './components/DataProvider/DataProvider'
import { reducer, initialState } from './utility/reducer'
import './App.css'

/**
 * Root Application Component
 * Provides global state (Cart, User, Orders) and loads application routing
 */
function App() {
  return (
    <DataProvider reducer={reducer} initialState={initialState}>
      <div className="app">
        <AppRouter />
      </div>
    </DataProvider>
  )
}

export default App
