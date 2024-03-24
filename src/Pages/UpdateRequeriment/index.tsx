import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  arrayInputList,
  ControllerFormInputs,
  CreatePdfList,
  UpdateControllerFormInputs,
} from '../../components'
import { Button } from '../../components/Button'
import {
  CreateRequerimentFormInputs,
  createRequerimentFormSchema,
} from '../../components/CreateRequerimentModal/Components/CreateRequeriment'
import { Input } from '../../components/Input'
import { MenuPage } from '../../components/MenuPage'
import { TextRegular, TitleText } from '../../components/typography'
import { ListRequerimentProps } from '../../contexts/RequerimentContext'
import { useRequeriment } from '../../hooks/useRequeriment'
import { useUser } from '../../hooks/useUser'
import {
  ContainerAddRequerimento,
  ContainerForm,
  ContainerUpdate,
  ContentLink,
  ContentRequeriment,
  HeaderContent,
} from './styled'

export interface LocationProps {
  state: ListRequerimentProps
}

export function UpdateRequeriment() {
  const { state } = useLocation() as unknown as LocationProps
  const [addDataToListUpdate, setAddDataToListUpdate] = useState('')
  const { updateRequeriment, sendMail } = useRequeriment()
  const { userDataLogin } = useUser()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateRequerimentFormInputs>({
    resolver: zodResolver(createRequerimentFormSchema),
    defaultValues: {
      nome_da_instituicao: state.nome_da_instituicao,
      cnpj: state.cnpj,
      nome_do_representante: state.nome_do_representante,
      telefone_contato: state.telefone_contato,
      email_do_representante: state.email_do_representante,
    },
  })

  const navigate = useNavigate()

  const handleNavigateToHome = () => {
    navigate('/')
  }

  const handleUpdateRequeriment = (data: CreateRequerimentFormInputs) => {
    const booleanData: Record<string, string> = {}

    const filteredEntries = Object.entries(data).filter(
      ([key, value]) => typeof value === 'boolean'
    )

    filteredEntries.map(([key, value]) => {
      return (booleanData[key] = value ? 'Recebido' : 'Pendente')
    })

    const updatedData = { ...booleanData, id: state.id && state.id }

    updateRequeriment({ ...updatedData, handleListConcluted: false })

    reset()
  }

  const handleAddDatatoList = (data: string) => {
    setAddDataToListUpdate(data)
  }

  const handleSendMail = () => {
    const dataSendMail = state
    const { name, registration } = userDataLogin

    const ListSendMail = {
      ...dataSendMail,
      updateMail: true,
      name,
      registration,
    }

    sendMail(ListSendMail)
  }

  return (
    <ContainerUpdate>
      <MenuPage />
      <ContentRequeriment>
        <HeaderContent>
          <div>
            <TitleText size="s">Atualizar Exigência</TitleText>
            <TextRegular color="text" onClick={handleNavigateToHome}>
              Voltar ao Início
            </TextRegular>
          </div>
          <ContentLink>
            <PDFDownloadLink
              className="pdfLink"
              document={<CreatePdfList data={state} dataUser={userDataLogin} />}
              fileName="Exigência"
            >
              {({ loading }) => (loading ? 'Carregando PDF' : 'Imprimir')}
            </PDFDownloadLink>

            <TextRegular size="m" weight={600} onClick={handleSendMail}>
              Enviar E-mail
            </TextRegular>
          </ContentLink>
        </HeaderContent>

        <form onSubmit={handleSubmit(handleUpdateRequeriment)}>
          <TitleText size="s">Atualizar Lista</TitleText>
          <ContainerForm>
            <div id="institution-name">
              <Input
                placeholder="Nome da Instituição"
                type="text"
                {...register('nome_da_instituicao')}
              />
            </div>

            <div id="number-cnpj">
              <Input
                placeholder="Nº CNPJ"
                type="text"
                id="number-cnpj"
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
                {...register('email_do_representante')}
                error={errors.email_do_representante?.message}
              />
            </div>

            <div id="phone">
              <Input
                placeholder="Telefone de contato"
                type="text"
                id="phone"
                {...register('telefone_contato')}
              />
            </div>
          </ContainerForm>

          <UpdateControllerFormInputs register={register} />

          <ContainerAddRequerimento>
            <TextRegular weight={700}>
              Esqueceu algum Item? Deseja Adicionar-lo?
            </TextRegular>
            <div>
              <Button
                type="button"
                selectButton
                onClick={() => handleAddDatatoList('sim')}
                selected={addDataToListUpdate === 'sim' && true}
              >
                Sim
              </Button>
              <Button
                type="button"
                selectButton
                onClick={() => handleAddDatatoList('não')}
                selected={addDataToListUpdate === 'não' && true}
              >
                Não
              </Button>
            </div>
          </ContainerAddRequerimento>

          {addDataToListUpdate === 'sim' && (
            <ControllerFormInputs
              register={register}
              arrayInputList={arrayInputList}
              arrayUpdateInputList={state}
              controllerUsageStatus="Update"
            />
          )}

          <Button type="submit" disabled={isSubmitting} buttonSubmit>
            Atualizar Dados
          </Button>
        </form>
      </ContentRequeriment>
    </ContainerUpdate>
  )
}
