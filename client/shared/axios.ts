import axios from 'axios'
import cookie from 'js-cookie'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_API}${process.env.NEXT_PUBLIC_APP_PATH_API}`,
})

instance.defaults.headers.common['Authorization'] = `Bearer ${cookie.get(
  'accessToken'
)}`

// custom response
instance.interceptors.response.use(
  (response) => {
    return response.data.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
