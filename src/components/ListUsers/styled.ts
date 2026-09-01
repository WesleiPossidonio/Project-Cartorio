import {
  TableContainer,
  TableCell,
  TableRow,
} from '@mui/material'

import { styled as muiStyled } from '@mui/material/styles'

import { styled } from 'styled-components'

export const ListUsersTable = styled(TableContainer)`
  height: max-content;

  max-height: 550px;

  margin-top: 2rem;

  padding: 0 1rem;

  background: ${({ theme }) =>
    theme.colors['base-background']};

  border: none;

  border-radius: 6px;

  margin-bottom: 1rem;

  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

  .Icon {
    &:hover {
      color: ${({ theme }) =>
        theme.colors['base-blue']};
    }
  }
`

export const TableHeaderUsers = muiStyled(TableCell)({
  fontSize: '1rem',

  fontWeight: '600',

  border: 'none',

  color: '#A1A1AA',
}) as typeof TableCell

export const TableRowUsers = muiStyled(TableRow)({
  '&:hover': {
    backgroundColor: '#f2f2f2',

    cursor: 'pointer',
  },
}) as typeof TableRow

export const TableContentUsers = muiStyled(TableCell)({
  marginBottom: '2rem',

  '&:hover > svg': {
    color: '#2b3d63',

    transition: 'color 0.3s ease-in-out',
  },
}) as typeof TableCell