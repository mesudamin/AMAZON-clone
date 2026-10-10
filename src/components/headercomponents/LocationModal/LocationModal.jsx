import { useState } from 'react'
import './LocationModal.css'

/**
 * Choose Your Location Modal Dialog
 */
function LocationModal({ isOpen, onClose, currentLocation = 'Ethiopia', onSaveLocation }) {
  const [zipCode, setZipCode] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(currentLocation)

  if (!isOpen) return null

  const handleApplyZip = () => {
    if (zipCode.trim() && onSaveLocation) {
      onSaveLocation(`US ${zipCode.trim()}`)
      onClose()
    }
  }

  const handleDone = () => {
    if (onSaveLocation) {
      onSaveLocation(selectedCountry)
    }
    onClose()
  }

  return (
    <div className="header__modalBackdrop" onClick={onClose}>
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
            onClick={onClose}
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
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <button
              type="button"
              className="header__modalApplyBtn"
              onClick={handleApplyZip}
            >
              Apply
            </button>
          </div>
          <div className="header__modalOrDivider">
            <span>or ship outside the US</span>
          </div>
          <div className="header__modalCountryRow">
            <select
              className="header__modalCountrySelect"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
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
            onClick={handleDone}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default LocationModal
