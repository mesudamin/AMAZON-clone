import './Product.css'

/**
 * ProductCard Component
 * Displays an individual product with image, title, rating, price, and Add to Cart button
 */
function ProductCard({ product, data }) {
  const item = product || data || {}
  const { id, title, image, price, rating } = item

  const rate = Math.round(rating?.rate || 0)
  const count = rating?.count || 0

  return (
    <div className="productCard" id={`product-${id}`}>
      <div className="productCard__imageContainer">
        <img src={image} alt={title} className="productCard__image" loading="lazy" />
      </div>

      <div className="productCard__info">
        <h3 className="productCard__title" title={title}>
          {title}
        </h3>

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
          className="productCard__button"
          aria-label={`Add ${title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
