import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'
import searchIcon from '../../../assets/icon/search.svg'

/**
 * Authentic Amazon Search Bar Component
 * Includes category selector, suggestions, clear button, and submit button
 */
function SearchBar({ onSearch }) {
  const navigate = useNavigate()
  const [searchCategory, setSearchCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

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
      if (onSearch) {
        onSearch({ query: searchQuery, category: searchCategory })
      }
      navigate(`/results?search=${encodeURIComponent(searchQuery.trim())}`)
    } else if (searchCategory !== 'all') {
      navigate(`/category/${encodeURIComponent(searchCategory)}`)
    }
  }

  const handleSelectSuggestion = (item) => {
    setSearchQuery(item)
    setIsSearchFocused(false)
    navigate(`/results?search=${encodeURIComponent(item)}`)
  }

  return (
    <form
      className={`header__search ${isSearchFocused ? 'header__search--focused' : ''}`}
      onSubmit={handleSearchSubmit}
      role="search"
    >
      {/* Category Dropdown */}
      <div className="header__searchSelectWrapper">
        <select
          className="header__searchSelect"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          aria-label="Select search category"
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelry</option>
          <option value="men's clothing">Men's Fashion</option>
          <option value="women's clothing">Women's Fashion</option>
        </select>
      </div>

      {/* Input Field & Clear Button */}
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
                onMouseDown={() => handleSelectSuggestion(item)}
              >
                <img src={searchIcon} alt="" className="header__suggestionIcon" />
                <span className="header__suggestionText">{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Submit Button */}
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
  )
}

export default SearchBar
