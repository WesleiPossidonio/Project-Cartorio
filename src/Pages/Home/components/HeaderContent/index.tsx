import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import React, { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import { useRequeriment } from '../../../../hooks/useRequeriment'
import { HeaderHome, SearchForm, SearchInput, Selected } from './styled'
import { Button, TitleText } from '../../../../components'
import { useUser } from '../../../../hooks/useUser'

interface HeaderContentProps {
  formTable: string
  setFormTable: (data: string) => void
  title: string
  page?: string
}

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export const HeaderContent = ({
  formTable,
  setFormTable,
  title,
  page
}: HeaderContentProps) => {
  const { searchFunction } = useRequeriment()
  const { getAllUsers } = useUser()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const handleFilteredTable = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormTable(event.target.value)
  }


  const handleSearchForm = async (data: SearchFormInputs) => {
    const filteredList = {
      query: data.query,
      formTable,
    }
    
    if(page === 'Usuários'){
     getAllUsers(1, data.query)
     reset()
    }

    searchFunction(filteredList)
    if (!data.query) return
    reset()
  }

  return (
    <HeaderHome>
      <TitleText weight={600} color="title">
        {title}
      </TitleText>

      <SearchForm onSubmit={handleSubmit(handleSearchForm)}>
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

      {
        page === 'Requeriments' && (
          <Selected value={formTable} onChange={handleFilteredTable}>
            <option value="" disabled>
              Filtro
            </option>
    
            <option value="Listas-Instancias">
              Exame
            </option>
    
            <option value="Listas-Exigências">
              Exigências
            </option>
    
            <option value="Exigências-Concluídas">
              Exigências Concluídas
            </option>
          </Selected>
        )
      }

      
    </HeaderHome>
  )
}
