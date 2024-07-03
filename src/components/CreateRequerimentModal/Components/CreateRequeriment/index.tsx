/* eslint-disable camelcase */
import { zodResolver } from '@hookform/resolvers/zod'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { Button, ControllerFormInputs, arrayInputList } from '../../..'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { useUser } from '../../../../hooks/useUser'
import { CreateAssociationPdfList } from '../../../CreateAssociationPdfLIst'
import { ButtonHome, SectionCreateRequirement } from './styled'

export const CreateRequerimentFormSchema = zod.object({
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
  informacao_divergente: zod.string().optional(),
})

export type CreateRequerimentFormInputs = zod.infer<
  typeof CreateRequerimentFormSchema
>

interface RequerimentProps {
  id: number
}

export const FormCreateRequeriment = ({ id }: RequerimentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateRequerimentFormInputs>({
    resolver: zodResolver(CreateRequerimentFormSchema),
    shouldUnregister: true,
  })

  const { CreateRequeriment, requestListDataPDF, dataListAssociation } =
    useRequeriment()
  const [requerimentSelected, setRequerimentSelected] = useState('Pendente')

  const RequerimentSelected = dataListAssociation.find((list) => list.id === id)

  console.log(RequerimentSelected)

  const { userDataLogin } = useUser()

  const handleSelectedRequeriment = (data: string) => {
    setRequerimentSelected(data)
  }

  const handleCreateRequeriment = async (data: CreateRequerimentFormInputs) => {
    const booleanData: Record<string, string> = {}
    const filteredEntries = Object.entries(data).filter(
      ([key, value]) => typeof value === 'boolean'
    )

    ;(requerimentSelected === 'Pendente' &&
      filteredEntries.map(([key, value]) => {
        return (booleanData[key] = value ? 'Pendente' : 'Não-Listado')
      })) ||
      (requerimentSelected === 'Concluído' &&
        filteredEntries.map(([key, value]) => {
          return (booleanData[key] = value ? 'Recebido' : 'Não-Listado')
        }))

    const { informacao_divergente } = data

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
      id,
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
      estado_do_requerimento:
        requerimentSelected === 'Pendente' ? 'Pendente' : 'Concluído',
    }

    CreateRequeriment(createRequerimentData)
    reset()
  }
  return (
    <SectionCreateRequirement>
      <form onSubmit={handleSubmit(handleCreateRequeriment)}>
        <ControllerFormInputs
          register={register}
          arrayInputList={arrayInputList}
          controllerUsageStatus="Created"
          handleSelectedRequeriment={handleSelectedRequeriment}
          requerimentSelected={requerimentSelected}
        />

        <div className="PdfContainer">
          <PDFDownloadLink
            document={
              <CreateAssociationPdfList
                data={requestListDataPDF || RequerimentSelected}
                dataUser={userDataLogin}
              />
            }
            fileName={`exigencia${
              requestListDataPDF?.numero_do_protocolo ||
              RequerimentSelected?.numero_do_protocolo
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
          Enviar Dados
        </Button>
      </form>
    </SectionCreateRequirement>
  )
}
