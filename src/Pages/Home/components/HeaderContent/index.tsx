import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, MagnifyingGlass } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import { Button, TitleText } from '../../../../components'
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
        <Button onClick={handleNavigatePageListConcluted}>
          <CheckCircle size={30} />
          Exigências Concluídas
        </Button>
      </ContainerButton>
    </HeaderHome>
  )
}
