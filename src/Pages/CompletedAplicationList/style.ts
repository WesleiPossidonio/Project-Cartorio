import styled from 'styled-components'

export const ContainerHome = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

export const ContentRequeriement = styled.main`
  position: fixed;
  top: 6rem;
  bottom: 0;
  right: 0;
  width: 80%;
  padding: 3rem;
  background: #f2f3ee;
  overflow-y: scroll;

  @media (min-width: 1800px) {
    width: 86%;
  }

  @media (max-width: 1023px) {
    width: 100%;
  }
`

export const ContainerMainList = styled.div``
