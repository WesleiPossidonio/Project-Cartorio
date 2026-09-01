import {
  Table,
  TableBody,
  TableRow,
  TableHead,
  TablePagination,
} from '@mui/material'

import * as Dialog from '@radix-ui/react-dialog'

import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {
  Check,
  FilePlus,
  PaperPlaneTilt,
  Trash,
} from 'phosphor-react'

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
    currentPageWithoutRequirement,
    paginationWithoutRequirement,
    dataListAssociationWithoutRequirement,
    setCurrentPageWithoutRequirement,
    sendMail,
    handleUpdateAssociation,
    handleDeleteAssociation
  } = useRequeriment()


  const handleUpdateStateAssociation = async (id: number) => {
    const requirementSelected = dataListAssociationWithoutRequirement.find(
      (list) => list.id === id
    )

    if (requirementSelected) {
      const data = {
        ...requirementSelected,
        status_association: 'Concluído',
      }

      handleUpdateAssociation(data)
    }
  }

  return (
    <ListRequerimentTable>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeader2>
              Nº de Protocolo
            </TableHeader2>

            <TableHeader2>
              Nome do Estabelecimento
            </TableHeader2>

            <TableHeader2>
              Nome do Representante
            </TableHeader2>

            <TableHeader2>
              Data do Exame
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
          {dataListAssociationWithoutRequirement.map((data) => (
            <TableRowContentList
              key={data.id}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
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

                <UpdateAssociationModal
                  AssociationId={data.id}
                />
              </Dialog.Root>

              <TableContentList>
                {data.nome_do_representante}
              </TableContentList>

              <TableContentList>
                {data.createdAt &&
                  formatDistanceToNow(
                    new Date(data.createdAt),
                    {
                      addSuffix: true,
                      locale: ptBR,
                    }
                  )}
              </TableContentList>

              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <TableContentList>
                    <FilePlus size={32} />
                  </TableContentList>
                </Dialog.Trigger>

                <CreateRequerimentModal
                  AssociationId={data.id}
                />
              </Dialog.Root>

              <TableContentList
                onClick={() => sendMail(data.id)}
              >
                <PaperPlaneTilt size={29} />
              </TableContentList>

              <TableContentList
                onClick={() =>
                  handleUpdateStateAssociation(data.id)
                }
              >
                <Check size={29} />
              </TableContentList>

              <TableContentList
                onClick={() =>
                  handleDeleteAssociation(data.id)
                }
              >
                <Trash size={29} />
              </TableContentList>
            </TableRowContentList>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={paginationWithoutRequirement.total}
        rowsPerPage={paginationWithoutRequirement.limit}
        page={currentPageWithoutRequirement - 1}
        onPageChange={(_, newPage) => {
          setCurrentPageWithoutRequirement(newPage + 1)
        }}
        showFirstButton
        showLastButton
        labelRowsPerPage="Itens por página:"
      />
    </ListRequerimentTable>
  )
}