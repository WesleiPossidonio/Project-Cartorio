
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

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

import { 
  CreateRequerimentFormInputs, 
  CreateRequerimentFormSchema 
} from '../CreateRequerimentModal/Components/CreateRequeriment'
interface RequerimentProps {
  AssociationId: number
}

export const UpdateRequerimentModal = ({
  AssociationId,
}: RequerimentProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateRequerimentFormInputs>({
    resolver: zodResolver(CreateRequerimentFormSchema),
    shouldUnregister: true,
  })

  const {
    updateRequeriment,
    dataListPendingRequirements
  } = useRequeriment()
  const [addDataToListUpdate, setAddDataToListUpdate] = useState('')
  const dataRequerimentSelected = 
  dataListPendingRequirements.find(list => 
    list.exigencia?.exigencias_id === AssociationId)

  const handleUpdateRequeriment = (
    data: CreateRequerimentFormInputs,
  ) => {
    const booleanData: Record<string, string> = {}
  
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        booleanData[key] = value ? 'Recebido' : 'Pendente'
      }
    })

    const normalizedUnlistedRequirements = (
      data.unlisted_requirements.length > 0
        ? data.unlisted_requirements
        : [{ name: undefined, observacao: undefined }]
    ) as unknown as [{
      name?: string
      atatus?: string
      observacao?: string
    }]
  
    const updatedData = {
      ...booleanData,
      id: dataRequerimentSelected?.id,
      exigencias_id: AssociationId,
      unlisted_requirements: normalizedUnlistedRequirements
    }
  
    updateRequeriment({
      ...updatedData,
      handleListConcluted: false,
    })
  
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
              dataRequeriment={dataRequerimentSelected?.exigencia}
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
                  selected={addDataToListUpdate === 'sim'}
                >
                  Sim
                </Button>

                <Button
                  type="button"
                  selectButton
                  onClick={() => setAddDataToListUpdate('não')}
                  selected={addDataToListUpdate === 'não'}
                >
                  Não
                </Button>
              </div>
            </ContainerAddRequeriment>

            {addDataToListUpdate === 'sim' && (
              <ControllerFormInputs
                control={control}
                register={register}
                arrayInputList={arrayInputList}
                arrayUpdateInputList={dataRequerimentSelected?.exigencia}
                controllerUsageStatus="Update"
              />
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              buttonSubmit
            >
              Atualizar Dados
            </Button>
          </form>
        </ContentRequeriment>
      </Content>
    </Dialog.Portal>
  )
}

