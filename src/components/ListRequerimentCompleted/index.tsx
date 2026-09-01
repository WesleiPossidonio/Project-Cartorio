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
import { ArrowBendLeftDown, PaperPlaneTilt } from 'phosphor-react'
import { useRequeriment } from '../../hooks/useRequeriment'
import { RequerimentListCompletedModal } from '../RequerimentListCompletedModal'
import {
  ListRequerimentTable,
  TableHeader2,
  TableContentList,
  TableRowContentList,
} from './style'
import { AssociationProps } from '../../@types/typesRequerimentContext'

export const TableRequerimentCompleted = () => {
  const {
    dataListCompletedAssociations,
    paginationCompletedAssociations,
    currentPageCompletedAssociations,
    setCurrentPageCompletedAssociations,
    sendMail,
    handleUpdateStatus,
  } = useRequeriment()

  const handleChangePage = (
    _event: unknown,
    newPage: number,
  ) => {
    setCurrentPageCompletedAssociations(
      newPage + 1,
    )
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = parseInt(
      event.target.value,
      10,
    )


    console.log(
      'Novo limite solicitado:',
      newRowsPerPage,
    )

    setCurrentPageCompletedAssociations(1)
  }

  const handleUpdateStatusForm = (
    data: AssociationProps,
  ) => {
    const requirementId = data.exigencia?.id

    if (!data.exigencia || requirementId === undefined) {
      handleUpdateStatus({
        id: data.id,
        status: 'Pendente',
        updatedForm: 'Association',
      })

      return
    }

    handleUpdateStatus({
      id: requirementId,
      status: 'Pendente',
      updatedForm: 'Requeriment',
      exigencias_id: data.id,
    })
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
              {''}
            </TableHeader2>

            <TableHeader2>
              {''}
            </TableHeader2>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataListCompletedAssociations.length > 0 ? (
            dataListCompletedAssociations.map(
              (data) => (
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

                  {/* Nome da instituição + modal */}
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <TableContentList>
                        {data.nome_da_instituicao}
                      </TableContentList>
                    </Dialog.Trigger>

                    <RequerimentListCompletedModal
                      idRequerimentSelected={
                        data.id
                      }
                      listCompleted={
                        dataListCompletedAssociations
                      }
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

                  {/* Enviar e-mail */}
                  <TableContentList
                    onClick={() =>
                      sendMail(data.id)
                    }
                  >
                    <PaperPlaneTilt size={29} />
                  </TableContentList>

                  {/* Voltar para pendente */}
                  <TableContentList
                    onClick={() =>
                      handleUpdateStatusForm(data)
                    }
                  >
                    <ArrowBendLeftDown size={29} />
                  </TableContentList>
                </TableRowContentList>
              ),
            )
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                Nenhuma exigência concluída encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={
          paginationCompletedAssociations.total
        }
        rowsPerPage={
          paginationCompletedAssociations.limit
        }
        labelRowsPerPage="Itens por página:"
        page={
          currentPageCompletedAssociations - 1
        }
        onPageChange={handleChangePage}
        onRowsPerPageChange={
          handleChangeRowsPerPage
        }
        showFirstButton
        showLastButton
      />
    </ListRequerimentTable>
  )
}