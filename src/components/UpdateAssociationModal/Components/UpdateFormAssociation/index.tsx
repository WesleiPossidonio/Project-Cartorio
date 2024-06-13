/* eslint-disable camelcase */
import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as zod from 'zod'

import { AssociationProps } from '../../../../contexts/RequerimentContext'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { useUser } from '../../../../hooks/useUser'
import { Button } from '../../../Button'
import {
  RadioBiutton,
  RadioIndicator,
  RadioItem,
} from '../../../CreateAssociationModal/components/CreateFormAssociation/styled'
import { CreateAssociationPdfList } from '../../../CreateAssociationPdfLIst'
import { Input } from '../../../Input'
import {
  ButtonHome,
  // ButtonCreateRequeriment,
  ContainerForm,
  SectionCreateRequirement,
} from './styled'

export const UpdateAssociationFormSchema = zod.object({
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
    .min(11, 'Por Favor, digite o numero de telefone corretamente')
    .max(11, 'Por Favor, digite o numero de telefone corretamente'),
  isCnpj: zod.string().nonempty(),
})

export type UpdateAssociationFormInputs = zod.infer<
  typeof UpdateAssociationFormSchema
>

interface FormUpdateAssociationProps {
  dataAssociation?: AssociationProps
}

export const FormUpdateAssociation = ({
  dataAssociation,
}: FormUpdateAssociationProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<UpdateAssociationFormInputs>({
    resolver: zodResolver(UpdateAssociationFormSchema),
    shouldUnregister: true,
  })
  const [selectedOption, setSelectedOption] = useState('')

  const { requestListDataPDF, handleUpdateAssociation } = useRequeriment()

  const { userDataLogin } = useUser()

  const handleAddAssociation = async (data: UpdateAssociationFormInputs) => {
    const {
      cnpj,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
      cpf,
      isCnpj,
    } = data

    const idAssociation = dataAssociation && dataAssociation.id

    if (idAssociation) {
      const updatedDataAssociation = {
        id: idAssociation,
        cnpj: cnpj && isCnpj === 'cnpj' ? cnpj : 'Não Selecionado',
        cpf: cpf && isCnpj === 'cpf' ? cpf : 'não selecionado',
        nome_da_instituicao,
        nome_do_representante,
        telefone_contato,
        email_do_representante,
      }

      handleUpdateAssociation(updatedDataAssociation)

      reset()
    }
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
              defaultValue={
                dataAssociation && dataAssociation.nome_da_instituicao
              }
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
                defaultValue={dataAssociation && dataAssociation.cnpj}
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
                defaultValue={dataAssociation && dataAssociation.cpf}
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
              defaultValue={
                dataAssociation && dataAssociation.nome_do_representante
              }
            />
          </div>

          <div id="email">
            <Input
              placeholder="E-mail"
              type="text"
              id="email"
              {...register('email_do_representante')}
              error={errors.email_do_representante?.message}
              defaultValue={
                dataAssociation && dataAssociation.email_do_representante
              }
            />
          </div>

          <div id="phone">
            <Input
              placeholder="Telefone de contato"
              type="text"
              id="phone"
              {...register('telefone_contato')}
              error={errors.telefone_contato?.message}
              defaultValue={dataAssociation && dataAssociation.telefone_contato}
            />
          </div>

          <div id="AboutRequeriment">
            <Input
              placeholder="Descreva o Serviço"
              type="text"
              id="AboutRequeriment"
              {...register('sobre_exigencia')}
              error={errors.sobre_exigencia?.message}
              defaultValue={dataAssociation && dataAssociation.sobre_exigencia}
            />
          </div>
        </ContainerForm>

        <div className="PdfContainer">
          <PDFDownloadLink
            document={
              <CreateAssociationPdfList
                data={requestListDataPDF || dataAssociation}
                dataUser={userDataLogin}
              />
            }
            fileName={`exigencia-${
              requestListDataPDF?.numero_do_protocolo ||
              dataAssociation?.numero_do_protocolo
            }.pdf`}
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
          Atualizar Dados
        </Button>
      </form>
    </SectionCreateRequirement>
  )
}
