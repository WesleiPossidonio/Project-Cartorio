import { NotePencil } from 'phosphor-react'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { CreateRequerimentFormInputs } from '../../Pages/CreateRequeriment'
import { Button } from '../Button'
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
}

export const ControllerFormInputs = ({
  register,
  arrayInputList,
}: ControllerProps) => {
  const [divergentInformation, setDivergentInformation] = useState('')

  const handleDivergentInformation = (data: string) => {
    setDivergentInformation(data)
  }

  return (
    <ContainerControllerInput>
      <ContentInput>
        {arrayInputList.map((list, index) => {
          return (
            <ContainerCheckInput key={list.id}>
              <ContainerInput>
                <input
                  id={list.id}
                  type="checkbox"
                  {...register(list.name as keyof CreateRequerimentFormInputs)}
                  name={list.name}
                />

                <LabelCheck htmlFor={list.id}>
                  <NotePencil size={40} />
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
            {...register('informacao_divergente')}
            name="informacao_divergente"
          />
        )}
      </ContentInput>
    </ContainerControllerInput>
  )
}
