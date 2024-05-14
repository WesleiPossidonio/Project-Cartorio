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

export const ButtonHeader = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;

  font-size: 1rem;
  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

  background: #2b3d63;
  color: #fff;

  font-weight: 600;
  font-size: 1rem;
`

const BaseButton = styled.button`
  padding: 1rem;
  height: 3.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
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
    text-underline-offset: 2px;
    cursor: pointer;
  }
`

export const ButtonUpContent = styled(BaseButton)`
  background: #265a63;
  color: #fff;
`
