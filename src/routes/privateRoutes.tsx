import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { Header } from '../components/header'
import { MenuMobile } from '../components/MenuMobile'
import api from '../services/api'

export const PrivateRoutes = () => {
  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  // const user = localStorage.getItem('cartorio:userData1.0')

  useEffect(() => {
    // Verifica se o usuário está autenticado via requisição ao servidor
    const checkAuthentication = async () => {
      try {
        await api.get('/check-auth', { withCredentials: true })  // Requisição para verificar autenticação
        setIsAuthenticated(true)  // Se passar, o usuário está autenticado
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false)  // Caso contrário, o usuário não está autenticado
      }
    }

    checkAuthentication()
  }, [])

  if (isAuthenticated === null) {
    return <div>Carregando ...</div>  // Ou um spinner enquanto a verificação de autenticação ocorre
  }

  return isAuthenticated ? (
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
