import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
} from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ListChecks } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRequeriment } from '../../hooks/useRequeriment'
import {
  ListRequerimentTable,
  TableHeader2,
  TableContentList,
  TableRowContentList,
} from './style'

export const TableRequeriment = () => {
  const {
    dataListRequeriment,
    dataInpuSearch,
    filteredDataRequeriment,
    updateRequeriment,
  } = useRequeriment()

  const navigate = useNavigate()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const pendingList = dataListRequeriment.filter((list) => {
    return list.estado_do_requerimento === 'Pendente'
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSelectAList = (id: number) => {
    const curatedList = pendingList.filter((data) => data.id === id)

    const listSelected = Object.fromEntries(
      curatedList.map((item, index) => [`objeto${index + 1}`, item])
    )

    navigate('/atualizar-lista', {
      state: listSelected.objeto1,
    })
  }

  const handleCompletedList = (id: number) => {
    const listSelected = dataListRequeriment.find((list) => {
      return list.id === id
    })

    const listConcluted = { ...listSelected, handleListConcluted: true }

    console.log(listConcluted)

    updateRequeriment(listConcluted)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, pendingList.length - page * rowsPerPage)

  return (
    <ListRequerimentTable>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeader2>Número de Protocolo</TableHeader2>
            <TableHeader2>Nome do Estabelecimento</TableHeader2>
            <TableHeader2>Nome do Representante</TableHeader2>
            <TableHeader2>Data do Requerimento</TableHeader2>
            <TableHeader2>Estado do Requerimento</TableHeader2>
            <TableHeader2>Concluir</TableHeader2>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataInpuSearch.length > 0
            ? (rowsPerPage > 0
                ? filteredDataRequeriment.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredDataRequeriment
              ).map((data) => {
                return (
                  <TableRowContentList
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableContentList>
                      {data.numero_do_protocolo}
                    </TableContentList>
                    <TableContentList
                      onClick={() => data.id && handleSelectAList(data.id)}
                    >
                      {data.nome_da_instituicao}
                    </TableContentList>
                    <TableContentList>
                      {data.nome_do_representante}
                    </TableContentList>
                    <TableContentList>
                      {data.updatedAt &&
                        formatDistanceToNow(new Date(data.updatedAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                    </TableContentList>
                    <TableContentList>
                      {data.estado_do_requerimento}
                    </TableContentList>
                    <TableContentList>
                      <ListChecks
                        className="Icon"
                        size={32}
                        onClick={() => data.id && handleCompletedList(data.id)}
                      />
                    </TableContentList>
                  </TableRowContentList>
                )
              })
            : (rowsPerPage > 0
                ? pendingList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : pendingList
              ).map((data) => {
                return (
                  <TableRowContentList
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableContentList>
                      {data.numero_do_protocolo}
                    </TableContentList>
                    <TableContentList
                      onClick={() => data.id && handleSelectAList(data.id)}
                    >
                      {data.nome_da_instituicao}
                    </TableContentList>
                    <TableContentList>
                      {data.nome_do_representante}
                    </TableContentList>
                    <TableContentList>
                      {data.updatedAt &&
                        formatDistanceToNow(new Date(data.updatedAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                    </TableContentList>
                    <TableContentList>
                      {data.estado_do_requerimento}
                    </TableContentList>
                    <TableContentList>
                      <ListChecks
                        className="Icon"
                        size={32}
                        onClick={() => data.id && handleCompletedList(data.id)}
                      />
                    </TableContentList>
                  </TableRowContentList>
                )
              })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={
          pendingList ? pendingList.length : filteredDataRequeriment.length
        }
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Itens por página:"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ListRequerimentTable>
  )
}
