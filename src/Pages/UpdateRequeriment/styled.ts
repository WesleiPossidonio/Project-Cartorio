import { styled } from 'styled-components'

export const ContainerUpdate = styled.section`
  width: 100%;
  height: 100vh;
  min-height: max-content;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  > p {
    align-self: flex-start;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    border-radius: 6px;
    padding: 2rem;

    background: #fff;
    margin: 4rem 0;
  }

  form h1 {
    align-self: flex-start;
    margin: 1.8rem 2.5rem;
  }
`

export const ContentRequeriment = styled.div`
  position: fixed;
  top: 6rem;
  bottom: 0;
  right: 0;
  width: 80%;
  padding: 3rem;
  background: #f2f3ee;
  overflow-y: auto;

  > h1 {
    margin-bottom: 1rem;
  }

  @media (min-width: 1800px) {
    width: 86%;
  }

  @media (max-width: 1023px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`

export const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors['base-blue']};
    }
  }
`

export const ContentLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.3rem;

  p {
    color: ${({ theme }) => theme.colors['base-blue']};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors['base-green']};
    }
  }

  .pdfLink {
    font-size: ${({ theme }) => theme.fontSizes['text-regular-m']};
    font-weight: 600;
    text-decoration: none;
    color: ${({ theme }) => theme.colors['base-blue']};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors['base-green']};
    }
  }
`

export const ContainerForm = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 40% 40%;
  column-gap: 0.75rem;
  row-gap: 1rem;
  grid-auto-flow: dense;
  margin: 2rem 0;

  #institution-name {
    grid-column: span 2;
    max-width: 50%;
  }

  #number-cnpj {
    grid-column: span 1;
  }

  #name-of-representative {
    grid-column: span 1;
  }

  #email {
    grid-column: span 1;
  }

  #phone {
    grid-column: span 1;
  }

  @media (max-width: 768px) {
    width: 100%;
    display: grid;
    grid-template-columns: 45% 45%;
    justify-content: center;
  }

  @media (max-width: 600px) {
    #institution-name {
      grid-column: span 2;
      max-width: 100%;
    }

    #number-cnpj {
      grid-column: span 2;
      max-width: 100%;
    }

    #name-of-representative {
      grid-column: span 2;
      max-width: 100%;
    }

    #email {
      grid-column: span 2;
      max-width: 100%;
    }

    #phone {
      grid-column: span 2;
      max-width: 100%;
    }
  }
`

export const ButtonCreateRequeriment = styled.button`
  margin-top: 4rem;
  width: 15rem;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  background: #2b3d63;
  color: #fff;
`

export const ButtonHome = styled.button`
  width: 12rem;
  padding: 0.92rem;
  margin-top: 1rem;
  border: 0;
  border-radius: 6px;
`

export const ContainerAddRequerimento = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;

  margin-top: 2rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`
