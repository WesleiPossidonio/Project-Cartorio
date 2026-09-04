
import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useForm, Controller } from 'react-hook-form'
import * as zod from 'zod'

import { useRequeriment } from '../../../../hooks/useRequeriment'
import { useUser } from '../../../../hooks/useUser'
import { CreateAssociationPdfList } from '../../../CreateAssociationPdfLIst'
import { formatCpfCnpj } from '../../../formatCpfCnpj'
import { ButtonHome, ContainerForm, SectionCreateRequirement } from './styled'
import { Input } from '../../../Input'
import { Button } from '../../../Button'

export const createAssociationFormSchema = zod.object({
  data_da_recepcao: zod.string().nonempty('Por favor, digite a data'),
  nome_da_instituicao: zod
    .string()
    .nonempty('Por favor, digite o nome da instituição'),
  nome_do_representante: zod
    .string()
    .nonempty('Por favor, digite o nome do representante'),
  cnpj_cpf: zod
  .string({
    required_error: 'CPF/CNPJ é obrigatório.',
  })
  .refine((doc) => {
    const numbers = doc.replace(/\D/g, '')

    return numbers.length === 11 || numbers.length === 14
  }, 'Digite um CPF com 11 números ou um CNPJ com 14 números.')
  .refine((doc) => {
    const numbers = doc.replace(/\D/g, '')

    return /^\d+$/.test(numbers)
  }, 'CPF/CNPJ deve conter apenas números.'),
  sobre_exigencia: zod.string().min(4, 'Digite sobre o serviço'),
  email_do_representante: zod
    .string()
    .email('Por favor digite um email válido'),
  telefone_contato: zod
    .string()
    .min(11, 'Por Favor, digite o numero de telefone corretamente'),
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
    defaultValues: {
      cnpj_cpf: '',
    },
  })

  const { requestListDataPDF, handleCreateAssociation } = useRequeriment()

  const { userDataLogin } = useUser()

  const handleAddAssociation = async (data: CreateAssociationFormInputs) => {
    const {
      cnpj_cpf,
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
      sobre_exigencia,
      data_da_recepcao
    } = data

    const dataAssociation = {
      cnpj_cpf: cnpj_cpf.replace(/\D/g, ''),
      nome_da_instituicao,
      nome_do_representante,
      telefone_contato,
      email_do_representante,
      sobre_exigencia,
      data_da_recepcao
    }

    await handleCreateAssociation(dataAssociation)
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

          <div id="data-da-recepção">
            <Input
              placeholder="Data da recepção"
              type="date"
              {...register('data_da_recepcao')}
              error={errors.data_da_recepcao?.message}
            />
          </div>

          <Controller
            name="cnpj_cpf"
            control={control}
            render={({ field: { onChange, ...props } }) => {
              return (
                <Input
                  onChange={(e) => {
                    const { value } = e.target
                    e.target.value = formatCpfCnpj(value)
                    onChange(e)
                  }}
                  placeholder="CPF/CNPJ"
                  {...props}
                  id="number-cnpj"
                  error={errors.cnpj_cpf?.message}
                />
              )
            }}
          />

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
           {requestListDataPDF && (
             <PDFDownloadLink
               document={
                 <CreateAssociationPdfList
                   data={requestListDataPDF}
                   dataUser={userDataLogin}
                 />
               }
               fileName={`exigencia${requestListDataPDF.nome_da_instituicao}.pdf`}
             >
              <ButtonHome>Imprimir</ButtonHome>
             </PDFDownloadLink>
           )}
          </div>

        <Button type="submit" disabled={isSubmitting} buttonSubmit>
          Enviar Dados
        </Button>
      </form>
    </SectionCreateRequirement>
  )
}
