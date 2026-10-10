import './SideMenu.css'

/**
 * Side Menu Drawer ("All" Hamburger Menu)
 * Comprehensive slide-in navigation drawer with departments, features, and settings
 */
function SideMenu({ isOpen, onClose }) {
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
          <span className="header__sideTitle">Hello, sign in</span>
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
            <a href="#music" className="header__sideItem">
              <span>Amazon Music</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#kindle" className="header__sideItem">
              <span>Kindle E-readers &amp; Books</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#appstore" className="header__sideItem">
              <span>Amazon Appstore</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
          </div>

          <div className="header__sideDivider"></div>

          {/* Section 2: Shop by Department */}
          <div className="header__sideSection">
            <h3 className="header__sideSectionTitle">Shop by Department</h3>
            <a href="#electronics" className="header__sideItem">
              <span>Electronics</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#computers" className="header__sideItem">
              <span>Computers</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#smart-home" className="header__sideItem">
              <span>Smart Home</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#arts" className="header__sideItem">
              <span>Arts &amp; Crafts</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#automotive" className="header__sideItem">
              <span>Automotive</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#baby" className="header__sideItem">
              <span>Baby</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#beauty" className="header__sideItem">
              <span>Beauty and personal care</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#fashion" className="header__sideItem">
              <span>Women's Fashion</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#men" className="header__sideItem">
              <span>Men's Fashion</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
          </div>

          <div className="header__sideDivider"></div>

          {/* Section 3: Programs & Features */}
          <div className="header__sideSection">
            <h3 className="header__sideSectionTitle">Programs &amp; Features</h3>
            <a href="#giftcards" className="header__sideItem">
              <span>Gift Cards</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#shop-interest" className="header__sideItem">
              <span>Shop By Interest</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
            <a href="#live" className="header__sideItem">
              <span>Amazon Live</span>
              <span className="header__sideArrow">&rsaquo;</span>
            </a>
          </div>

          <div className="header__sideDivider"></div>

          {/* Section 4: Help & Settings */}
          <div className="header__sideSection">
            <h3 className="header__sideSectionTitle">Help &amp; Settings</h3>
            <a href="#account" className="header__sideItem">Your Account</a>
            <a href="#english" className="header__sideItem">English</a>
            <a href="#united-states" className="header__sideItem">United States</a>
            <a href="#customer-service" className="header__sideItem">Customer Service</a>
            <a href="#signin" className="header__sideItem">Sign In</a>
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
