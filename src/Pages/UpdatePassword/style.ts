import { styled } from 'styled-components'

export const ContainerUpdatePassword = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  background: ${({ theme }) => theme.colors['base-cinza-100']};
`

export const ContentUpdatePassword = styled.div`
  width: 25rem;
  height: 36rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1.5rem;
  margin: 0 auto;
  border: none;
  border-radius: 6px;

  background: ${({ theme }) => theme.colors['base-background']};

  img {
    width: 12rem;
    margin-bottom: 3rem;
  }

  h1 {
    margin-bottom: 2rem;
  }
`
export const Form = styled.form`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  label {
    width: 100%;
  }

  button {
    width: 100%;
  }
`
