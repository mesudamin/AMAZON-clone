import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../../components/Product/ProductCard'
import './Results.css'

/**
 * Authentic Amazon Results Component
 * Displays product search results or category-specific products
 */
function Results() {
  const { categoryName } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || searchParams.get('query') || ''

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSort, setSelectedSort] = useState('featured')

  const currentKey = `${categoryName || ''}_${searchQuery || ''}`
  const [prevKey, setPrevKey] = useState(currentKey)

  if (prevKey !== currentKey) {
    setPrevKey(currentKey)
    setLoading(true)
    setError(null)
  }

  useEffect(() => {
    let isMounted = true

    const url = categoryName
      ? `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`
      : 'https://fakestoreapi.com/products'

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (isMounted) {
          let list = data
          if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            list = list.filter(
              (p) =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            )
          }
          setProducts(list)
          setFilteredProducts(list)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [categoryName, searchQuery])

  // Sorting
  const handleSortChange = (e) => {
    const value = e.target.value
    setSelectedSort(value)

    let sorted = [...products]
    if (value === 'price-low') {
      sorted.sort((a, b) => a.price - b.price)
    } else if (value === 'price-high') {
      sorted.sort((a, b) => b.price - a.price)
    } else if (value === 'rating') {
      sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
    }
    setFilteredProducts(sorted)
  }

  const titleHeading = categoryName
    ? `Category: ${categoryName.toUpperCase()}`
    : searchQuery
    ? `Results for "${searchQuery}"`
    : 'All Products'

  return (
    <div className="results">
      {/* Top Results Bar */}
      <div className="results__topBar">
        <div className="results__count">
          1-{filteredProducts.length} of {filteredProducts.length} results for{' '}
          <span className="results__keyword">
            {categoryName || searchQuery || 'All Departments'}
          </span>
        </div>

        <div className="results__sortWrapper">
          <label htmlFor="sortSelect">Sort by:</label>
          <select
            id="sortSelect"
            value={selectedSort}
            onChange={handleSortChange}
            className="results__sortSelect"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
          </select>
        </div>
      </div>

      <div className="results__layout">
        {/* Left Filter Sidebar */}
        <aside className="results__sidebar" aria-label="Filters">
          <div className="results__filterGroup">
            <h3>Department</h3>
            <ul className="results__filterList">
              <li>
                <Link to="/category/electronics">Electronics</Link>
              </li>
              <li>
                <Link to="/category/jewelery">Jewelry</Link>
              </li>
              <li>
                <Link to="/category/men's clothing">Men's Fashion</Link>
              </li>
              <li>
                <Link to="/category/women's clothing">Women's Fashion</Link>
              </li>
            </ul>
          </div>

          <div className="results__filterGroup">
            <h3>Customer Reviews</h3>
            <div className="results__reviewFilter">
              <div>★★★★☆ &amp; Up</div>
              <div>★★★☆☆ &amp; Up</div>
              <div>★★☆☆☆ &amp; Up</div>
            </div>
          </div>

          <div className="results__filterGroup">
            <h3>Price</h3>
            <ul className="results__filterList">
              <li>Under $25</li>
              <li>$25 to $50</li>
              <li>$50 to $100</li>
              <li>$100 &amp; Above</li>
            </ul>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="results__main">
          {loading ? (
            <div className="results__loading">
              <div className="results__spinner"></div>
              <p>Searching Amazon...</p>
            </div>
          ) : error ? (
            <div className="results__error">
              <p>Error: {error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="results__noMatch">
              <h2>No results found for your search</h2>
              <p>Try checking your spelling or use more general terms.</p>
              <Link to="/" className="results__backBtn">Back to Home</Link>
            </div>
          ) : (
            <>
              <h2 className="results__heading">{titleHeading}</h2>
              <p className="results__subheading">
                Check each product page for other buying options.
              </p>
              <div className="results__grid">
                {filteredProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Results
