import axios, { InternalAxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'https://api-cartorio.vercel.app/',
  withCredentials: true,
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // const userData = localStorage.getItem('cartorio:userData1.0')
  // const confirmEmail = localStorage.getItem('cartorio:UserConfirmEmail')
  // const token = userData && JSON.parse(userData).token
  // const tokenUpdatePassword = confirmEmail && JSON.parse(confirmEmail).token

  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }

  // if (tokenUpdatePassword) {
  //   config.headers.Authorization = `Bearer ${tokenUpdatePassword}`
  // }

  // Recuperando o token do cookie
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1]

  // Se o token estiver presente, adiciona no cabeçalho da requisição
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
