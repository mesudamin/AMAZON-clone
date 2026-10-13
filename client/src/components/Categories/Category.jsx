import { useState, useEffect } from 'react'
import { images } from '../../assets/categoriesImg/Categories.js'
import CategoryCard from './CategoryCard'
import Loader from '../Loader/Loader'
import './Category.css'

const categoryList = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing"
]

/**
 * Category Component
 * Renders the 4 category cards grid across the Amazon homepage by fetching from Fake Store API
 */
function Category({ loading = false, isLoading = false }) {
  const [categoriesData, setCategoriesData] = useState([])
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    let isMounted = true

    Promise.all(
      categoryList.map((category) =>
        fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch category ${category}: ${res.status}`)
            }
            return res.json()
          })
          .then((data) => data[0])
      )
    )
      .then((results) => {
        if (isMounted) {
          const validResults = results.filter(Boolean)
          setCategoriesData(validResults.length > 0 ? validResults : images)
          setLoadingData(false)
        }
      })
      .catch((err) => {
        console.error('Error fetching categories:', err)
        if (isMounted) {
          setCategoriesData(images)
          setLoadingData(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const displayData = categoriesData.length > 0 ? categoriesData : images

  if (loading || isLoading || loadingData || !displayData || displayData.length === 0) {
    return (
      <section className="category__container" aria-label="Loading categories">
        <Loader text="Loading categories..." />
      </section>
    )
  }

  return (
    <section className="category__container" aria-label="Product Categories">
      {displayData.map((item) => (
        <CategoryCard key={item.id || item.category} data={item} />
      ))}
    </section>
  )
}

export { CategoryCard }
export default Category

