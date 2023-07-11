import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Header } from '../components/header'
import { MenuMobile } from '../components/MenuMobile'

export const PrivateRoutes = () => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const user = localStorage.getItem('cartorio:userData1.0')
  return user ? (
    <>
      <Header setMenuIsVisible={setMenuIsVisible} />
      <MenuMobile
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
      <Outlet />
    </>
  ) : (
    <Navigate to="login" />
  )
}
