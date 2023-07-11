import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { MenuPage } from '../../components/MenuPage'
import { TitleText } from '../../components/typography'
import { UpdateControllerFormInputs } from '../../components/UpdateControllerFormInputs'
import { ListRequerimentProps } from '../../contexts/RequerimentContext'
// import { useRequeriment } from '../../hooks/useRequeriment'
import { useRequeriment } from '../../hooks/useRequeriment'
import {
  CreateRequerimentFormInputs,
  createRequerimentFormSchema,
} from '../CreateRequeriment'
import { ContainerForm, ContainerUpdate, ContentRequeriment } from './styled'

export interface LocationProps {
  state: ListRequerimentProps
}

export function UpdateRequeriment() {
  const { state } = useLocation() as unknown as LocationProps
  const { updateRequeriment } = useRequeriment()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateRequerimentFormInputs>({
    resolver: zodResolver(createRequerimentFormSchema),
  })

  const navigate = useNavigate()

  const handleNavigateToHome = () => {
    navigate('/')
  }

  const handleUpdateRequeriment = (data: CreateRequerimentFormInputs) => {
    const booleanData: Record<string, string> = {}
    console.log('fui clicado:', data)

    const filteredEntries = Object.entries(data).filter(
      ([key, value]) => typeof value === 'boolean'
    )

    filteredEntries.map(([key, value]) => {
      return (booleanData[key] = value ? 'Não' : 'Sim')
    })

    const updatedData = { ...booleanData, id: state.id && state.id }

    updateRequeriment(updatedData)
    reset()
  }

  return (
    <ContainerUpdate>
      <MenuPage />
      <ContentRequeriment>
        <TitleText size="s">Atualizar Exigência</TitleText>
        <Button onClick={handleNavigateToHome}>Voltar ao Início</Button>

        <form onSubmit={handleSubmit(handleUpdateRequeriment)}>
          <TitleText size="s">Atualizar Lista</TitleText>
          <ContainerForm>
            <div id="institution-name">
              <Input
                placeholder="Nome da Instituição"
                type="text"
                value={state.nome_da_instituicao}
                {...register('nome_da_instituicao')}
              />
            </div>

            <div id="number-cnpj">
              <Input
                placeholder="Nº CNPJ"
                type="text"
                id="number-cnpj"
                value={state.cnpj}
                {...register('cnpj')}
                error={errors.cnpj?.message}
              />
            </div>

            <div id="name-of-representative">
              <Input
                placeholder="Nome do Representante"
                type="text"
                id="name-of-representative"
                {...register('nome_do_representante')}
              />
            </div>

            <div id="email">
              <Input
                placeholder="E-mail"
                type="text"
                id="email"
                value={state.email_do_representante}
                {...register('email_do_representante')}
                error={errors.email_do_representante?.message}
              />
            </div>

            <div id="phone">
              <Input
                placeholder="Telefone de contato"
                type="text"
                id="phone"
                value={state.telefone_contato}
                {...register('telefone_contato')}
              />
            </div>
          </ContainerForm>

          <UpdateControllerFormInputs register={register} />

          <Button type="submit" disabled={isSubmitting} buttonSubmit>
            Enviar Dados
          </Button>
        </form>
      </ContentRequeriment>
    </ContainerUpdate>
  )
}
