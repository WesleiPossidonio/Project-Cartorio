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
  padding: 0.8rem;
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
  margin-top: 0.5rem;

  p {
    text-decoration: underline;
    text-underline-offset: 4px;
    cursor: pointer;
  }
`
export const Selected = styled.select`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`
