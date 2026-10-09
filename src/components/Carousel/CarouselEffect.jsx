import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { img } from '../../assets/carouselimg/data'
import './CarouselEffect.css'

/**
 * Amazon Hero Carousel Effect Component
 * Cycles through hero promotional banners with bottom gradient fade
 */
function CarouselEffect() {
  return (
    <div className="carousel">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={4000}
      >
        {img.map((imageItemLink, index) => (
          <div key={index} className="carousel__slide">
            <img
              src={imageItemLink}
              alt={`Amazon banner ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
      <div className="hero__img"></div>
    </div>
  )
}

export default CarouselEffect
