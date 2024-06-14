/* eslint-disable camelcase */
import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as zod from 'zod'

import { Button, Input } from '../../..'
import { AssociationProps } from '../../../../contexts/RequerimentContext'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { useUser } from '../../../../hooks/useUser'
import { CreateAssociationPdfList } from '../../../CreateAssociationPdfLIst'
import {
  ButtonHome,
  ContainerForm,
  RadioBiutton,
  RadioIndicator,
  RadioItem,
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
    .max(18, 'Por Favor, digite o CNPJ valido')
    .optional(),
  cpf: zod
    .string()
    .min(11, 'Por Favor, digite o CPF valido')
    .max(11, 'Por Favor, digite o CPF valido')
    .optional(),
  sobre_exigencia: zod.string().min(4, 'Digite sobre o serviço'),
  email_do_representante: zod
    .string()
    .email('Por favor digite um email válido'),
  telefone_contato: zod
    .string()
    .min(11, 'Por Favor, digite o numero de telefone corretamente'),
  isCnpj: zod.string().nonempty(),
})

export type CreateAssociationFormInputs = zod.infer<
  typeof createAssociationFormSchema
>

export const FormCreateAssociation = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateAssociationFormInputs>({
    resolver: zodResolver(createAssociationFormSchema),
    shouldUnregister: true,
  })

  const [selectedOption, setSelectedOption] = useState('')
  const [dataAssociation, setDataAssociatio] = useState<AssociationProps>()

  const { requestListDataPDF, handleCreateAssociation } = useRequeriment()

  const { userDataLogin } = useUser()

  const handleAddAssociation = async (data: CreateAssociationFormInputs) => {
    const {
      cnpj,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
      sobre_exigencia,
      cpf,
      isCnpj,
    } = data

    const dataAssociation = {
      cnpj: cnpj && isCnpj === 'cnpj' ? cnpj : 'Não Selecionado',
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
      sobre_exigencia,
      cpf: cpf && isCnpj === 'cpf' ? cpf : 'não selecionado',
    }

    await handleCreateAssociation(dataAssociation)
    setDataAssociatio(dataAssociation)
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

          <Controller
            name="isCnpj"
            control={control}
            render={({ field }) => {
              const stringValue = field.value
              setSelectedOption(field.value)
              return (
                <RadioItem
                  id="radio-input"
                  onValueChange={field.onChange}
                  value={stringValue}
                >
                  <RadioBiutton value="cnpj">
                    <RadioIndicator />
                  </RadioBiutton>
                  <label htmlFor="cnpj">CNPJ</label>

                  <RadioBiutton value="cpf">
                    <RadioIndicator />
                  </RadioBiutton>
                  <label htmlFor="cpf">CPF</label>
                </RadioItem>
              )
            }}
          />

          {selectedOption === 'cnpj' && (
            <div id="number-cnpj">
              <Input
                placeholder="Digite nº CNPJ"
                type="text"
                id="number-cnpj"
                {...register('cnpj')}
                error={errors.cnpj?.message}
              />
            </div>
          )}
          {selectedOption === 'cpf' && (
            <div id="number-cnpj">
              <Input
                placeholder="Digite nº CPF"
                type="text"
                id="number-cnpj"
                {...register('cpf')}
                error={errors.cpf?.message}
              />
            </div>
          )}

          <div id="name-of-representative">
            <Input
              placeholder="Nome do Representante"
              type="text"
              id="name-of-representative"
              {...register('nome_do_representante')}
              error={errors.nome_do_representante?.message}
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
              type="tel"
              id="phone"
              {...register('telefone_contato')}
              error={errors.telefone_contato?.message}
            />
          </div>
          <div id="AboutRequeriment">
            <Input
              placeholder="Descreva o Serviço"
              type="text"
              id="AboutRequeriment"
              {...register('sobre_exigencia')}
              error={errors.sobre_exigencia?.message}
            />
          </div>
        </ContainerForm>

        <div className="PdfContainer">
          <PDFDownloadLink
            document={
              <CreateAssociationPdfList
                data={dataAssociation}
                dataUser={userDataLogin}
              />
            }
            fileName={`exigencia${requestListDataPDF?.numero_do_protocolo}.pdf`}
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
