import { useState } from 'react'
import './SearchBar.css'
import searchIcon from '../../../assets/icon/search.svg'

/**
 * Authentic Amazon Search Bar Component
 * Includes category selector, suggestions, clear button, and submit button
 */
function SearchBar({ onSearch }) {
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
      } else {
        console.log(`Searching for "${searchQuery}" in category "${searchCategory}"`)
      }
    }
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
