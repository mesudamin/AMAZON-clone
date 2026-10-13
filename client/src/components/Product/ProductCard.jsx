import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useData } from '../../utility/DataContext'
import { Type } from '../../utility/action.type'
import Loader from '../Loader/Loader'
import './Product.css'

/**
 * ProductCard Component
 * Displays an individual product with image, title, rating, price, and Add to Cart button
 * Connects directly to global Cart state
 */
function ProductCard({ product, data, loading = false, isLoading = false }) {
  const [, dispatch] = useData()
  const [isAdded, setIsAdded] = useState(false)

  if (loading || isLoading) {
    return (
      <div className="productCard productCard--loading">
        <Loader size={30} text="" />
      </div>
    )
  }

  const item = product || data || {}
  const { id, title, image, price, rating } = item

  const rate = Math.round(rating?.rate || 0)
  const count = rating?.count || 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        image,
        price,
        rating,
        quantity: 1
      }
    })

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1200)
  }

  return (
    <div className="productCard" id={`product-${id}`}>
      <Link to={`/products/${id}`} className="productCard__imageLink">
        <div className="productCard__imageContainer">
          <img src={image} alt={title} className="productCard__image" loading="lazy" />
        </div>
      </Link>

      <div className="productCard__info">
        <Link to={`/products/${id}`} className="productCard__titleLink">
          <h3 className="productCard__title" title={title}>
            {title}
          </h3>
        </Link>

        <div className="productCard__rating">
          <div className="productCard__stars" aria-label={`${rating?.rate || 0} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rate ? 'productCard__starFilled' : 'productCard__starEmpty'}
              >
                ★
              </span>
            ))}
          </div>
          <span className="productCard__ratingCount">({count})</span>
        </div>

        <div className="productCard__priceRow">
          <span className="productCard__priceSymbol">$</span>
          <span className="productCard__priceAmount">
            {typeof price === 'number' ? price.toFixed(2) : price}
          </span>
        </div>

        <button
          type="button"
          className={`productCard__button ${isAdded ? 'productCard__button--added' : ''}`}
          onClick={handleAddToCart}
          aria-label={`Add ${title} to cart`}
        >
          {isAdded ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
