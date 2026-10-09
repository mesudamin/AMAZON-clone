import { useState } from 'react'
import './LanguageSelect.css'
import flagIcon from '../../assets/icon/us_flag.svg'

/**
 * Language Selector with Hover/Focus Flyout Menu
 */
function LanguageSelect({
  selectedLanguage = 'EN',
  onLanguageChange
}) {
  const [currentLang, setCurrentLang] = useState(selectedLanguage)

  const handleSelect = (langCode) => {
    setCurrentLang(langCode)
    if (onLanguageChange) {
      onLanguageChange(langCode)
    }
  }

  const activeLang = onLanguageChange ? selectedLanguage : currentLang

  return (
    <div className="header__item header__language header__hasDropdown" tabIndex={0}>
      <img
        src={flagIcon}
        alt="USA Flag"
        className="header__flag"
      />
      <span className="header__langCode">
        {activeLang} <span className="header__arrowDown"></span>
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
              checked={activeLang === 'EN'}
              onChange={() => handleSelect('EN')}
            />
            <span>English - EN</span>
          </label>
          <label className="header__langOption">
            <input
              type="radio"
              name="language"
              checked={activeLang === 'ES'}
              onChange={() => handleSelect('ES')}
            />
            <span>Español - ES</span>
          </label>
          <label className="header__langOption">
            <input
              type="radio"
              name="language"
              checked={activeLang === 'AR'}
              onChange={() => handleSelect('AR')}
            />
            <span>العربية - AR</span>
          </label>
          <label className="header__langOption">
            <input
              type="radio"
              name="language"
              checked={activeLang === 'DE'}
              onChange={() => handleSelect('DE')}
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
  )
}

export default LanguageSelect
