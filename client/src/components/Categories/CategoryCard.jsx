import { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'
import './Category.css'

/**
 * CategoryCard Component
 * Displays an individual Amazon category card with title, image, and shop now link
 * Includes loading states for data and image loading
 */
function CategoryCard({ data, loading = false, isLoading = false }) {
  const isCardLoading = loading || isLoading || !data
  const [imageLoaded, setImageLoaded] = useState(false)

  // Format category name for display (e.g., "electronics" -> "Electronics", "jewelery" -> "Jewelry")
  const formatCategoryName = (cat) => {
    if (!cat) return ''
    if (cat.toLowerCase() === 'jewelery') return 'Jewelry'
    return cat
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (isCardLoading) {
    return (
      <div className="category__card category__card--loading">
        <Loader size={35} text="Loading..." />
      </div>
    )
  }

  const categoryName = formatCategoryName(data?.category)

  return (
    <div className="category__card">
      <Link to={`/category/${data?.category}`} className="category__cardLink">
        <h2 className="category__cardTitle">{categoryName}</h2>
        <div className="category__imageContainer">
          {!imageLoaded && (
            <div className="category__imagePlaceholder" aria-label="Loading image">
              <Loader size={30} text="" />
            </div>
          )}
          <img
            src={data?.image}
            alt={data?.title || categoryName}
            className={`category__cardImage ${
              imageLoaded ? 'category__cardImage--loaded' : 'category__cardImage--hidden'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
        <p className="category__shopNow">Shop now</p>
      </Link>
    </div>
  )
}

export default CategoryCard
