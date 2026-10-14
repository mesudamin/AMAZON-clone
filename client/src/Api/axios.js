import axios from 'axios'

/**
 * Axios instance configured with base URL for Amazon Clone API / Stripe Backend
 * Defaults to https://amazon-clone-e0n7.onrender.com (or VITE_API_URL environment variable)
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://amazon-clone-e0n7.onrender.com'
})

export { axiosInstance }
export default axiosInstance
