import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import Loader from '../Loader/Loader'
import './Product.css'

/**
 * Product Component
 * Fetches product catalog from Fake Store API and renders responsive product cards grid
 */
function Product() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        if (isMounted) {
          setProducts(data)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <section className="product__container" aria-label="Products Loading">
        <Loader text="Loading products..." />
      </section>
    )
  }

  if (error) {
    return (
      <section className="product__container" aria-label="Products Error">
        <div className="product__errorContainer">
          <p className="product__errorText">Failed to load products: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="product__container" aria-label="Product Showcase">
      <div className="product__grid">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  )
}

export { ProductCard }
export default Product
