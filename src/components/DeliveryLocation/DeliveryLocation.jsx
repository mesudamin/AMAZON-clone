import './DeliveryLocation.css'
import locationIcon from '../../assets/icon/location.svg'

/**
 * Mobile Delivery Location Strip
 * Displayed below the main header on mobile screens
 */
export function MobileLocationStrip({ onClick, location = 'Ethiopia' }) {
  return (
    <div
      className="header__mobileLocationStrip"
      onClick={onClick}
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
        Deliver to {location}
      </span>
      <span className="header__arrowDown"></span>
    </div>
  )
}

/**
 * Desktop Delivery Location Selector
 */
function DeliveryLocation({ onOpenModal, location = 'Ethiopia', variant = 'desktop' }) {
  if (variant === 'mobile') {
    return <MobileLocationStrip onClick={onOpenModal} location={location} />
  }

  return (
    <div
      className="header__item header__delivery"
      onClick={onOpenModal}
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
          <span className="header__deliveryLineTwo">{location}</span>
        </div>
      </div>
    </div>
  )
}

export default DeliveryLocation
