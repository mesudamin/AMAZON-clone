import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

// Sub-components
import DeliveryLocation, { MobileLocationStrip } from '../DeliveryLocation/DeliveryLocation'
import SearchBar from '../SearchBar/SearchBar'
import LanguageSelect from '../LanguageSelect/LanguageSelect'
import AccountMenu from '../AccountMenu/AccountMenu'
import SubNav from '../SubNav/SubNav'
import SideMenu from '../SideMenu/SideMenu'
import LocationModal from '../LocationModal/LocationModal'
import { useData } from '../../../utility/DataContext'

// Icons & Logo
import amazonLogo from '../../../assets/icon/logo1.png'
import cartIcon from '../../../assets/icon/cart.svg'
import menuIcon from '../../../assets/icon/menu.svg'

/**
 * Main Amazon Header Component
 * Assembles navigation, search, accounts, and drawers into a cohesive header experience
 */
function Header() {
  const [{ basket, user }] = useData()
  const cartCount = basket?.reduce((amount, item) => item.quantity + amount, 0) || 0

  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('Ethiopia')
  const [selectedLanguage, setSelectedLanguage] = useState('EN')

  return (
    <>
      <header className="header">
        {/* Top Main Navigation Bar */}
        <div className="header__main">
          {/* Mobile Hamburger Button (visible on mobile only) */}
          <button
            type="button"
            className="header__mobileMenuBtn"
            onClick={() => setSideMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <img src={menuIcon} alt="" className="header__menuIcon" />
          </button>

          {/* Amazon Logo */}
          <Link to="/" className="header__item header__logoLink" aria-label="Amazon Home">
            <img
              src={amazonLogo}
              alt="Amazon"
              className="header__logo"
            />
          </Link>

          {/* Deliver to Location (Desktop) */}
          <DeliveryLocation
            location={selectedLocation}
            onOpenModal={() => setLocationModalOpen(true)}
          />

          {/* Search Bar */}
          <SearchBar />

          {/* Language Selector */}
          <LanguageSelect
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />

          {/* Sign In & Account & Lists */}
          <AccountMenu user={user} />

          {/* Returns & Orders */}
          <Link to="/orders" className="header__item header__navText">
            <span className="header__textLineOne">Returns</span>
            <span className="header__textLineTwo">&amp; Orders</span>
          </Link>

          {/* Shopping Cart */}
          <Link
            to="/cart"
            className="header__item header__cart"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <div className="header__cartIconWrapper">
              <span className="header__cartCount">{cartCount}</span>
              <img
                src={cartIcon}
                alt="Shopping Cart"
                className="header__cartIcon"
              />
            </div>
            <span className="header__cartTitle">Cart</span>
          </Link>
        </div>

        {/* Mobile Delivery Location Strip */}
        <MobileLocationStrip
          location={selectedLocation}
          onClick={() => setLocationModalOpen(true)}
        />

        {/* Sub Navigation Bar */}
        <SubNav onOpenSideMenu={() => setSideMenuOpen(true)} />
      </header>

      {/* Side Menu Drawer ("All" Hamburger Menu) */}
      <SideMenu
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
      />

      {/* Choose Your Location Modal */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentLocation={selectedLocation}
        onSaveLocation={setSelectedLocation}
      />
    </>
  )
}

export default Header
