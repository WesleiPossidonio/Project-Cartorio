import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import React, { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import { Button, TitleText } from '../../../../components'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import { HeaderHome, SearchForm, SearchInput, Selected } from './styled'

interface HeaderContentProps {
  formTable: string
  setFormTable: (data: string) => void
}

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export const HeaderContent = ({
  formTable,
  setFormTable,
}: HeaderContentProps) => {
  const { filteredRequeriment } = useRequeriment()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const handleFilteredTable = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormTable(event.target.value)
  }

  const handleSearchRequeriment = async (data: SearchFormInputs) => {
    const filteredList = {
      query: data.query,
      formTable,
    }

    filteredRequeriment(filteredList)
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

      <Selected value={formTable} onChange={handleFilteredTable}>
        <option value="">Filtro</option>
        <option value="Listas-Instancias">Exâme</option>
        <option value="Listas-Exigências">Exigências</option>
        <option value="Exigências-Concluídas">Exigências Concluídas</option>
      </Selected>
    </HeaderHome>
  )
}
