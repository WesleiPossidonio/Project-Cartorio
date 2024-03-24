import { NotePencil } from 'phosphor-react'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { ListRequerimentProps } from '../../contexts/RequerimentContext'
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
  TextArea,
} from './styled'

interface StateInputListProps {
  id: string
  name: string
  text: string
  spanText?: string
}

interface ControllerProps {
  register: UseFormRegister<CreateRequerimentFormInputs>
  arrayInputList: StateInputListProps[]
  arrayUpdateInputList?: ListRequerimentProps
  controllerUsageStatus: 'Created' | 'Update'
}

export const ControllerFormInputs = (props: ControllerProps) => {
  const [divergentInformation, setDivergentInformation] = useState('')

  const handleDivergentInformation = (data: string) => {
    setDivergentInformation(data)
  }

  const unselectedRequestsfilter =
    props.arrayInputList &&
    props.arrayInputList.filter(
      (list) =>
        props.arrayUpdateInputList &&
        Object.entries(props.arrayUpdateInputList).some(
          ([name, value]) => value === 'Não Listado' && name === list.name
        )
    )

  return (
    <ContainerControllerInput>
      <ContentInput>
        {props.controllerUsageStatus === 'Created'
          ? props.arrayInputList.map((list, index) => {
              return (
                <ContainerCheckInput key={list.id}>
                  <ContainerInput>
                    <input
                      id={list.id}
                      type="checkbox"
                      {...props.register(
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
                  </ContainerInput>
                </ContainerCheckInput>
              )
            })
          : unselectedRequestsfilter.map((list, index) => {
              return (
                <ContainerCheckInput key={list.id}>
                  <ContainerInput>
                    <input
                      id={list.id}
                      type="checkbox"
                      {...props.register(
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
                  </ContainerInput>
                </ContainerCheckInput>
              )
            })}

        <ContainerButtonInfo>
          <TextRegular weight={700}>
            Há alguma informação divergente?
          </TextRegular>
          <div>
            <Button
              selected={divergentInformation === 'sim' && true}
              selectButton
              type="button"
              onClick={() => handleDivergentInformation('sim')}
            >
              Sim
            </Button>
            <Button
              selected={divergentInformation === 'não' && true}
              selectButton
              type="button"
              onClick={() => handleDivergentInformation('não')}
            >
              Não
            </Button>
          </div>
        </ContainerButtonInfo>

        {divergentInformation === 'sim' && (
          <TextArea
            id="list"
            placeholder="Digite as Informações Divergentes"
            {...props.register('informacao_divergente')}
            name="informacao_divergente"
          />
        )}
      </ContentInput>
    </ContainerControllerInput>
  )
}
