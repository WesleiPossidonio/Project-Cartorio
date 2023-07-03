import { styled } from 'styled-components'

export const SectionCreateRequirement = styled.section`
  width: 100%;
  height: 100vh;
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
