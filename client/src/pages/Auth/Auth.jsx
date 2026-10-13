import { useState } from 'react'
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth'
import { auth } from '../../utility/firebase'
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    const trimmedName = name.trim()

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please provide an email and password.')
      return
    }

    if (isSignUp && !trimmedName) {
      setError('Please enter your name.')
      return
    }

    if (!auth?.app?.options?.apiKey) {
      setError('Firebase credentials are not configured yet. Please paste your Firebase project credentials into the .env file.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      if (isSignUp) {
        // Firebase Sign Up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPassword
        )

        if (trimmedName) {
          try {
            await updateProfile(userCredential.user, {
              displayName: trimmedName
            })
          } catch (profileErr) {
            console.warn('Could not update profile displayName:', profileErr)
          }
        }

        const authenticatedUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: trimmedName || userCredential.user.displayName || trimmedEmail.split('@')[0],
          name: trimmedName || userCredential.user.displayName || trimmedEmail.split('@')[0]
        }

        dispatch({
          type: Type.SET_USER,
          user: authenticatedUser
        })

        setIsLoading(false)
        navigate(redirectPath, { replace: true })
      } else {
        // Firebase Sign In
        const userCredential = await signInWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPassword
        )

        const displayName =
          userCredential.user.displayName ||
          userCredential.user.email?.split('@')[0] ||
          'Customer'

        const authenticatedUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName,
          name: displayName
        }

        dispatch({
          type: Type.SET_USER,
          user: authenticatedUser
        })

        setIsLoading(false)
        navigate(redirectPath, { replace: true })
      }
    } catch (err) {
      setIsLoading(false)
      console.error('Firebase Auth error:', err)
      const errorCode = err.code || ''

      if (
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/invalid-credential'
      ) {
        setError('Invalid email or password. Please verify your credentials and try again.')
      } else if (errorCode === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please sign in or use a different email.')
      } else if (errorCode === 'auth/weak-password') {
        setError('Password should be at least 6 characters.')
      } else if (errorCode === 'auth/invalid-email') {
        setError('The email address entered is not valid.')
      } else if (errorCode === 'auth/too-many-requests') {
        setError('Access to this account has been temporarily disabled due to many failed login attempts. Try again later.')
      } else if (errorCode === 'auth/network-request-failed') {
        setError('Network error. Please check your internet connection.')
      } else if (errorCode === 'auth/api-key-not-valid' || errorCode === 'auth/invalid-api-key') {
        setError('Firebase API Key is missing or invalid. Please configure your Firebase credentials in .env.')
      } else {
        const cleanMsg = err.message
          ? err.message.replace(/^Firebase:\s*(Error\s*)?(\(auth\/[^)]+\)\.?)?/i, '').trim() || err.message
          : 'Authentication failed. Please try again.'
        setError(cleanMsg)
      }
    }
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
