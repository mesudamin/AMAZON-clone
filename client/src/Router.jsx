import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

// Layout & Core Pages
import Layout from './components/Layout/Layout'
import Landing from './pages/Landing/Landing'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'
import Payment from './pages/Payment/Payment'
import Auth from './pages/Auth/Auth'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Results from './pages/Results/Results'
import NotFound from './pages/NotFound/NotFound'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

/**
 * Initialize Stripe with public key from environment variables
 */
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY ||
    'pk_test_51UQ72rGlb9hC5MtXO6u2hKzEdiWVD5Mqr6OXApnt5ebQu6wWqa84jwR1fA8GKAoxlaxn0eAHkBglwFDKhpSMCV3000VoMom2Pc'
)

/**
 * Utility to smoothly reset scroll position on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * Main Application Routing Configuration
 */
function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Store Layout Routes (with universal Header and Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="orders"
            element={
              <ProtectedRoute
                msg="You must sign in to view your orders."
                redirect="/orders"
              >
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="category/:categoryName" element={<Results />} />
          <Route path="results" element={<Results />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dedicated Amazon Checkout Flow */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg="You must sign in to proceed to checkout and payment."
              redirect="/payment"
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        {/* Dedicated Amazon Authentication Flow */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
