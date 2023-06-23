import styled from 'styled-components'

export const ContainerInput = styled.section`
  max-width: 90%;

  margin: 5rem auto;
  display: flex;
  align-items: center;
  justify-content: space-around;

  border-radius: 0.375rem;

  background: ${({ theme }) => theme.colors['base-background']};

  > div {
    width: 70%;
    height: 50rem;
    background-color: ${({ theme }) => theme.colors['base-bg-image']};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375 0 0 0.375rem;

    padding: 0.25rem;

    @media (max-width: 1500px) {
      width: 60%;
    }

    @media (max-width: 950px) {
      display: none;
    }
  }

  form {
    width: 40%;

    @media (max-width: 1500px) {
      width: 50%;
    }

    @media (max-width: 950px) {
      width: 100%;
    }

    @media (max-width: 598px) {
      height: 50rem;
      display: flex;
    }
  }
`

export const ImageMainLogin = styled.img`
  width: 37.5rem;

  @media (max-width: 1500px) {
    width: 32.5rem;
  }
`
