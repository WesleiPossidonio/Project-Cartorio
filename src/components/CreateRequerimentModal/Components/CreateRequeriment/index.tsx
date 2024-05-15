/* eslint-disable camelcase */
import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { useState } from 'react'

import {
  Button,
  ControllerFormInputs,
  CreatePdfList,
  Input,
  arrayInputList,
} from '../../..'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { useUser } from '../../../../hooks/useUser'
import {
  ButtonHome,
  // ButtonCreateRequeriment,
  ContainerForm,
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
    .min(18, 'Por Favor, digite o CNPJ valido')
    .max(18, 'Por Favor, digite o CNPJ valido'),
  email_do_representante: zod
    .string()
    .email('Por favor digite um email válido'),
  telefone_contato: zod
    .string()
    .min(11, 'Por Favor, digite o numero de telefone corretamente'),
  // .max(11, 'Por Favor, digite o numero de telefone corretamente'),
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
  campo_de_assinatura: zod.boolean().optional(),
  retificacao_de_redacao: zod.boolean().optional(),
  existe_exigencias_nao_listadas: zod.boolean().optional(),
  primeira_exigencia_nao_listada: zod.string().optional(),
  estado_da_primeira_exigencia_nao_listada: zod.boolean().optional(),
  segunda_exigencia: zod.string().optional(),
  estado_da_segunda_exigencia_nao_listada: zod.boolean().optional(),
  terceira_exigencia_nao_listada: zod.string().optional(),
  estado_da_terceira_exigencia_nao_listada: zod.boolean().optional(),
  quarta_exigencia_nao_listada: zod.string().optional(),
  estado_da_quarta_exigencia_nao_listada: zod.boolean().optional(),
  quinta_exigencia_nao_listada: zod.string().optional(),
  estado_da_quinta_exigencia_nao_listada: zod.boolean().optional(),
  informacao_divergente: zod.string().optional(),
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
  const [dataInfoDivergente, setDataInfoDivergente] = useState('')

  const { userDataLogin } = useUser()

  const handleCreateRequeriment = async (data: CreateRequerimentFormInputs) => {
    const booleanData: Record<string, string> = {}
    const filteredEntries = Object.entries(data).filter(
      ([key, value]) => typeof value === 'boolean'
    )

    filteredEntries.map(([key, value]) => {
      return (booleanData[key] = value ? 'Pendente' : 'Não Listado')
    })

    const {
      cnpj,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
      informacao_divergente,
    } = data

    setDataInfoDivergente(informacao_divergente)

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
      requisitos_criacao_de_estatuto,
      requisitos_de_estatutos_fundadores,
      campo_de_assinatura,
      retificacao_de_redacao,
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
      requisitos_criacao_de_estatuto,
      requisitos_de_estatutos_fundadores,
      campo_de_assinatura,
      retificacao_de_redacao,
      informacao_divergente:
        informacao_divergente !== undefined
          ? informacao_divergente
          : 'Não há informações divergente',
      estado_do_requerimento: 'Pendente',
    }

    CreateRequeriment(createRequerimentData)

    reset()
  }
  return (
    <SectionCreateRequirement>
      <form onSubmit={handleSubmit(handleCreateRequeriment)}>
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
          controllerUsageStatus="Created"
        />

        <div className="PdfContainer">
          <PDFDownloadLink
            document={
              <CreatePdfList
                data={requestListDataPDF}
                dataUser={userDataLogin}
                infoDivergente={dataInfoDivergente}
              />
            }
            fileName="exigencia.pdf"
          >
            {({ loading }) =>
              loading ? (
                <ButtonHome type="button">Carregando PDF</ButtonHome>
              ) : (
                <ButtonHome type="button">Imprimir</ButtonHome>
              )
            }
          </PDFDownloadLink>
        </div>

        <Button type="submit" disabled={isSubmitting} buttonSubmit>
          Enviar Dados
        </Button>
      </form>
    </SectionCreateRequirement>
  )
}
