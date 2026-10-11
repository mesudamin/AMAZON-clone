import { Link } from 'react-router-dom'
import { useData } from '../../../utility/DataContext'
import './SideMenu.css'

/**
 * Side Menu Drawer ("All" Hamburger Menu)
 * Comprehensive slide-in navigation drawer with departments, features, and settings
 */
function SideMenu({ isOpen, onClose }) {
  const [{ user }] = useData()

  if (!isOpen) return null

  return (
    <div className="header__sideOverlay" onClick={onClose}>
      <div
        className="header__sideDrawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Amazon All Navigation"
      >
        {/* Drawer Header */}
        <div className="header__sideHeader">
          <div className="header__sideUserAvatar">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="#ffffff">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <span className="header__sideTitle">
            {user ? `Hello, ${user.name}` : 'Hello, sign in'}
          </span>
          <button
            type="button"
            className="header__sideCloseInside"
            onClick={onClose}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Drawer Content */}
        <div className="header__sideContent">
          {/* Section 1: Digital Content & Devices */}
          <div className="header__sideSection">
            <h3 className="header__sideSectionTitle">Digital Content &amp; Devices</h3>
            <Link to="/results?search=music" className="header__sideItem" onClick={onClose}>
              <span>Amazon Music</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
            <Link to="/results?search=kindle" className="header__sideItem" onClick={onClose}>
              <span>Kindle E-readers &amp; Books</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
            <Link to="/results?search=apps" className="header__sideItem" onClick={onClose}>
              <span>Amazon Appstore</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
          </div>

          <div className="header__sideDivider"></div>

          {/* Section 2: Shop by Department */}
          <div className="header__sideSection">
            <h3 className="header__sideSectionTitle">Shop by Department</h3>
            <Link to="/category/electronics" className="header__sideItem" onClick={onClose}>
              <span>Electronics</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
            <Link to="/category/jewelery" className="header__sideItem" onClick={onClose}>
              <span>Jewelry</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
            <Link to="/category/men's clothing" className="header__sideItem" onClick={onClose}>
              <span>Men's Fashion</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
            <Link to="/category/women's clothing" className="header__sideItem" onClick={onClose}>
              <span>Women's Fashion</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
          </div>

          <div className="header__sideDivider"></div>

          {/* Section 3: Programs & Features */}
          <div className="header__sideSection">
            <h3 className="header__sideSectionTitle">Programs &amp; Features</h3>
            <Link to="/cart" className="header__sideItem" onClick={onClose}>
              <span>Shopping Cart</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
            <Link to="/orders" className="header__sideItem" onClick={onClose}>
              <span>Your Orders</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </Link>
          </div>

          <div className="header__sideDivider"></div>

          {/* Section 4: Help & Settings */}
          <div className="header__sideSection">
            <h3 className="header__sideSectionTitle">Help &amp; Settings</h3>
            <Link to={user ? "/orders" : "/auth"} className="header__sideItem" onClick={onClose}>
              Your Account
            </Link>
            <Link to="/orders" className="header__sideItem" onClick={onClose}>
              Customer Service
            </Link>
            {!user ? (
              <Link to="/auth" className="header__sideItem" onClick={onClose}>
                Sign In
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/* Outside Close Button (Desktop) */}
      <button
        type="button"
        className="header__sideCloseOutside"
        onClick={onClose}
        aria-label="Close menu"
      >
        &times;
      </button>
    </div>
  )
}

export default SideMenu
