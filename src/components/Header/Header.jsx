import React, { useState } from 'react'
import './Header.css'

// Import icons and logo from assets/icon
import amazonLogo from '../../assets/icon/logo1.png'
import locationIcon from '../../assets/icon/location.svg'
import searchIcon from '../../assets/icon/search.svg'
import flagIcon from '../../assets/icon/us_flag.svg'
import cartIcon from '../../assets/icon/cart.svg'
import menuIcon from '../../assets/icon/menu.svg'

function Header() {
  const [searchCategory, setSearchCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('EN')
  const [cartCount, setCartCount] = useState(0)
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [locationModalOpen, setLocationModalOpen] = useState(false)

  // Popular search suggestions
  const popularSuggestions = [
    'laptop computers',
    'wireless earbuds with noise cancelling',
    'smart watches for men and women',
    'apple iphone accessories',
    'home office desk chair ergonomical',
    'coffee maker single serve'
  ]

  const filteredSuggestions = searchQuery.trim()
    ? [
      `${searchQuery.toLowerCase()} deals`,
      `${searchQuery.toLowerCase()} best seller`,
      `${searchQuery.toLowerCase()} under $25`,
      `${searchQuery.toLowerCase()} prime eligible`
    ]
    : popularSuggestions

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log(`Searching for "${searchQuery}" in category "${searchCategory}"`)
    }
  }

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
          <a href="/" className="header__item header__logoLink" aria-label="Amazon Home">
            <img
              src={amazonLogo}
              alt="Amazon"
              className="header__logo"
            />
          </a>

          {/* Deliver to Location */}
          <div
            className="header__item header__delivery"
            onClick={() => setLocationModalOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Choose delivery location"
          >
            <div className="header__deliveryContainer">
              <span className="header__deliveryLineOne">Deliver to</span>
              <div className="header__deliveryLineTwoWrapper">
                <img
                  src={locationIcon}
                  alt=""
                  className="header__locationIcon"
                />
                <span className="header__deliveryLineTwo">Ethiopia</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <form
            className={`header__search ${isSearchFocused ? 'header__search--focused' : ''}`}
            onSubmit={handleSearchSubmit}
            role="search"
          >
            <div className="header__searchSelectWrapper">
              <select
                className="header__searchSelect"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                aria-label="Select search category"
              >
                <option value="all">All</option>
                <option value="arts">Arts &amp; Crafts</option>
                <option value="automotive">Automotive</option>
                <option value="baby">Baby</option>
                <option value="beauty">Beauty &amp; Personal Care</option>
                <option value="books">Books</option>
                <option value="computers">Computers</option>
                <option value="digital-music">Digital Music</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Men's &amp; Women's Fashion</option>
                <option value="health">Health &amp; Household</option>
                <option value="home">Home &amp; Kitchen</option>
                <option value="movies">Movies &amp; TV</option>
                <option value="pet-supplies">Pet Supplies</option>
                <option value="sports">Sports &amp; Outdoors</option>
                <option value="tools">Tools &amp; Home Improvement</option>
                <option value="toys">Toys &amp; Games</option>
                <option value="video-games">Video Games</option>
              </select>
            </div>

            <div className="header__searchInputWrapper">
              <input
                type="text"
                className="header__searchInput"
                placeholder="Search Product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                aria-label="Search Amazon"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="header__searchClear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search input"
                >
                  &times;
                </button>
              )}

              {/* Real-time search suggestions dropdown */}
              {isSearchFocused && (
                <div className="header__searchSuggestions">
                  <div className="header__suggestionCategory">
                    {searchQuery ? 'Suggestions' : 'Trending searches'}
                  </div>
                  {filteredSuggestions.map((item, index) => (
                    <div
                      key={index}
                      className="header__suggestionItem"
                      onMouseDown={() => {
                        setSearchQuery(item)
                        setIsSearchFocused(false)
                      }}
                    >
                      <img src={searchIcon} alt="" className="header__suggestionIcon" />
                      <span className="header__suggestionText">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="header__searchButton"
              aria-label="Search"
            >
              <img
                src={searchIcon}
                alt=""
                className="header__searchIcon"
              />
            </button>
          </form>

          {/* Language Selector with Dropdown */}
          <div className="header__item header__language header__hasDropdown" tabIndex={0}>
            <img
              src={flagIcon}
              alt="USA Flag"
              className="header__flag"
            />
            <span className="header__langCode">
              {selectedLanguage} <span className="header__arrowDown"></span>
            </span>

            {/* Language Flyout Dropdown */}
            <div className="header__dropdownMenu header__langDropdown">
              <div className="header__dropdownArrow"></div>
              <div className="header__langHeader">
                <span>Change language</span>
                <a href="#learn-more" className="header__linkSmall">Learn more</a>
              </div>
              <div className="header__langOptions">
                <label className="header__langOption">
                  <input
                    type="radio"
                    name="language"
                    checked={selectedLanguage === 'EN'}
                    onChange={() => setSelectedLanguage('EN')}
                  />
                  <span>English - EN</span>
                </label>
                <label className="header__langOption">
                  <input
                    type="radio"
                    name="language"
                    checked={selectedLanguage === 'ES'}
                    onChange={() => setSelectedLanguage('ES')}
                  />
                  <span>Español - ES</span>
                </label>
                <label className="header__langOption">
                  <input
                    type="radio"
                    name="language"
                    checked={selectedLanguage === 'AR'}
                    onChange={() => setSelectedLanguage('AR')}
                  />
                  <span>العربية - AR</span>
                </label>
                <label className="header__langOption">
                  <input
                    type="radio"
                    name="language"
                    checked={selectedLanguage === 'DE'}
                    onChange={() => setSelectedLanguage('DE')}
                  />
                  <span>Deutsch - DE</span>
                </label>
              </div>
              <div className="header__dropdownDivider"></div>
              <div className="header__currencySection">
                <span className="header__currencyLabel">Change currency</span>
                <div className="header__currencyRow">
                  <span>$ - USD - US Dollar</span>
                  <a href="#currency" className="header__linkSmall">Change</a>
                </div>
              </div>
              <div className="header__dropdownDivider"></div>
              <div className="header__countrySection">
                <span className="header__flagWrapper">
                  <img src={flagIcon} alt="" className="header__flagSmall" />
                </span>
                <span>You are shopping on Amazon.com</span>
              </div>
            </div>
          </div>

          {/* Sign In & Account with Dropdown */}
          <div className="header__item header__navText header__hasDropdown" tabIndex={0}>
            <span className="header__textLineOne">Hello, sign in</span>
            <span className="header__textLineTwo">
              Account &amp; Lists <span className="header__arrowDown"></span>
            </span>

            {/* Account & Lists Flyout Dropdown */}
            <div className="header__dropdownMenu header__accountDropdown">
              <div className="header__dropdownArrow"></div>
              <div className="header__accountPrompt">
                <button className="header__accountSignInBtn">Sign in</button>
                <div className="header__accountNewCustomer">
                  New customer? <a href="#start-here" className="header__linkSmall">Start here.</a>
                </div>
              </div>
              <div className="header__dropdownDivider"></div>
              <div className="header__accountColumns">
                <div className="header__accountColumn">
                  <h4 className="header__accountColTitle">Your Lists</h4>
                  <ul className="header__accountList">
                    <li><a href="#create-list">Create a List</a></li>
                    <li><a href="#find-list">Find a List or Registry</a></li>
                    <li><a href="#smile">AmazonSmile Charity Lists</a></li>
                  </ul>
                </div>
                <div className="header__accountColumnDivider"></div>
                <div className="header__accountColumn">
                  <h4 className="header__accountColTitle">Your Account</h4>
                  <ul className="header__accountList">
                    <li><a href="#account">Account</a></li>
                    <li><a href="#orders">Orders</a></li>
                    <li><a href="#recommendations">Recommendations</a></li>
                    <li><a href="#history">Browsing History</a></li>
                    <li><a href="#watchlist">Watchlist</a></li>
                    <li><a href="#purchases">Video Purchases &amp; Rentals</a></li>
                    <li><a href="#kindle">Kindle Unlimited</a></li>
                    <li><a href="#content">Content &amp; Devices</a></li>
                    <li><a href="#subscribe">Subscribe &amp; Save Items</a></li>
                    <li><a href="#memberships">Memberships &amp; Subscriptions</a></li>
                    <li><a href="#music">Music Library</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Returns & Orders */}
          <a href="#orders" className="header__item header__navText">
            <span className="header__textLineOne">Returns</span>
            <span className="header__textLineTwo">&amp; Orders</span>
          </a>

          {/* Shopping Cart */}
          <a
            href="#cart"
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
          </a>
        </div>

        {/* Mobile Delivery Location Strip (Real Amazon Mobile Strip) */}
        <div
          className="header__mobileLocationStrip"
          onClick={() => setLocationModalOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Choose delivery location"
        >
          <img
            src={locationIcon}
            alt=""
            className="header__mobileLocationIcon"
          />
          <span className="header__mobileLocationText">
            Deliver to Ethiopia
          </span>
          <span className="header__arrowDown"></span>
        </div>

        {/* Sub Navigation Bar */}
        <nav className="header__subnav" aria-label="Category Navigation">
          <button
            type="button"
            className="header__item header__menuButton"
            onClick={() => setSideMenuOpen(true)}
            aria-label="Open All Navigation Menu"
          >
            <img
              src={menuIcon}
              alt=""
              className="header__menuIcon"
            />
            <span>All</span>
          </button>
          <div className="header__subnavLinks">
            <a href="#prime-video" className="header__subnavLink">Prime Video</a>
            <a href="#coupons" className="header__subnavLink">Coupons</a>
            <a href="#customer-service" className="header__subnavLink">Customer Service</a>
            <a href="#todays-deals" className="header__subnavLink">Today's Deals</a>
            <a href="#registry" className="header__subnavLink">Registry</a>
            <a href="#gift-cards" className="header__subnavLink">Gift Cards</a>
            <a href="#sell" className="header__subnavLink">Sell</a>
          </div>
        </nav>
      </header>

      {/* Side Menu Drawer ("All" Hamburger Menu) */}
      {sideMenuOpen && (
        <div className="header__sideOverlay" onClick={() => setSideMenuOpen(false)}>
          <div
            className="header__sideDrawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Amazon All Navigation"
          >
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
                onClick={() => setSideMenuOpen(false)}
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>

            <div className="header__sideContent">
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
          <button
            type="button"
            className="header__sideCloseOutside"
            onClick={() => setSideMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>
      )}

      {/* Location Selector Modal */}
      {locationModalOpen && (
        <div className="header__modalBackdrop" onClick={() => setLocationModalOpen(false)}>
          <div
            className="header__modalCard"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Choose your location"
          >
            <div className="header__modalHeader">
              <h3>Choose your location</h3>
              <button
                type="button"
                className="header__modalClose"
                onClick={() => setLocationModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="header__modalBody">
              <p className="header__modalDesc">
                Delivery options and delivery speeds may vary for different locations.
              </p>
              <button className="header__modalSignInBtn">
                Sign in to see your addresses
              </button>
              <div className="header__modalOrDivider">
                <span>or enter a US zip code</span>
              </div>
              <div className="header__modalZipRow">
                <input
                  type="text"
                  maxLength={5}
                  placeholder="Zip code"
                  className="header__modalZipInput"
                />
                <button type="button" className="header__modalApplyBtn">
                  Apply
                </button>
              </div>
              <div className="header__modalOrDivider">
                <span>or ship outside the US</span>
              </div>
              <div className="header__modalCountryRow">
                <select className="header__modalCountrySelect" defaultValue="Ethiopia">
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
            <div className="header__modalFooter">
              <button
                type="button"
                className="header__modalDoneBtn"
                onClick={() => setLocationModalOpen(false)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
