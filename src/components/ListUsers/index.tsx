import {
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'

import * as Dialog from '@radix-ui/react-dialog'

import { Trash } from 'phosphor-react'
import { useUser } from '../../hooks/useUser'

import {
  ListUsersTable,
  TableHeaderUsers,
  TableContentUsers,
  TableRowUsers,
} from './styled'
import { UpdateUserModal } from '../UpdateUserDataModal'


export const ListUsers = () => {
  const {
    listUsers,
    pagination,
    currentPage,
    setCurrentPage,
    handleDeleteUser,
  } = useUser()

  return (
    <ListUsersTable>
      <Table aria-label="users table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableHeaderUsers>
              Nome
            </TableHeaderUsers>

            <TableHeaderUsers>
              E-mail
            </TableHeaderUsers>

            <TableHeaderUsers>
              Administrador
            </TableHeaderUsers>

            <TableHeaderUsers>
              Data de cadastro
            </TableHeaderUsers>

            <TableHeaderUsers>
              {''}
            </TableHeaderUsers>

            <TableHeaderUsers>
              {''}
            </TableHeaderUsers>
          </TableRow>
        </TableHead>

        <TableBody>
          {listUsers.map((user) => (
            <TableRowUsers
              key={user.id}
              sx={{
                '&:last-child td, &:last-child th': {
                  border: 0,
                },
              }}
            >
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <TableContentUsers>
                    {user.name}
                  </TableContentUsers>
                </Dialog.Trigger>

                <UpdateUserModal id={user.id} title='Dados do Usuário' />
              </Dialog.Root>

              <TableContentUsers>
                {user.email}
              </TableContentUsers>

              <TableContentUsers>
                {user.admin ? 'Sim' : 'Não'}
              </TableContentUsers>

              <TableContentUsers>
                {new Date(user.createdAt).toLocaleDateString('pt-BR', {})}
              </TableContentUsers>

              <TableContentUsers
                onClick={() => handleDeleteUser(user.id)}
              >
                <Trash size={29} />
              </TableContentUsers>
            </TableRowUsers>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={pagination.total}
        rowsPerPage={pagination.limit}
        page={currentPage - 1}
        onPageChange={(_, newPage) => {
          setCurrentPage(newPage + 1)
        }}
        showFirstButton
        showLastButton
        labelRowsPerPage="Itens por página:"
      />
    </ListUsersTable>
  )
}