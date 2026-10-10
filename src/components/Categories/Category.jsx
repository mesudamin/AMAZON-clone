import { images } from '../../assets/categoriesImg/Categories.js'
import CategoryCard from './CategoryCard'
import './Category.css'

/**
 * Category Component
 * Renders the 4 category cards grid across the Amazon homepage
 */
function Category() {
  return (
    <section className="category__container" aria-label="Product Categories">
      {images?.map((item) => (
        <CategoryCard key={item.id} data={item} />
      ))}
    </section>
  )
}

export { CategoryCard }
export default Category
