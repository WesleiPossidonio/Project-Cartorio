import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import { Button, TextRegular, TitleText } from '../../../../components'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { ContainerButton, HeaderHome, SearchForm, SearchInput } from './styled'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export const HeaderContent = () => {
  const { filteredRequeriment } = useRequeriment()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const navigate = useNavigate()

  const handleNavigatePageListConcluted = () => {
    navigate('/lista-concluida')
  }

  const handleSearchRequeriment = async (data: SearchFormInputs) => {
    filteredRequeriment(data.query)
    reset()
  }

  return (
    <HeaderHome>
      <TitleText weight={600} color="title">
        Faça uma Exigencia
      </TitleText>

      <SearchForm onSubmit={handleSubmit(handleSearchRequeriment)}>
        <SearchInput
          type="text"
          placeholder="Pesquise.."
          {...register('query')}
        />
        <Button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          Buscar
        </Button>
      </SearchForm>

      <ContainerButton>
        <TextRegular
          size="m"
          color="blue"
          weight={600}
          onClick={handleNavigatePageListConcluted}
        >
          Exigências Concluídas
        </TextRegular>
      </ContainerButton>
    </HeaderHome>
  )
}
