import { TableContainer, TableCell, TableRow } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import { styled } from 'styled-components'

export const ListRequerimentTable = styled(TableContainer)`
  height: max-content;
  max-height: 450px;
  margin-top: 2rem;
  padding: 0 1rem;
  background: #fff;
  border: none;
  border-radius: 6px;
  margin-bottom: 1rem;
  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);
`

export const TableHeader2 = muiStyled(TableCell)({
  fontSize: '1rem',
  fontWeight: '600',
  border: 'none',
  color: '#A1A1AA',
}) as typeof TableCell

export const TableRowContentList = muiStyled(TableRow)({
  '&:hover': {
    backgroundColor: '#f2f2f2',
    cursor: 'pointer',
  },
}) as typeof TableRow

export const TableContentList = muiStyled(TableCell)({
  marginBottom: '2rem',
}) as typeof TableCell
