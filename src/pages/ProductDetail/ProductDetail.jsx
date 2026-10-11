import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useData } from '../../utility/DataContext'
import { Type } from '../../utility/action.type'
import Loader from '../../components/Loader/Loader'
import './ProductDetail.css'

/**
 * Authentic Amazon Product Detail Page Component
 * Fetches product by ID, displays full details, gallery, and interactive Buy Box
 */
function ProductDetail() {
  const { productId } = useParams()
  const [, dispatch] = useData()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedNotice, setAddedNotice] = useState(false)
  const [prevId, setPrevId] = useState(productId)

  if (prevId !== productId) {
    setPrevId(productId)
    setLoading(true)
    setProduct(null)
    setError(null)
  }

  useEffect(() => {
    let isMounted = true

    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load product details (${res.status})`)
        }
        return res.json()
      })
      .then((data) => {
        if (isMounted) {
          setProduct(data)
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
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating,
        quantity: Number(quantity)
      }
    })
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 2500)
  }

  const handleBuyNow = () => {
    if (!product) return
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating,
        quantity: Number(quantity)
      }
    })
    navigate('/payment')
  }

  if (loading) {
    return (
      <div className="productDetail productDetail--loading">
        <Loader text="Loading product details..." />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="productDetail productDetail--error">
        <h2>Unable to load product</h2>
        <p>{error || 'Product not found'}</p>
        <Link to="/" className="productDetail__btnHome">
          Return to Home
        </Link>
      </div>
    )
  }

  const rate = Math.round(product.rating?.rate || 0)
  const count = product.rating?.count || 0

  return (
    <div className="productDetail">
      <div className="productDetail__container">
        {/* Breadcrumb */}
        <nav className="productDetail__breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to={`/category/${product.category}`}>{product.category}</Link>
          <span>›</span>
          <span className="productDetail__bcCurrent">{product.title}</span>
        </nav>

        {/* Added Toast */}
        {addedNotice && (
          <div className="productDetail__toast">
            <span>✓</span> Added {quantity} item(s) to Cart!
            <Link to="/cart" className="productDetail__toastLink">View Cart</Link>
          </div>
        )}

        <div className="productDetail__main">
          {/* Left: Product Image */}
          <div className="productDetail__imageCol">
            <div className="productDetail__imageWrapper">
              <img
                src={product.image}
                alt={product.title}
                className="productDetail__image"
              />
            </div>
          </div>

          {/* Center: Product Info */}
          <div className="productDetail__infoCol">
            <h1 className="productDetail__title">{product.title}</h1>

            <div className="productDetail__rating">
              <div className="productDetail__stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= rate
                        ? 'productDetail__starFilled'
                        : 'productDetail__starEmpty'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="productDetail__ratingRate">
                {product.rating?.rate} out of 5
              </span>
              <span className="productDetail__ratingCount">
                ({count} ratings)
              </span>
            </div>

            <div className="productDetail__badge">1K+ bought in past month</div>

            <div className="productDetail__divider"></div>

            <div className="productDetail__priceBox">
              <div className="productDetail__priceRow">
                <span className="productDetail__priceSymbol">$</span>
                <span className="productDetail__priceMain">
                  {Math.floor(product.price)}
                </span>
                <span className="productDetail__priceDec">
                  {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
                </span>
              </div>
              <div className="productDetail__returnNotice">
                FREE Returns &bull; No import fees deposit
              </div>
            </div>

            <div className="productDetail__divider"></div>

            <div className="productDetail__about">
              <h3>About this item</h3>
              <p className="productDetail__description">{product.description}</p>
              <ul className="productDetail__features">
                <li>Authentic high quality product with top verified reviews</li>
                <li>Fast, reliable international delivery options available</li>
                <li>Category: <strong>{product.category}</strong></li>
              </ul>
            </div>
          </div>

          {/* Right: Buy Box */}
          <aside className="productDetail__buyBoxCol">
            <div className="productDetail__buyBox">
              <div className="productDetail__buyBoxPrice">
                ${product.price?.toFixed(2)}
              </div>
              <div className="productDetail__shippingInfo">
                FREE delivery <strong>Tomorrow</strong>. Order within 4 hrs 12 mins.
              </div>

              <div className="productDetail__locationDeliver">
                <span>📍</span> Deliver to Ethiopia
              </div>

              <div className="productDetail__stockStatus">In Stock</div>

              <div className="productDetail__qtyRow">
                <label htmlFor="qtySelect">Quantity:</label>
                <select
                  id="qtySelect"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="productDetail__qtySelect"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="productDetail__btnAddToCart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="productDetail__btnBuyNow"
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

              <div className="productDetail__fulfillment">
                <div className="productDetail__fulfillmentRow">
                  <span>Ships from</span>
                  <span>Amazon.com</span>
                </div>
                <div className="productDetail__fulfillmentRow">
                  <span>Sold by</span>
                  <span>Amazon.com</span>
                </div>
                <div className="productDetail__fulfillmentRow">
                  <span>Returns</span>
                  <span>30-day refund / replacement</span>
                </div>
                <div className="productDetail__fulfillmentRow">
                  <span>Payment</span>
                  <span>Secure transaction</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
