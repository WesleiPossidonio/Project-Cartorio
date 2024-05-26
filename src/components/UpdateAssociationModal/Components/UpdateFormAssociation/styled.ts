import { styled } from 'styled-components'

export const SectionCreateRequirement = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .PdfContainer {
      align-self: flex-start;
      margin-top: 1rem;
    }
  }

  a {
    text-decoration: none;
  }
`

export const ContainerForm = styled.div`
  width: 100%;
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

export const ButtonHome = styled.button`
  width: 8rem;

  padding: 0.6rem;
  border: 0;
  border-radius: 6px;

  margin-top: 1rem;

  font-size: 1rem;
  font-weight: 700;

  background: #2b3d63;
  color: #fff;
`
