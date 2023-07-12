import axios, { InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://api-cartorio.onrender.com/',
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const userData = localStorage.getItem('cartorio:userData1.0')
  const confirmEmail = localStorage.getItem('cartorio:UserConfirmEmail')
  const token = userData && JSON.parse(userData).token
  const tokenUpdatePassword = confirmEmail && JSON.parse(confirmEmail).token

  if (token || tokenUpdatePassword) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
