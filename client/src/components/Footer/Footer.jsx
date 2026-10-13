import { Link } from 'react-router-dom'
import './Footer.css'
import amazonLogo from '../../assets/icon/logo1.png'

/**
 * Authentic Amazon Footer Component
 * Includes smooth back-to-top button, categorized links, localization, and copyright
 */
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="footer">
      {/* Back to top button */}
      <button
        type="button"
        className="footer__backToTop"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        Back to top
      </button>

      {/* Main navigation columns */}
      <div className="footer__main">
        <div className="footer__columnsContainer">
          <div className="footer__column">
            <h3 className="footer__columnTitle">Get to Know Us</h3>
            <ul className="footer__list">
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#about">About Amazon</a></li>
              <li><a href="#investor">Investor Relations</a></li>
              <li><a href="#devices">Amazon Devices</a></li>
              <li><a href="#science">Amazon Science</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__columnTitle">Make Money with Us</h3>
            <ul className="footer__list">
              <li><a href="#sell">Sell products on Amazon</a></li>
              <li><a href="#sell-business">Sell on Amazon Business</a></li>
              <li><a href="#sell-apps">Sell apps on Amazon</a></li>
              <li><a href="#affiliate">Become an Affiliate</a></li>
              <li><a href="#advertise">Advertise Your Products</a></li>
              <li><a href="#publish">Self-Publish with Us</a></li>
              <li><a href="#host">Host an Amazon Hub</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__columnTitle">Amazon Payment Products</h3>
            <ul className="footer__list">
              <li><a href="#business-card">Amazon Business Card</a></li>
              <li><a href="#points">Shop with Points</a></li>
              <li><a href="#reload">Reload Your Balance</a></li>
              <li><a href="#currency">Amazon Currency Converter</a></li>
            </ul>
          </div>

          <div className="footer__column">
            <h3 className="footer__columnTitle">Let Us Help You</h3>
            <ul className="footer__list">
              <li><Link to="/auth">Your Account</Link></li>
              <li><Link to="/orders">Your Orders</Link></li>
              <li><a href="#shipping">Shipping Rates &amp; Policies</a></li>
              <li><Link to="/orders">Returns &amp; Replacements</Link></li>
              <li><a href="#devices-help">Manage Your Content and Devices</a></li>
              <li><a href="#help">Help</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__divider"></div>

      {/* Brand & Localization strip */}
      <div className="footer__brandStrip">
        <Link to="/" className="footer__logoLink" onClick={scrollToTop}>
          <img src={amazonLogo} alt="Amazon" className="footer__logo" />
        </Link>
        <div className="footer__badges">
          <button type="button" className="footer__badgeBtn">🌐 English</button>
          <button type="button" className="footer__badgeBtn">$ USD - U.S. Dollar</button>
          <button type="button" className="footer__badgeBtn">🇺🇸 United States</button>
        </div>
      </div>

      {/* Sub-footer copyright & legal */}
      <div className="footer__bottom">
        <div className="footer__legalLinks">
          <a href="#conditions">Conditions of Use</a>
          <a href="#privacy">Privacy Notice</a>
          <a href="#consumer-privacy">Consumer Health Data Privacy Disclosure</a>
          <a href="#ads">Your Ads Privacy Choices</a>
        </div>
        <p className="footer__copyright">
          &copy; 1996-2026, Amazon.com, Inc. or its affiliates. (Built for educational demo)
        </p>
      </div>
    </footer>
  )
}

export default Footer
