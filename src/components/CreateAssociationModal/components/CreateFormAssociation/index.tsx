/* eslint-disable camelcase */
import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { Button, CreateRequerimentPdfList, Input } from '../../..'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { useUser } from '../../../../hooks/useUser'
import {
  ButtonHome,
  // ButtonCreateRequeriment,
  ContainerForm,
  SectionCreateRequirement,
} from './styled'

export const createAssociationFormSchema = zod.object({
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
})

export type CreateAssociationFormInputs = zod.infer<
  typeof createAssociationFormSchema
>

export const FormCreateAssociation = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateAssociationFormInputs>({
    resolver: zodResolver(createAssociationFormSchema),
    shouldUnregister: true,
  })

  const { requestListDataPDF, handleCreateAssociation } = useRequeriment()

  const { userDataLogin } = useUser()

  const handleAddAssociation = async (data: CreateAssociationFormInputs) => {
    const {
      cnpj,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
    } = data

    const dataAssociation = {
      cnpj,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
    }

    handleCreateAssociation(dataAssociation)

    reset()
  }
  return (
    <SectionCreateRequirement>
      <form onSubmit={handleSubmit(handleAddAssociation)}>
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

        <div className="PdfContainer">
          <PDFDownloadLink
            document={
              <CreateRequerimentPdfList
                data={requestListDataPDF}
                dataUser={userDataLogin}
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
