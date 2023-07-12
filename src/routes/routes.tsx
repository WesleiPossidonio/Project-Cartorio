import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { CompletedAplicationList } from '../Pages/CompletedAplicationList'
import { FormCreateRequeriment } from '../Pages/CreateRequeriment'
import { CuratedList } from '../Pages/CuratedList/index.'
import { Home } from '../Pages/Home'
import { Login } from '../Pages/Login'
import { ConfirmEmail, UpdatePaswordLogin } from '../Pages/UpdateLogin'
import { UpdateRequeriment } from '../Pages/UpdateRequeriment'
import { PrivateRoutes } from './privateRoutes'

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Atualizar-Senha" element={<UpdatePaswordLogin />} />
      <Route path="/Confirmar-Email" element={<ConfirmEmail />} />

      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/criar-exigencia" element={<FormCreateRequeriment />} />
        <Route path="/lista-concluida" element={<CompletedAplicationList />} />
        <Route path="/lista-selecionada" element={<CuratedList />} />
        <Route path="/atualizar-lista" element={<UpdateRequeriment />} />
      </Route>
    </Routes>
  )
}
