import { Outlet } from 'react-router-dom'
import Header from '../headercomponents/Header/Header'
import Footer from '../Footer/Footer'

/**
 * Main Store Layout Component
 * Wraps pages with universal Amazon Header and Footer
 */
function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
