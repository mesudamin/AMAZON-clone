import { useState } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useData } from '../../utility/DataContext'
import { Type } from '../../utility/action.type'
import amazonLogo from '../../assets/icon/logo1.png'
import './Auth.css'

/**
 * Authentic Amazon Authentication (Sign In & Sign Up) Component
 */
function Auth() {
  const [, dispatch] = useData()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const navState = location.state || {}
  const noticeMessage = navState?.msg || searchParams.get('msg') || ''
  const redirectPath = navState?.redirect || searchParams.get('redirect') || '/'

  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'register')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Please provide an email and password.')
      return
    }

    if (isSignUp && !name.trim()) {
      setError('Please enter your name.')
      return
    }

    setIsLoading(true)
    setError('')

    setTimeout(() => {
      const displayName = name.trim() || email.split('@')[0]
      const newUser = {
        name: displayName,
        email: email.trim()
      }

      dispatch({
        type: Type.SET_USER,
        user: newUser
      })

      setIsLoading(false)
      navigate(redirectPath, { replace: true })
    }, 600)
  }

  return (
    <div className="auth">
      {/* Brand Logo Header */}
      <div className="auth__logoContainer">
        <Link to="/">
          <img src={amazonLogo} alt="Amazon" className="auth__logo" />
        </Link>
      </div>

      {/* Main Authentication Box */}
      <div className="auth__box">
        <h1 className="auth__title">{isSignUp ? 'Create account' : 'Sign in'}</h1>

        {noticeMessage && (
          <div className="auth__notice" role="status">
            <span className="auth__noticeIcon">⚠️</span>
            <div className="auth__noticeText">{noticeMessage}</div>
          </div>
        )}

        {error && (
          <div className="auth__error" role="alert">
            <span className="auth__errorIcon">!</span>
            <div className="auth__errorText">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth__form">
          {isSignUp && (
            <div className="auth__formGroup">
              <label htmlFor="authName">Your name</label>
              <input
                id="authName"
                type="text"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}

          <div className="auth__formGroup">
            <label htmlFor="authEmail">Email or mobile phone number</label>
            <input
              id="authEmail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth__formGroup">
            <div className="auth__labelRow">
              <label htmlFor="authPassword">Password</label>
              {!isSignUp && (
                <a href="#forgot" className="auth__forgotLink">
                  Forgot your password?
                </a>
              )}
            </div>
            <input
              id="authPassword"
              type="password"
              placeholder={isSignUp ? 'At least 6 characters' : ''}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isSignUp && (
              <span className="auth__passwordHint">
                Passwords must be at least 6 characters.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="auth__submitBtn"
            disabled={isLoading}
          >
            {isLoading
              ? 'Please wait...'
              : isSignUp
              ? 'Create your Amazon account'
              : 'Continue'}
          </button>
        </form>

        <p className="auth__legal">
          By continuing, you agree to Amazon's{' '}
          <a href="#conditions">Conditions of Use</a> and{' '}
          <a href="#privacy">Privacy Notice</a>.
        </p>

        <div className="auth__divider">
          <span>{isSignUp ? 'Already have an account?' : 'New to Amazon?'}</span>
        </div>

        <button
          type="button"
          className="auth__switchBtn"
          onClick={() => {
            setIsSignUp(!isSignUp)
            setError('')
          }}
        >
          {isSignUp
            ? 'Sign in to your account'
            : 'Create your Amazon account'}
        </button>
      </div>

      {/* Footer */}
      <footer className="auth__footer">
        <div className="auth__footerLinks">
          <a href="#conditions">Conditions of Use</a>
          <a href="#privacy">Privacy Notice</a>
          <a href="#help">Help</a>
        </div>
        <p className="auth__copyright">
          &copy; 1996-2026, Amazon.com, Inc. or its affiliates
        </p>
      </footer>
    </div>
  )
}

export default Auth
