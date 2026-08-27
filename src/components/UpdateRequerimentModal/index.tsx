
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
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

import { ListRequerimentProps } from '../../@types/typesRequerimentContest'
import { CreateRequerimentFormInputs, CreateRequerimentFormSchema } from '../CreateRequerimentModal/Components/CreateRequeriment'
import api from '../../services/api'

interface RequerimentProps {
  AssociationId: number
}

export const UpdateRequerimentModal = ({
  AssociationId,
}: RequerimentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateRequerimentFormInputs>({
    resolver: zodResolver(CreateRequerimentFormSchema),
    shouldUnregister: true,
  })

  const {
    updateRequeriment,
  } = useRequeriment()

  const [dataRequerimentSelected, setDataRequerimentSelected] =
    useState<ListRequerimentProps>()

  const [addDataToListUpdate, setAddDataToListUpdate] = useState('')

  useEffect(() => {
    const getRequeriment = async () => {
      try {
        const { data } = await api.get(
          `association/${AssociationId}`
        )
  
        setDataRequerimentSelected(data.exigencia)
      } catch (error) {
        console.error(error)
      }
    }
  getRequeriment()
  }, [AssociationId])

  const handleUpdateRequeriment = (
    data: CreateRequerimentFormInputs,
  ) => {
    const booleanData: Record<string, string> = {}
  
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        booleanData[key] = value ? 'Recebido' : 'Pendente'
      }
    })
  
    const informacaoDivergente =
      data.informacao_divergente?.info &&
      data.informacao_divergente?.state
        ? {
            info: data.informacao_divergente.info,
            state: data.informacao_divergente.state,
          }
        : undefined
  
    const updatedData = {
      ...booleanData,
      id: dataRequerimentSelected?.id,
      exigencias_id: AssociationId,
      informacao_divergente: informacaoDivergente,
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
                register={register}
                arrayInputList={arrayInputList}
                arrayUpdateInputList={dataRequerimentSelected}
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

