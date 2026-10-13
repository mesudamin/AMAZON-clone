import { useReducer } from 'react'
import { DataContext } from '../../utility/DataContext'

/**
 * Global state provider wrapping context with useReducer
 */
function DataProvider({ children, reducer, initialState }) {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
