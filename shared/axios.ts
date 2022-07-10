import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_API}${process.env.NEXT_PUBLIC_APP_PATH_API}`,
})

if (typeof Storage !== 'undefined') {
  instance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${sessionStorage.getItem('accessToken')}`
}

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
