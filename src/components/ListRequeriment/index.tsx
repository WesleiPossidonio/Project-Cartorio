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

import {
  ListChecks,
  PaperPlaneTilt,
  Printer,
} from 'phosphor-react'

import { useRequeriment } from '../../hooks/useRequeriment'

import { UpdateAssociationModal } from '../UpdateAssociationModal'
import { UpdateRequerimentModal } from '../UpdateRequerimentModal'
import { CreatePdfList } from '../CreatePdfLIst'

import { useUser } from '../../hooks/useUser'

import { pdf } from '@react-pdf/renderer'

import { AssociationProps } from '../../@types/typesRequerimentContest'

import {
  ListRequerimentTable,
  TableHeader2,
  TableContentList,
  TableRowContentList,
} from './style'

export const TableRequeriment = () => {
  const {
    paginationPendingRequirements,
    currentPagePendingRequirements,
    setCurrentPagePendingRequirements,
    dataListPendingRequirements,
    sendMail,
  } = useRequeriment()

  const { userDataLogin } = useUser()

  const page = currentPagePendingRequirements - 1
  const rowsPerPage = 10

  const handleChangePage = (
    _event: unknown,
    newPage: number,
  ) => {
    setCurrentPagePendingRequirements(newPage + 1)
  }

  const printRequeriment = async (
    data: AssociationProps,
  ) => {
    const dataList = {
      data,
      dataUser: userDataLogin,
    }

    const blob = await pdf(
      <CreatePdfList
        data={dataList.data}
        dataUser={dataList.dataUser}
      />,
    ).toBlob()

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url
    link.download = 'requerimento.pdf'

    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <ListRequerimentTable>
      <Table
        aria-label="simple table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableHeader2>
              Número de Protocolo
            </TableHeader2>

            <TableHeader2>
              Nome do Estabelecimento
            </TableHeader2>

            <TableHeader2>
              Nome do Representante
            </TableHeader2>

            <TableHeader2>
              Data do Requerimento
            </TableHeader2>

            <TableHeader2>
              Estado do Requerimento
            </TableHeader2>

            <TableHeader2>
              {''}
            </TableHeader2>

            <TableHeader2>
              {''}
            </TableHeader2>

            <TableHeader2>
              {''}
            </TableHeader2>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataListPendingRequirements.map(
            (data) => {
              return (
                <TableRowContentList
                  key={data.id}
                  sx={{
                    '&:last-child td, &:last-child th': {
                      border: 0,
                    },
                  }}
                >
                  {/* Número do protocolo */}
                  <TableContentList>
                    {data.numero_do_protocolo}
                  </TableContentList>

                  {/* Nome da instituição */}
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <TableContentList>
                        {data.nome_da_instituicao}
                      </TableContentList>
                    </Dialog.Trigger>

                    <UpdateAssociationModal
                      AssociationId={data.id}
                    />
                  </Dialog.Root>

                  {/* Representante */}
                  <TableContentList>
                    {data.nome_do_representante}
                  </TableContentList>

                  {/* Data */}
                  <TableContentList>
                    {data.updatedAt &&
                      formatDistanceToNow(
                        new Date(data.updatedAt),
                        {
                          addSuffix: true,
                          locale: ptBR,
                        },
                      )}
                  </TableContentList>

                  {/* Status */}
                  <TableContentList>
                    {data.exigencia
                      ?.estado_do_requerimento ??
                      'Pendente'}
                  </TableContentList>

                  {/* Imprimir */}
                  <TableContentList
                    onClick={() =>
                      printRequeriment(data)
                    }
                  >
                    <Printer size={32} />
                  </TableContentList>

                  {/* Editar requerimento */}
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <TableContentList>
                        <ListChecks
                          className="Icon"
                          size={32}
                        />
                      </TableContentList>
                    </Dialog.Trigger>

                    <UpdateRequerimentModal
                      AssociationId={data.id}
                    />
                  </Dialog.Root>

                  {/* Enviar e-mail */}
                  <TableContentList
                    onClick={() =>
                      sendMail(data.id)
                    }
                  >
                    <PaperPlaneTilt size={29} />
                  </TableContentList>
                </TableRowContentList>
              )
            },
          )}

          {/* Espaço quando não existem registros suficientes */}
          {dataListPendingRequirements.length ===
            0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                align="center"
              >
                Nenhum registro encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={paginationPendingRequirements.total}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Itens por página:"
        page={page}
        onPageChange={handleChangePage}
        showFirstButton
        showLastButton
      />
    </ListRequerimentTable>
  )
}