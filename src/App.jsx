import Header from './components/headercomponents/Header/Header'
import CarouselEffect from './components/Carousel/CarouselEffect'
import Category from './components/Categories/Category'
import Product from './components/Product/Product'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <CarouselEffect />
      <Category />
      <Product />
    </div>
  )
}

export default App
