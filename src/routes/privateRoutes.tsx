import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header } from '../components/header'
import { MenuMobile } from '../components/MenuMobile'
import api from '../services/api'

export const PrivateRoutes = () => {
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await api.get('/check-auth', { withCredentials: true, })

        if (response.status === 200) {
          setIsAuthenticated(true) // Usuário autenticado
        } else {
          setIsAuthenticated(false) // Não autenticado
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuthentication()
  }, [])

  if (isAuthenticated === null) {
    return <div>Carregando...</div> // Mostra um loading enquanto verifica
  }

  return isAuthenticated ? (
    <>
      <Header setMenuIsVisible={setMenuIsVisible} />
      <MenuMobile menuIsVisible={menuIsVisible} setMenuIsVisible={setMenuIsVisible} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace /> // Corrigido para "/login"
  )
}
