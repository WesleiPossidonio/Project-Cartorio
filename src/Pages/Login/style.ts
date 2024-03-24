import styled from 'styled-components'

export const ContainerInput = styled.section`
  width: min(30rem, 100vh);
  height: 35rem;

  margin: 5rem auto;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.375rem;

  background: ${({ theme }) => theme.colors['base-background']};

  form {
    width: 100%;
  }
`
