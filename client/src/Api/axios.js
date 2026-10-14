import axios from 'axios'

/**
 * Axios instance configured with base URL for Amazon Clone API / Stripe Backend
 * Defaults to http://localhost:5000 (or VITE_API_URL environment variable)
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
})

export { axiosInstance }
export default axiosInstance
