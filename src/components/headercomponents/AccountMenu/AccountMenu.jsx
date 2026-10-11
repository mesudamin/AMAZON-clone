import { Link } from 'react-router-dom'
import { useData } from '../../../utility/DataContext'
import { Type } from '../../../utility/action.type'
import './AccountMenu.css'

/**
 * Sign In & Account & Lists Navigation Component with Flyout
 */
function AccountMenu({ user }) {
  const [, dispatch] = useData()

  const handleSignOut = () => {
    dispatch({
      type: Type.SET_USER,
      user: null
    })
  }

  const displayName = user ? `Hello, ${user.name}` : 'Hello, sign in'

  return (
    <div className="header__item header__navText header__hasDropdown" tabIndex={0}>
      <span className="header__textLineOne">{displayName}</span>
      <span className="header__textLineTwo">
        Account &amp; Lists <span className="header__arrowDown"></span>
      </span>

      {/* Account & Lists Flyout Dropdown */}
      <div className="header__dropdownMenu header__accountDropdown">
        <div className="header__dropdownArrow"></div>
        <div className="header__accountPrompt">
          {user ? (
            <button
              type="button"
              className="header__accountSignInBtn"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            <Link to="/auth" className="header__accountSignInBtn header__accountSignInLink">
              Sign in
            </Link>
          )}

          {!user && (
            <div className="header__accountNewCustomer">
              New customer?{' '}
              <Link to="/auth?mode=register" className="header__linkSmall">
                Start here.
              </Link>
            </div>
          )}
        </div>
        <div className="header__dropdownDivider"></div>
        <div className="header__accountColumns">
          {/* Column 1: Your Lists */}
          <div className="header__accountColumn">
            <h4 className="header__accountColTitle">Your Lists</h4>
            <ul className="header__accountList">
              <li><Link to="/cart">Shopping List</Link></li>
              <li><a href="#wishlist">Wish List</a></li>
              <li><a href="#registry">Baby Registry</a></li>
            </ul>
          </div>

          <div className="header__accountColumnDivider"></div>

          {/* Column 2: Your Account */}
          <div className="header__accountColumn">
            <h4 className="header__accountColTitle">Your Account</h4>
            <ul className="header__accountList">
              <li><Link to={user ? "/orders" : "/auth"}>Your Account</Link></li>
              <li><Link to="/orders">Your Orders</Link></li>
              <li><Link to="/cart">Your Cart</Link></li>
              <li><a href="#recommendations">Recommendations</a></li>
              <li><a href="#browsing-history">Browsing History</a></li>
              <li><a href="#prime">Prime Membership</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountMenu
