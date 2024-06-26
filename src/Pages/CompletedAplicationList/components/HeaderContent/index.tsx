import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import { TextRegular, TitleText } from '../../../../components/typography'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import {
  ButtonHeader,
  ContainerButton,
  HeaderHome,
  SearchForm,
  SearchInput,
} from './styled'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export const HeaderContent = () => {
  const { filteredRequerimentConcluted } = useRequeriment()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const navigate = useNavigate()

  const handleNavigatePage = () => {
    navigate('/')
  }

  const handleSearchRequeriment = async (data: SearchFormInputs) => {
    filteredRequerimentConcluted(data.query)
    reset()
  }

  return (
    <HeaderHome>
      <TitleText weight={600} color="title">
        Exigências Concluídas
      </TitleText>

      <SearchForm onSubmit={handleSubmit(handleSearchRequeriment)}>
        <SearchInput
          type="text"
          placeholder="Pesquise.."
          {...register('query')}
        />
        <ButtonHeader type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          Buscar
        </ButtonHeader>
      </SearchForm>

      <ContainerButton>
        <TextRegular
          size="m"
          weight={600}
          color="blue"
          onClick={handleNavigatePage}
        >
          Voltar ao Início
        </TextRegular>
      </ContainerButton>
    </HeaderHome>
  )
}
