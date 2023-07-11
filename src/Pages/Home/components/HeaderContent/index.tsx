import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, MagnifyingGlass, PlusCircle } from 'phosphor-react'
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

  const handleNavigatePage = () => {
    navigate('/criar-exigencia')
  }

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
        <Button onClick={handleNavigatePage}>
          <PlusCircle size={30} /> Criar Exigencia
        </Button>
        <Button onClick={handleNavigatePageListConcluted}>
          <CheckCircle size={30} />
          Concluídos
        </Button>
      </ContainerButton>
    </HeaderHome>
  )
}
