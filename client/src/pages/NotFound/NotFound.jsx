import { Link } from 'react-router-dom'
import './NotFound.css'

/**
 * Amazon 404 Not Found Page Component
 */
function NotFound() {
  return (
    <div className="notFound">
      <div className="notFound__content">
        <div className="notFound__dog">🐕</div>
        <h1 className="notFound__title">SORRY</h1>
        <p className="notFound__subtitle">
          we couldn't find that page. Try searching or go to Amazon's home page.
        </p>
        <Link to="/" className="notFound__homeBtn">
          Go to Amazon.com's Home Page
        </Link>
      </div>
    </div>
  )
}

export default NotFound
