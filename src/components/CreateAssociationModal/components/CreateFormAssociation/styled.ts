import * as RadioGroup from '@radix-ui/react-radio-group'
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

    padding: 2rem;
    margin-top: 2rem;

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

  #radio-input {
    grid-column: span 2;
    max-width: 50%;

    display: flex;
    align-items: center;
    gap: 0.3rem;
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
export const RadioItem = styled(RadioGroup.Root)``

export const RadioBiutton = styled(RadioGroup.Item)`
  background-color: #f2f2f2;
  width: 20px;
  height: 20px;
  border-radius: 100%;
`

export const RadioIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors['base-blue']};
  }
`
