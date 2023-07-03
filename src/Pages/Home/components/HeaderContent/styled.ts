import styled from 'styled-components'

export const HeaderHome = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  gap: 1rem;
`

export const SearchForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  margin-top: 1rem;
`

export const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

  font-size: 1rem;

  &::placeholder {
    font-size: 1rem;
  }
`
export const ContainerButton = styled.div`
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
`
