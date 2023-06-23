import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle, MagnifyingGlass, PlusCircle } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import { TitleText } from '../../../../components/typography'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import {
  ButtonHeader,
  ButtonUpContent,
  ButtonUpContentCreate,
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
        <ButtonHeader type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          Buscar
        </ButtonHeader>
      </SearchForm>

      <ContainerButton>
        <ButtonUpContentCreate onClick={handleNavigatePage}>
          <PlusCircle size={30} /> Criar Exigencia
        </ButtonUpContentCreate>
        <ButtonUpContent onClick={handleNavigatePageListConcluted}>
          <CheckCircle size={30} />
          Concluídos
        </ButtonUpContent>
      </ContainerButton>
    </HeaderHome>
  )
}
