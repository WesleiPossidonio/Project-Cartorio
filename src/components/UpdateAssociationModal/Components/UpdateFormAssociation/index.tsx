import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useForm, Controller } from 'react-hook-form'
import * as zod from 'zod'
import { useEffect, useState } from 'react'

import { AssociationProps } from '../../../../contexts/RequerimentContext'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { useUser } from '../../../../hooks/useUser'

import { Button } from '../../../Button'
import { CreateAssociationPdfList } from '../../../CreateAssociationPdfLIst'
import { formatCpfCnpj } from '../../../formatCpfCnpj'
import { Input } from '../../../Input'

import { ButtonHome, ContainerForm, SectionCreateRequirement } from './styled'

export const UpdateAssociationFormSchema = zod.object({
  nome_da_instituicao: zod.string().nonempty('Digite o nome da instituição'),
  nome_do_representante: zod.string().nonempty('Digite o nome do representante'),

  cnpj_cpf: zod
    .string()
    .min(11, 'CPF/CNPJ inválido')
    .max(18, 'CPF/CNPJ inválido'),

  sobre_exigencia: zod.string().min(4, 'Digite sobre o serviço'),

  email_do_representante: zod
    .string()
    .email('Digite um email válido'),

  telefone_contato: zod
    .string()
    .min(11, 'Telefone inválido')
    .max(11, 'Telefone inválido'),
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

  const { requestListDataPDF, handleUpdateAssociation } = useRequeriment()
  const { userDataLogin } = useUser()

  const [generatedPdf, setGeneratedPdf] = useState<AssociationProps | null>(null)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateAssociationFormInputs>({
    resolver: zodResolver(UpdateAssociationFormSchema),
  })

  // 🔹 Atualiza formulário quando dados da API chegam
  useEffect(() => {
    if (dataAssociation) {
      reset({
        nome_da_instituicao: dataAssociation.nome_da_instituicao,
        nome_do_representante: dataAssociation.nome_do_representante,
        cnpj_cpf: dataAssociation.cnpj_cpf,
        email_do_representante: dataAssociation.email_do_representante,
        telefone_contato: dataAssociation.telefone_contato,
        sobre_exigencia: dataAssociation.sobre_exigencia,
      })
    }
  }, [dataAssociation, reset])

  const handleAddAssociation = async (data: UpdateAssociationFormInputs) => {

    if (!dataAssociation?.id) return

    const updatedData = {
      id: dataAssociation.id,
      ...data,
    }

    await handleUpdateAssociation(updatedData)

    setGeneratedPdf(updatedData)
  }

  return (
    <SectionCreateRequirement>

      <form onSubmit={handleSubmit(handleAddAssociation)}>

        <ContainerForm>

          <Input
            placeholder="Nome da Instituição"
            {...register('nome_da_instituicao')}
            error={errors.nome_da_instituicao?.message}
          />

          <Controller
            name="cnpj_cpf"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="CPF/CNPJ"
                onChange={(e) =>
                  field.onChange(formatCpfCnpj(e.target.value))
                }
                error={errors.cnpj_cpf?.message}
              />
            )}
          />

          <Input
            placeholder="Nome do Representante"
            {...register('nome_do_representante')}
            error={errors.nome_do_representante?.message}
          />

          <Input
            placeholder="E-mail"
            {...register('email_do_representante')}
            error={errors.email_do_representante?.message}
          />

          <Input
            placeholder="Telefone"
            {...register('telefone_contato')}
            error={errors.telefone_contato?.message}
          />

          <Input
            placeholder="Descreva o Serviço"
            {...register('sobre_exigencia')}
            error={errors.sobre_exigencia?.message}
          />

        </ContainerForm>

        <div className="PdfContainer">
          <PDFDownloadLink
            document={
              <CreateAssociationPdfList
                data={generatedPdf || dataAssociation}
                dataUser={userDataLogin}
              />
            }
            fileName={`exigencia-${requestListDataPDF?.numero_do_protocolo ||
              dataAssociation?.numero_do_protocolo
              }.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <ButtonHome type="button">
                  Carregando PDF
                </ButtonHome>
              ) : (
                <ButtonHome type="button">
                  Imprimir
                </ButtonHome>
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