import { Info, NotePencil } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ListRequerimentProps } from '../../contexts/RequerimentContext'
import { useRequeriment } from '../../hooks/useRequeriment'
import api from '../../services/api'
import { Button } from '../Button'
import { CreateRequerimentFormInputs } from '../CreateRequerimentModal/Components/CreateRequeriment'
import { TextRegular } from '../typography'
import { UpdateRequerimentFormInputs } from '../UpdateRequerimentModal'
import {
  ContainerInput,
  ContainerCheckInput,
  ContainerControllerInput,
  ContentInput,
  LabelCheck,
  ContainerButtonInfo,
  TextArea,
  ContentInfo,
  ContainerInfo,
  TextAreaObservations,
  DivergenteInfoContainer,
  SelectedStateInfoDivergente,
} from './styled'

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
  register,
  arrayUpdateInputList,
  handleSelectedRequeriment,
  requerimentSelected,
}: ControllerProps) => {
  const [divergentInformation, setDivergentInformation] = useState('')
  const [selectedItems, setSelectedItems] = useState<SelectedItemsProps[]>([])

  const { setDataListRequeriment, dataListRequeriment } = useRequeriment()

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    const { name, checked } = event.target

    setSelectedItems((prevSelectedItems) => {
      const existingItem = prevSelectedItems.find((item) => item.id === itemId)

      if (!existingItem) {
        return [...prevSelectedItems, { id: itemId, name, checked }]
      }

      return prevSelectedItems.map((item) =>
        item.id === itemId ? { ...item, checked } : item
      )
    })
  }

  const handleAddingForgotteData = async (nameList: string) => {
    const ForgotteDataList = {
      ...arrayUpdateInputList,
      [nameList]: 'Pendente',
      exigencias_id: arrayUpdateInputList?.id,
    }

    if (arrayUpdateInputList) {
      try {
        const createRequermentResponse = await toast.promise(
          api.put(
            `updateRequeriment/${arrayUpdateInputList.id}`,
            ForgotteDataList
          ),
          {
            pending: 'Verificando seus dados',
            success: 'Exigência Adicionada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )

        const { data } = createRequermentResponse
        setDataListRequeriment([...dataListRequeriment, data])
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDivergentInformation = (data: string) => {
    setDivergentInformation(data)
  }

  const unselectedRequestsFilter =
    arrayInputList &&
    arrayInputList.filter(
      (list) =>
        arrayUpdateInputList &&
        Object.entries(arrayUpdateInputList).some(
          ([name, value]) => value === 'Não-Listado' && name === list.name
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
        {(requerimentSelected === 'Pendente' && (
          <TextRegular size="l" weight={700}>
            Selecione os Documentos Pendentes
          </TextRegular>
        )) ||
          (requerimentSelected === 'Concluído' && (
            <TextRegular size="l" weight={700}>
              Selecione os Documentos Concluídos
            </TextRegular>
          ))}
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
                      {list.spanText && <span> {list.spanText} </span>}
                    </div>
                  </LabelCheck>
                  {list.observation && (
                    <ContainerInfo>
                      <input
                        type="checkbox"
                        id={list.observation}
                        onChange={(e) => handleChange(e, list.id)}
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
                    ></TextAreaObservations>
                  ) : null
                )}
              </ContainerInput>
            ))
            : unselectedRequestsFilter.map((list) => (
              <ContainerInput key={list.id}>
                <div>
                  <input
                    onClick={() => handleAddingForgotteData(list.name)}
                    id={list.id}
                    type="checkbox"
                    {...register(
                      list.name as keyof UpdateRequerimentFormInputs
                    )}
                    name={list.name}
                  />
                  <LabelCheck htmlFor={list.id}>
                    <NotePencil size={30} />
                    <div>
                      {list.text}
                      {list.spanText && <span> {list.spanText} </span>}
                    </div>
                  </LabelCheck>
                  {list.observation && (
                    <ContainerInfo>
                      <input
                        type="checkbox"
                        id={list.observation}
                        onChange={(e) => handleChange(e, list.id)}
                        name={list.observation}
                      />
                      <ContentInfo htmlFor={list.observation}>
                        <Info size={32} id="info" />
                      </ContentInfo>
                    </ContainerInfo>
                  )}
                </div>
              </ContainerInput>
            ))}
        </ContainerCheckInput>

        <ContainerButtonInfo>
          <TextRegular weight={700}>
            Adicionar Exigências Não Listadas?
          </TextRegular>
          <div>
            <Button
              selected={divergentInformation === 'sim'}
              selectButton
              type="button"
              onClick={() => handleDivergentInformation('sim')}
            >
              Sim
            </Button>
            <Button
              selected={divergentInformation === 'não'}
              selectButton
              type="button"
              onClick={() => handleDivergentInformation('não')}
            >
              Não
            </Button>
          </div>
        </ContainerButtonInfo>

        {divergentInformation === 'sim' && (
          <DivergenteInfoContainer>
            <TextArea
              id="list"
              placeholder="Digite as Informações Divergentes"
              {...register('informacao_divergente.info')}
            />

            <SelectedStateInfoDivergente {...register('informacao_divergente.state')}>
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
            </SelectedStateInfoDivergente>
          </DivergenteInfoContainer>
        )}
      </ContentInput>
    </ContainerControllerInput>
  )
}

export default ControllerFormInputs
