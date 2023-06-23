import { Navigate, Outlet } from 'react-router-dom'

import { Header } from '../components/header'

export const PrivateRoutes = () => {
  const user = localStorage.getItem('cartorio:userData1.0')
  return user ? (
    <>
      <Header /> <Outlet />
    </>
  ) : (
    <Navigate to="login" />
  )
}
