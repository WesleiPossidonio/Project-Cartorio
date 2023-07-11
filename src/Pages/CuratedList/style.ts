import styled from 'styled-components'

export const ContainerHome = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: 1.25rem;
`
export const ContentRequeriement = styled.main`
  width: 80%;
  position: fixed;
  top: 6rem;
  bottom: 0;
  right: 0;

  padding: 3rem;
  background: #f2f3ee;
  overflow-y: scroll;

  > h1 {
    margin-bottom: 1rem;
  }

  @media (max-width: 1023px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`
export const Content = styled.div`
  width: 100%;
  height: max-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;

  margin-top: 1.5rem;
  padding: 2rem;

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
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  gap: 1rem;

  h4 {
    font-size: 1rem;
  }
`

export const ContentDataList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`

export const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.625rem;
`

export const ContainerButton = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;

  margin: 1rem 0;

  a {
    text-decoration: none;
  }

  button {
    margin-bottom: 2rem;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1.1rem;
    border: none;
    border-radius: 6px;
    margin-top: -2rem;

    cursor: pointer;

    font-size: 1rem;
    box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

    background: #2b3d63;
    color: #fff;

    font-weight: 600;
    font-size: 1rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    button {
      width: 100% !important;
      margin-bottom: 0.5rem;
    }

    .button {
      width: 100%;
      font-size: 0.8rem;
      padding: 0.9rem;
      margin-bottom: 0.5rem;
      margin-top: 0;
    }
  }
`
