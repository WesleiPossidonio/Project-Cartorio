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

  @media (max-width: 1023px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`

export const ContainerMainList = styled.div``

// export const ContainerTable = styled.div`
//   margin-top: 2rem;
//   width: 100%;
//   height: 500px;

//   border-radius: 6px;
//   padding: 1rem;

//   background-color: #fff;
// `
