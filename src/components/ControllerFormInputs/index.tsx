
import { Info, NotePencil, Trash } from 'phosphor-react'

import { ChangeEvent, useState } from 'react'

import {
  Control,
  useFieldArray,
  useWatch,
  UseFormRegister,
} from 'react-hook-form'

import { toast } from 'react-toastify'
import { useRequeriment } from '../../hooks/useRequeriment'
import api from '../../services/api'

import { Button } from '../Button'
import { CreateRequerimentFormInputs } from '../CreateRequerimentModal/Components/CreateRequeriment'
import { TextRegular } from '../typography'

import {
  ContainerInput,
  ContainerCheckInput,
  ContainerControllerInput,
  ContentInput,
  LabelCheck,
  ContainerButtonInfo,
  ContentInfo,
  ContainerInfo,
  TextAreaObservations,
  ContainerUnlistedRequirements,
  ContainerButtonInfoUpdate,
} from './styled'

import {
  AssociationProps,
  ListRequerimentProps,
} from '../../@types/typesRequerimentContext'

interface StateInputListProps {
  id: string
  name: string
  text: string
  spanText?: string
  observation?: string
}

type SelectedItemsProps = {
  id: string
  name: string
  checked: boolean
}

interface ControllerProps {
  register: UseFormRegister<CreateRequerimentFormInputs>
  control: Control<CreateRequerimentFormInputs>
  arrayInputList: StateInputListProps[]
  arrayUpdateInputList?: ListRequerimentProps
  controllerUsageStatus: 'Created' | 'Update'
  handleSelectedRequeriment?: (data: string) => void
  requerimentSelected?: string
  conclutedRequeriment?: boolean
}

export const ControllerFormInputs = ({
  arrayInputList,
  controllerUsageStatus,
  control,
  register,
  arrayUpdateInputList,
  handleSelectedRequeriment,
  requerimentSelected,
  
}: ControllerProps) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItemsProps[]>([])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'unlisted_requirements',
  })

  const {
    setDataListPendingRequirements,
    dataListPendingRequirements,
  } = useRequeriment()

  /**
   * Observa os valores das exigências não listadas.
   */
  const unlistedRequirements = useWatch({
    control,
    name: 'unlisted_requirements',
  })

  /**
   * Observa todos os valores do formulário.
   *
   * Isso permite pegar a observação digitada no textarea
   * antes de enviar o PATCH.
   */
  const formValues = useWatch({
    control,
  })

  /**
   * Controla a abertura/fechamento da observação.
   */
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const { name, checked } = event.target

    setSelectedItems((prevSelectedItems) => {
      const existingItem = prevSelectedItems.find(
        (item) => item.id === itemId
      )

      if (!existingItem) {
        return [
          ...prevSelectedItems,
          {
            id: itemId,
            name,
            checked,
          },
        ]
      }

      return prevSelectedItems.map((item) =>
        item.id === itemId
          ? {
            ...item,
            checked,
          }
          : item
      )
    })
  }

  /**
   * Atualiza uma exigência que estava como "Não-Listado"
   * para "Pendente".
   *
   * Essa função continua sendo chamada quando o usuário
   * clica diretamente na exigência.
   */
  const handleUpdateRequirementStatus = async (
    nameList: string
  ) => {
    if (!arrayUpdateInputList) return

    try {
      const updateRequerimentResponse = await toast.promise(
        api.patch(
          `updateRequeriment/${arrayUpdateInputList.id}`,
          {
            [nameList]: 'Pendente',
            exigencias_id: arrayUpdateInputList.exigencias_id,
          }
        ),
        {
          pending: 'Verificando seus dados',
          success: 'Exigência Adicionada com Sucesso!',
          error: 'Ops! Verifique os Dados Digitados',
        }
      )

      const { data } = updateRequerimentResponse

      setDataListPendingRequirements(
        dataListPendingRequirements.map(
          (item: AssociationProps) =>
            item.exigencia?.id === data.id
              ? {
                ...item,
                exigencia: data,
              }
              : item
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Atualiza uma exigência já existente enviando:
   *
   * - status = Pendente
   * - observação
   * - exigencias_id
   *
   * Tudo em um único PATCH.
   */
  const handleUpdateRequirementWithObservation = async (
    list: StateInputListProps
  ) => {
    if (!arrayUpdateInputList) return

    if (!list.observation) {
      await handleUpdateRequirementStatus(list.name)
      return
    }

    const observationValue =
      formValues[
        list.observation as keyof CreateRequerimentFormInputs
      ]

    try {
      const updateRequerimentResponse = await toast.promise(
        api.patch(
          `updateRequeriment/${arrayUpdateInputList.id}`,
          {
            [list.name]: 'Pendente',
            [list.observation]: observationValue ?? '',
            exigencias_id: arrayUpdateInputList.exigencias_id,
          }
        ),
        {
          pending: 'Atualizando exigência...',
          success: 'Exigência atualizada com sucesso!',
          error: 'Erro ao atualizar exigência.',
        }
      )

      const { data } = updateRequerimentResponse

      /**
       * A API já retorna a exigência completa,
       * incluindo unlisted_requirements.
       */
      setDataListPendingRequirements(
        dataListPendingRequirements.map(
          (item: AssociationProps) =>
            item.exigencia?.id === data.id
              ? {
                ...item,
                exigencia: data,
              }
              : item
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Cria UMA exigência não listada.
   */
const handleCreateUnlistedRequirement = async (
  index: number,
  requirementId?: number
) => {
  const requirement = unlistedRequirements?.[index]

  if (requirementId === undefined) {
    toast.warning('Não foi possível identificar a exigência.')
    return
  }

  if (!requirement?.name?.trim()) {
    toast.warning('Informe o nome da exigência')
    return
  }

  try {
    const response = await toast.promise(
      api.post('unlisted-requirements', {
        name: requirement.name,
        observacao: requirement.observacao,
        status: 'Pendente',
        requirement_id: requirementId,
      }),
      {
        pending: 'Adicionando exigência...',
        success: 'Exigência adicionada com sucesso!',
        error: 'Erro ao adicionar exigência.',
      }
    )

    const { data: createdRequirement } = response

    setDataListPendingRequirements((prev) =>
      prev.map((association) => {
        if (association.exigencia?.id !== requirementId) {
          return association
        }

        return {
          ...association,
          exigencia: {
            ...association.exigencia,
            unlisted_requirements: [
              ...(association.exigencia.unlisted_requirements ?? []),
              createdRequirement.data,
            ],
          },
        }
      })
    )

    remove(index)
  } catch (error) {
    console.log(error)
  }
}

  const unselectedRequestsFilter =
    arrayInputList &&
    arrayInputList.filter(
      (list) =>
        arrayUpdateInputList &&
        Object.entries(arrayUpdateInputList).some(
          ([name, value]) =>
            value === 'Não-Listado' && name === list.name
        )
    )

  return (
    <ContainerControllerInput>
      {controllerUsageStatus === 'Created' && (
        <ContainerButtonInfo>
          <TextRegular size="m" weight={700}>
            A exigência foi Concluída?
          </TextRegular>

          <div>
            <Button
              selected={requerimentSelected === 'Concluído'}
              selectButton
              type="button"
              onClick={() =>
                handleSelectedRequeriment &&
                handleSelectedRequeriment('Concluído')
              }
            >
              Sim
            </Button>

            <Button
              selected={requerimentSelected === 'Pendente'}
              selectButton
              type="button"
              onClick={() =>
                handleSelectedRequeriment &&
                handleSelectedRequeriment('Pendente')
              }
            >
              Não
            </Button>
          </div>
        </ContainerButtonInfo>
      )}

      <ContentInput>
        {requerimentSelected === 'Pendente' && (
          <TextRegular size="l" weight={700}>
            Selecione os Documentos Pendentes
          </TextRegular>
        )}

        {requerimentSelected === 'Concluído' && (
          <TextRegular size="l" weight={700}>
            Selecione os Documentos Concluídos
          </TextRegular>
        )}

        <ContainerCheckInput>
          {controllerUsageStatus === 'Created'
            ? arrayInputList.map((list) => (
              <ContainerInput key={list.id}>
                <div>
                  <input
                    id={list.id}
                    type="checkbox"
                    {...register(
                      list.name as keyof CreateRequerimentFormInputs
                    )}
                    name={list.name}
                  />
                  

                  <LabelCheck htmlFor={list.id}>
                    <NotePencil size={30} />

                    <div>
                      {list.text}

                      {list.spanText && (
                        <span> {list.spanText} </span>
                      )}
                    </div>
                  </LabelCheck>

                  {list.observation && (
                    
                    <ContainerInfo>
                      <input
                        type="checkbox"
                        id={list.observation}
                        onChange={(e) =>
                          handleChange(e, list.id)
                        }
                        name={list.observation}
                      />

                      <ContentInfo htmlFor={list.observation}>
                        <Info size={32} id="info" />
                      </ContentInfo>
                    </ContainerInfo>
                  )}
                </div>

                {selectedItems.map((item) =>
                  item.checked &&
                    item.id === list.id &&
                    item.name === list.observation ? (
                    <TextAreaObservations
                      key={list.id}
                      placeholder="Escreva a observação do documento"
                      {...register(
                        list.observation as keyof CreateRequerimentFormInputs
                      )}
                    />
                  ) : null
                )}
              </ContainerInput>
            ))
            : unselectedRequestsFilter.map((list) => (
              <ContainerInput key={list.id}>
                <div>
                  <input
                    onClick={() =>
                      handleUpdateRequirementStatus(list.name)
                    }
                    id={list.id}
                    type="checkbox"
                    {...register(
                      list.name as keyof CreateRequerimentFormInputs
                    )}
                    name={list.name}
                  />

                  <LabelCheck htmlFor={list.id}>
                    <NotePencil size={30} />

                    <div>
                      {list.text}

                      {list.spanText && (
                        <span> {list.spanText} </span>
                      )}
                    </div>
                  </LabelCheck>

                  {list.observation && (
                    <ContainerInfo>
                      <input
                        type="checkbox"
                        id={list.observation}
                        onChange={(e) =>
                          handleChange(e, list.id)
                        }
                        name={list.observation}
                      />

                      <ContentInfo htmlFor={list.observation}>
                        <Info size={32} id="info" />
                      </ContentInfo>
                    </ContainerInfo>
                  )}
                </div>

                {selectedItems.map((item) =>
                  item.checked &&
                    item.id === list.id &&
                    item.name === list.observation ? (
                    <ContainerButtonInfoUpdate
                      key={list.id}
                    >
                      <TextAreaObservations
                        placeholder="Escreva a observação do documento"
                        {...register(
                          list.observation as keyof CreateRequerimentFormInputs
                        )}
                      />

                      <Button
                        type="button"
                        onClick={() =>
                          handleUpdateRequirementWithObservation(
                            list
                          )
                        }
                      >
                        Enviar
                      </Button>
                    </ContainerButtonInfoUpdate>
                  ) : null
                )}
              </ContainerInput>
            ))}
        </ContainerCheckInput>

        <ContainerButtonInfo>
          <TextRegular size="l" weight={700}>
            Adicionar Exigências Não Listadas?
          </TextRegular>

          {fields.map((field, index) => (
            <ContainerUnlistedRequirements key={field.id}>
              <input
                {...register(
                  `unlisted_requirements.${index}.name`
                )}
                placeholder="Exigência"
              />

              <input
                {...register(
                  `unlisted_requirements.${index}.observacao`
                )}
                placeholder="Observação da Exigência"
              />

              {controllerUsageStatus === 'Update' && (
                <Button
                  type="button"
                  onClick={() =>
                    handleCreateUnlistedRequirement(
                      index,
                      arrayUpdateInputList!.id
                    )
                  }
                >
                  Enviar
                </Button>
              )}

              <button
                id="delete"
                type="button"
                onClick={() => remove(index)}
              >
                <Trash size={32} />
              </button>
            </ContainerUnlistedRequirements>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                name: '',
                observacao: '',
                status: 'Pendente',
              })
            }
          >
            Adicionar exigência
          </Button>
        </ContainerButtonInfo>
      </ContentInput>
    </ContainerControllerInput>
  )
}

export default ControllerFormInputs

