import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TablePagination,
} from '@mui/material'
import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { PaperPlaneTilt } from 'phosphor-react'
import React, { ChangeEvent, useState } from 'react'

import { useRequeriment } from '../../hooks/useRequeriment'
import { RequerimentListCompletedModal } from '../RequerimentListCompletedModal'
import {
  ListRequerimentTable,
  TableHeader2,
  TableContentList,
  TableRowContentList,
} from './style'

export const TableRequerimentCompleted = () => {
  const {
    dataListAssociation,
    dataInpuSearch,
    filteredDataConclutedRequeriment,
    sendMail,
  } = useRequeriment()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const listCompleted = dataListAssociation.filter((data) => {
    return (
      data.exigencias !== null &&
      data.exigencias?.estado_do_requerimento === 'Concluído'
    )
  })

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, listCompleted.length - page * rowsPerPage)

  return (
    <ListRequerimentTable>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeader2>Número de Protocolo</TableHeader2>
            <TableHeader2>Nome do Estabelecimento</TableHeader2>
            <TableHeader2>Nome do Representante</TableHeader2>
            <TableHeader2>Data do Requerimento</TableHeader2>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataInpuSearch.length > 0
            ? (rowsPerPage > 0
                ? filteredDataConclutedRequeriment.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredDataConclutedRequeriment
              ).map((data) => {
                return (
                  <TableRowContentList
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableContentList>
                      {data.numero_do_protocolo}
                    </TableContentList>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TableContentList>
                          {data.nome_da_instituicao}
                        </TableContentList>
                      </Dialog.Trigger>
                      <RequerimentListCompletedModal
                        idRequerimentSelected={data.id}
                        listCompleted={listCompleted}
                      />
                    </Dialog.Root>
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

                    <TableContentList onClick={() => sendMail(data.id)}>
                      <PaperPlaneTilt size={29} />
                    </TableContentList>
                  </TableRowContentList>
                )
              })
            : (rowsPerPage > 0
                ? listCompleted.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : listCompleted
              ).map((data) => {
                return (
                  <TableRowContentList
                    key={data.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableContentList>
                      {data.numero_do_protocolo}
                    </TableContentList>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TableContentList>
                          {data.nome_da_instituicao}
                        </TableContentList>
                      </Dialog.Trigger>
                      <RequerimentListCompletedModal
                        idRequerimentSelected={data.id}
                        listCompleted={listCompleted}
                      />
                    </Dialog.Root>
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

                    <TableContentList onClick={() => sendMail(data.id)}>
                      <PaperPlaneTilt size={29} />
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
          listCompleted
            ? listCompleted.length
            : filteredDataConclutedRequeriment.length
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
