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
import { FilePlus, PaperPlaneTilt } from 'phosphor-react'
import { ChangeEvent, useEffect, useState } from 'react'

import { UpdateAssociationProps } from '../../contexts/RequerimentContext'
import { useRequeriment } from '../../hooks/useRequeriment'
import { CreateRequerimentModal } from '../CreateRequerimentModal'
import { UpdateAssociationModal } from '../UpdateAssociationModal'
import {
  ListRequerimentTable,
  TableHeader2,
  TableContentList,
  TableRowContentList,
} from './style'

export const TableAssociation = () => {
  const {
    dataListAssociation,
    filteredDataSearchAssociations,
    dataInpuSearch,
    sendMail,
  } = useRequeriment()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pendingList, setPendingList] = useState<UpdateAssociationProps[]>([])

  useEffect(() => {
    const filteredPendingList = dataListAssociation.filter((list) => {
      return list.exigencias === null
    })
    setPendingList(filteredPendingList)
  }, [dataListAssociation])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, pendingList.length - page * rowsPerPage)

  return (
    <ListRequerimentTable>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeader2>Nº de Protocolo</TableHeader2>
            <TableHeader2>Nome do Estabelecimento</TableHeader2>
            <TableHeader2>Nome do Representante</TableHeader2>
            <TableHeader2>Data do Exâme</TableHeader2>
            <TableHeader2>{''}</TableHeader2>
            <TableHeader2>{''}</TableHeader2>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataInpuSearch.length > 0
            ? (rowsPerPage > 0
                ? filteredDataSearchAssociations.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredDataSearchAssociations
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
                      <UpdateAssociationModal AssociationId={data.id} />
                    </Dialog.Root>

                    <TableContentList>
                      {data.nome_do_representante}
                    </TableContentList>

                    <TableContentList>
                      {data.createdAt &&
                        formatDistanceToNow(new Date(data.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                    </TableContentList>

                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TableContentList>
                          <FilePlus size={32} />
                        </TableContentList>
                      </Dialog.Trigger>
                      <CreateRequerimentModal AssociationId={data.id} />
                    </Dialog.Root>

                    <TableContentList onClick={() => sendMail(data.id)}>
                      <PaperPlaneTilt size={29} />
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

                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TableContentList>
                          {data.nome_da_instituicao}
                        </TableContentList>
                      </Dialog.Trigger>
                      <UpdateAssociationModal AssociationId={data.id} />
                    </Dialog.Root>

                    <TableContentList>
                      {data.nome_do_representante}
                    </TableContentList>
                    <TableContentList>
                      {data.createdAt &&
                        formatDistanceToNow(new Date(data.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                    </TableContentList>

                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <TableContentList>
                          <FilePlus size={32} />
                        </TableContentList>
                      </Dialog.Trigger>
                      <CreateRequerimentModal AssociationId={data.id} />
                    </Dialog.Root>

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
          pendingList
            ? pendingList.length
            : filteredDataSearchAssociations.length
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
