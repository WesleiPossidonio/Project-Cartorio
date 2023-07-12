import React from 'react'
import { Routes, Route } from 'react-router-dom'

import {
  CompletedAplicationList,
  ConfirmEmail,
  FormCreateRequeriment,
  Home,
  Login,
  UpdatePaswordLogin,
  UpdateRequeriment,
} from '../Pages'
import { CuratedList } from '../Pages/CuratedList/index.'
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
