/* eslint-disable camelcase */
import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import {
  Button,
  ControllerFormInputs,
  CreatePdfList,
  Input,
  MenuPage,
  TitleText,
  arrayInputList,
} from '../../components'
import { useRequeriment } from '../../hooks/useRequeriment'
import { useUser } from '../../hooks/useUser'
import {
  // ButtonCreateRequeriment,
  ContainerForm,
  ContentRequeriment,
  SectionCreateRequirement,
} from './styled'

export const createRequerimentFormSchema = zod.object({
  nome_da_instituicao: zod
    .string()
    .nonempty('Por favor, digite o nome da instituição'),
  nome_do_representante: zod
    .string()
    .nonempty('Por favor, digite o nome do representante'),
  cnpj: zod
    .string()
    .min(14, 'Por Favor, digite o CNPJ valido')
    .max(14, 'Por Favor, digite o CNPJ valido'),
  email_do_representante: zod
    .string()
    .email('Por favor digite um email válido'),
  telefone_contato: zod.string().min(11).max(11),
  declaracao_sindical: zod.boolean().optional(),
  lista_e_edital: zod.boolean().optional().optional(),
  assinatura_do_advogado: zod.boolean().optional(),
  declaracao_criminal: zod.boolean().optional(),
  declaracao_de_desimpedimento: zod.boolean().optional(),
  livro_rasao: zod.boolean().optional(),
  ppe: zod.boolean().optional(),
  requisitos_estatuto: zod.boolean().optional(),
  dissolucao_ou_exticao: zod.boolean().optional(),
  fundacoes: zod.boolean().optional(),
  reconhecimento_de_firma: zod.boolean().optional(),
  preechimento_completo: zod.boolean().optional(),
  oab: zod.boolean().optional(),
  documentacao_de_identificacao: zod.boolean().optional(),
  requisitos_de_estatutos_fundadores: zod.boolean().optional(),
  requisitos_criacao_de_estatuto: zod.boolean().optional(),
  // campo_de_assinatura: zod.string(),
  // retificacao_de_redacao: zod.string(),
  // informacao_divergente: zod.string(),
  // quais_informacoes_divergentes: zod.string(),
})

export type CreateRequerimentFormInputs = zod.infer<
  typeof createRequerimentFormSchema
>

export const FormCreateRequeriment = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateRequerimentFormInputs>({
    resolver: zodResolver(createRequerimentFormSchema),
    shouldUnregister: true,
  })

  const { CreateRequeriment, requestListDataPDF } = useRequeriment()

  const navigate = useNavigate()

  const { userDataLogin } = useUser()

  const handleNavigateToHome = () => {
    navigate('/')
  }

  const handleCreateRequeriment = async (data: CreateRequerimentFormInputs) => {
    console.log(requestListDataPDF)
    const booleanData: Record<string, string> = {}
    const filteredEntries = Object.entries(data).filter(
      ([key, value]) => typeof value === 'boolean'
    )

    filteredEntries.map(([key, value]) => {
      return (booleanData[key] = value ? 'Sim' : 'Não')
    })

    const {
      cnpj,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
    } = data

    const {
      declaracao_sindical,
      lista_e_edital,
      assinatura_do_advogado,
      declaracao_criminal,
      declaracao_de_desimpedimento,
      livro_rasao,
      ppe,
      requisitos_estatuto,
      dissolucao_ou_exticao,
      fundacoes,
      reconhecimento_de_firma,
      preechimento_completo,
      oab,
      documentacao_de_identificacao,
    } = booleanData

    const createRequerimentData = {
      cnpj,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
      declaracao_sindical,
      lista_e_edital,
      assinatura_do_advogado,
      declaracao_criminal,
      declaracao_de_desimpedimento,
      livro_rasao,
      ppe,
      requisitos_estatuto,
      dissolucao_ou_exticao,
      fundacoes,
      reconhecimento_de_firma,
      preechimento_completo,
      oab,
      documentacao_de_identificacao,
      estado_do_requerimento: 'Pendente',
    }

    CreateRequeriment(createRequerimentData)

    reset()
  }

  return (
    <SectionCreateRequirement>
      <MenuPage />
      <ContentRequeriment>
        <TitleText size="s">Adicionar Exigência</TitleText>
        <Button onClick={handleNavigateToHome}>Voltar ao Início</Button>

        <form onSubmit={handleSubmit(handleCreateRequeriment)}>
          <TitleText size="s">Criar Exigência</TitleText>
          <ContainerForm>
            <div id="institution-name">
              <Input
                placeholder="Nome da Instituição"
                type="text"
                {...register('nome_da_instituicao')}
                error={errors.nome_da_instituicao?.message}
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
                error={errors.telefone_contato?.message}
              />
            </div>
          </ContainerForm>

          <ControllerFormInputs
            register={register}
            arrayInputList={arrayInputList}
          />

          <Button type="submit" disabled={isSubmitting} buttonSubmit>
            Enviar Dados
          </Button>
        </form>
        <PDFDownloadLink
          document={
            <CreatePdfList data={requestListDataPDF} dataUser={userDataLogin} />
          }
          fileName="exigencia.pdf"
        >
          {({ loading }) =>
            loading ? (
              <Button>Carregando PDF</Button>
            ) : (
              <Button>Imprimir</Button>
            )
          }
        </PDFDownloadLink>
      </ContentRequeriment>
    </SectionCreateRequirement>
  )
}
