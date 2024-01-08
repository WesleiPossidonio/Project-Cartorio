import { NotePencil } from 'phosphor-react'
import { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { CreateRequerimentFormInputs } from '../../Pages/CreateRequeriment'
import {
  ContainerInput,
  ContainerCheckInput,
  ContainerControllerInput,
  ContentInput,
  LabelCheck,
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
  const [divergentInformation, setDivergentInformation] =
    useState<Boolean>(false)

  const handleDivergentInformation = () => {
    setDivergentInformation(!divergentInformation)
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

        <ContainerCheckInput>
          <ContainerInput>
            <input
              id="list"
              type="checkbox"
              {...register('informacao_divergente')}
              name="informacao_divergente"
              onClick={handleDivergentInformation}
            />

            <LabelCheck htmlFor="list">
              <NotePencil size={40} />
              <div>Há informações divergentes</div>
            </LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>
      </ContentInput>
    </ContainerControllerInput>
  )
}
