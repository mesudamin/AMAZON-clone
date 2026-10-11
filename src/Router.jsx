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
          <Route path="orders" element={<Orders />} />
          <Route path="category/:categoryName" element={<Results />} />
          <Route path="results" element={<Results />} />
          <Route path="products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Dedicated Amazon Checkout Flow */}
        <Route path="/payment" element={<Payment />} />

        {/* Dedicated Amazon Authentication Flow */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
