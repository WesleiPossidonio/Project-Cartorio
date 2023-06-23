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
`
export const Content = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  margin-top: 1.5rem;
  padding: 1rem;

  border-radius: 10px;

  background: #fff;
`

export const ContentDataClient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.3rem;

  margin-top: 1.5rem;
  margin-bottom: 2rem;
`

export const ContainerList = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  gap: 1rem;
`

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  margin: 1rem 0;
`
