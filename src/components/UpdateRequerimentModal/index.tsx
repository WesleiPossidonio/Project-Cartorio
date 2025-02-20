import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { ListRequerimentProps } from '../../contexts/RequerimentContext'
import { useRequeriment } from '../../hooks/useRequeriment'
import { arrayInputList } from '../ArrayInputList'
import { Button } from '../Button'
import { ControllerFormInputs } from '../ControllerFormInputs'
import { TextRegular } from '../typography'
import { UpdateControllerFormInputs } from './Components/UpdateControllerFormInputs'
import {
  CloseButton,
  ContainerAddRequeriment,
  Content,
  ContentRequeriment,
  Overlay,
} from './style'

export const UpdateRequerimentFormSchema = zod.object({
  declaracao_sindical: zod.boolean().optional(),
  assinatura_do_advogado: zod.boolean().optional(),
  declaracao_criminal: zod.boolean().optional(),
  requisitos_estatuto: zod.boolean().optional(),
  declaracao_de_desimpedimento: zod.boolean().optional(),
  livro_rasao: zod.boolean().optional(),
  ppe: zod.boolean().optional(),
  dissolucao_ou_exticao: zod.boolean().optional(),
  fundacoes: zod.boolean().optional(),
  reconhecimento_de_firma: zod.boolean().optional(),
  preechimento_completo: zod.boolean().optional(),
  oab: zod.boolean().optional(),
  documentacao_de_identificacao: zod.boolean().optional(),
  requisitos_de_estatutos_fundadores: zod.boolean().optional(),
  requisitos_criacao_de_estatuto: zod.boolean().optional(),
  lista_e_edital: zod.boolean().optional().optional(),
  retificacao_de_redacao: zod.boolean().optional(),
  campo_de_assinatura: zod.boolean().optional(),
  existe_exigencias_nao_listadas: zod.boolean().optional(),
  informacao_divergente: zod.object({ info: zod.string(), state: zod.string() }).optional(),
})

export type UpdateRequerimentFormInputs = zod.infer<
  typeof UpdateRequerimentFormSchema
>

interface RequerimentProps {
  AssociationId: number
}

export const UpdateRequerimentModal = ({ AssociationId }: RequerimentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateRequerimentFormInputs>({
    resolver: zodResolver(UpdateRequerimentFormSchema),
    shouldUnregister: true,
  })
  const { dataListAssociation, updateRequeriment } = useRequeriment()
  const [dataRequerimentSelected, setDataRequerimentSelected] =
    useState<ListRequerimentProps>()
  const [addDataToListUpdate, setAddDataToListUpdate] = useState('')

  useEffect(() => {
    const filteredRequerimentSelected = dataListAssociation.find(
      (list) => list.exigencias?.id === AssociationId
    )

    setDataRequerimentSelected(
      filteredRequerimentSelected?.exigencias &&
      filteredRequerimentSelected.exigencias
    )
  }, [AssociationId, dataListAssociation])

  const handleUpdateRequeriment = (data: UpdateRequerimentFormInputs) => {
    const booleanData: Record<string, string> = {}

    const filteredEntries = Object.entries(data).filter(
      ([, value]) => typeof value === 'boolean'
    )

    filteredEntries.map(([key, value]) => {
      return (booleanData[key] = value ? 'Recebido' : 'Pendente')
    })

    const updatedData = { ...booleanData, id: dataRequerimentSelected?.id }

    updateRequeriment({ ...updatedData, handleListConcluted: false })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Atualizar Exigências</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <ContentRequeriment>
          <form onSubmit={handleSubmit(handleUpdateRequeriment)}>
            <UpdateControllerFormInputs
              register={register}
              dataRequeriment={dataRequerimentSelected}
            />

            <ContainerAddRequeriment>
              <TextRegular weight={700}>
                Esqueceu algum Item? Deseja Adicionar-lo?
              </TextRegular>
              <div>
                <Button
                  type="button"
                  selectButton
                  onClick={() => setAddDataToListUpdate('sim')}
                  selected={addDataToListUpdate === 'sim' && true}
                >
                  Sim
                </Button>
                <Button
                  type="button"
                  selectButton
                  onClick={() => setAddDataToListUpdate('não')}
                  selected={addDataToListUpdate === 'não' && true}
                >
                  Não
                </Button>
              </div>
            </ContainerAddRequeriment>

            {addDataToListUpdate === 'sim' && (
              <ControllerFormInputs
                register={register}
                arrayInputList={arrayInputList}
                arrayUpdateInputList={dataRequerimentSelected}
                controllerUsageStatus="Update"
              />
            )}

            <Button type="submit" disabled={isSubmitting} buttonSubmit>
              Atualizar Dados
            </Button>
          </form>
        </ContentRequeriment>
      </Content>
    </Dialog.Portal>
  )
}
