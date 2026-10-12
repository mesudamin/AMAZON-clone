import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useData } from '../../utility/DataContext'

/**
 * ProtectedRoute Component
 * Guards routes that require user authentication (Checkout, Payment, Orders).
 * Redirects unauthenticated users to /auth with return redirection and custom notification.
 */
function ProtectedRoute({ children, msg, redirect }) {
  const [{ user }] = useData()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/auth', {
        state: {
          msg: msg || 'Please sign in or create an account to continue.',
          redirect: redirect || `${location.pathname}${location.search}`
        },
        replace: true
      })
    }
  }, [user, navigate, msg, redirect, location])

  if (!user) {
    return null
  }

  return children
}

export default ProtectedRoute
