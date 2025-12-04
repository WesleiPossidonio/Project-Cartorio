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
import { ListChecks, PaperPlaneTilt } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'

import { useRequeriment } from '../../hooks/useRequeriment'
import { UpdateAssociationModal } from '../UpdateAssociationModal'
import { UpdateRequerimentModal } from '../UpdateRequerimentModal'
import {
  ListRequerimentTable,
  TableHeader2,
  TableContentList,
  TableRowContentList,
} from './style'

export const TableRequeriment = () => {
  const {
    dataListAssociation,
    dataInpuSearch,
    filteredDataSearchRequeriment,
    sendMail,
  } = useRequeriment()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const pendingListRequeriment = dataListAssociation.filter((list) => {
    return list.exigencias !== null && list.exigencias?.estado_do_requerimento === 'Pendente'
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
    Math.min(rowsPerPage, pendingListRequeriment.length - page * rowsPerPage)

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
            <TableHeader2>{''}</TableHeader2>
            <TableHeader2>{''}</TableHeader2>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataInpuSearch.length > 0
            ? (rowsPerPage >= 0
              ? filteredDataSearchRequeriment.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : filteredDataSearchRequeriment
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
                    {data.updatedAt &&
                      formatDistanceToNow(new Date(data.updatedAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                  </TableContentList>
                  <TableContentList>
                    {data.exigencias?.estado_do_requerimento}
                  </TableContentList>

                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <TableContentList>
                        <ListChecks className="Icon" size={32} />
                      </TableContentList>
                    </Dialog.Trigger>
                    <UpdateRequerimentModal AssociationId={data.id} />
                  </Dialog.Root>

                  <TableContentList onClick={() => sendMail(data.id)}>
                    <PaperPlaneTilt size={29} />
                  </TableContentList>
                </TableRowContentList>
              )
            })
            : (rowsPerPage >= 0
              ? pendingListRequeriment.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : pendingListRequeriment
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
                    {data.updatedAt &&
                      formatDistanceToNow(new Date(data.updatedAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                  </TableContentList>

                  <TableContentList>
                    {data.exigencias?.estado_do_requerimento}
                  </TableContentList>

                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <TableContentList>
                        <ListChecks className="Icon" size={32} />
                      </TableContentList>
                    </Dialog.Trigger>
                    <UpdateRequerimentModal AssociationId={data.id} />
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
          pendingListRequeriment
            ? pendingListRequeriment.length
            : filteredDataSearchRequeriment.length
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
