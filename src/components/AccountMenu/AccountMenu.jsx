import './AccountMenu.css'

/**
 * Sign In & Account & Lists Navigation Component with Flyout
 */
function AccountMenu({ userName = 'Hello, sign in' }) {
  return (
    <div className="header__item header__navText header__hasDropdown" tabIndex={0}>
      <span className="header__textLineOne">{userName}</span>
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
          {/* Column 1: Your Lists */}
          <div className="header__accountColumn">
            <h4 className="header__accountColTitle">Your Lists</h4>
            <ul className="header__accountList">
              <li><a href="#create-list">Create a List</a></li>
              <li><a href="#find-list">Find a List or Registry</a></li>
              <li><a href="#smile">AmazonSmile Charity Lists</a></li>
            </ul>
          </div>

          <div className="header__accountColumnDivider"></div>

          {/* Column 2: Your Account */}
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
  )
}

export default AccountMenu
