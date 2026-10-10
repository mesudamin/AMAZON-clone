import './SubNav.css'
import menuIcon from '../../../assets/icon/menu.svg'

/**
 * Sub Navigation Bar Component
 * Secondary horizontal navigation bar with the "All" button and category links
 */
function SubNav({ onOpenSideMenu }) {
  const links = [
    { label: 'Prime Video', href: '#prime-video' },
    { label: 'Coupons', href: '#coupons' },
    { label: 'Customer Service', href: '#customer-service' },
    { label: "Today's Deals", href: '#todays-deals' },
    { label: 'Registry', href: '#registry' },
    { label: 'Gift Cards', href: '#gift-cards' },
    { label: 'Sell', href: '#sell' }
  ]

  return (
    <nav className="header__subnav" aria-label="Category Navigation">
      {/* "All" Hamburger Button */}
      <button
        type="button"
        className="header__item header__menuButton"
        onClick={onOpenSideMenu}
        aria-label="Open All Navigation Menu"
      >
        <img
          src={menuIcon}
          alt=""
          className="header__menuIcon"
        />
        <span>All</span>
      </button>

      {/* Category Links */}
      <div className="header__subnavLinks">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="header__subnavLink"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default SubNav
