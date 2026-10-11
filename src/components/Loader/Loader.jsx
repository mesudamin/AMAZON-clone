import { ClipLoader } from 'react-spinners'
import './Loader.css'

/**
 * Authentic Amazon Loader Component
 * Renders an animated spinner with customizable color, size, and message
 */
function Loader({ size = 50, color = '#febd69', text = 'Loading...', loading = true }) {
  if (!loading) return null

  return (
    <div className="loader">
      <ClipLoader color={color} size={size} loading={loading} />
      {text && <p className="loader__text">{text}</p>}
    </div>
  )
}

export default Loader
