import { Link } from 'react-router-dom'
import './Category.css'

/**
 * CategoryCard Component
 * Displays an individual Amazon category card with title, image, and shop now link
 */
function CategoryCard({ data }) {
  // Format category name for display (e.g., "electronics" -> "Electronics", "jewelery" -> "Jewelry")
  const formatCategoryName = (cat) => {
    if (!cat) return ''
    if (cat.toLowerCase() === 'jewelery') return 'Jewelry'
    return cat
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const categoryName = formatCategoryName(data?.category)

  return (
    <div className="category__card">
      <Link to={`/category/${data?.category}`} className="category__cardLink">
        <h2 className="category__cardTitle">{categoryName}</h2>
        <div className="category__imageContainer">
          <img
            src={data?.image}
            alt={data?.title || categoryName}
            className="category__cardImage"
          />
        </div>
        <p className="category__shopNow">Shop now</p>
      </Link>
    </div>
  )
}

export default CategoryCard
