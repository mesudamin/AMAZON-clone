import CarouselEffect from '../../components/Carousel/CarouselEffect'
import Category from '../../components/Categories/Category'
import Product from '../../components/Product/Product'
import './Landing.css'

/**
 * Amazon Landing / Home Page Component
 */
function Landing() {
  return (
    <div className="landing">
      <CarouselEffect />
      <Category />
      <Product />
    </div>
  )
}

export default Landing
