import styled from 'styled-components'

export const ContainerHeader = styled.header`
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5rem 2rem;
  background-color: ${({ theme }) => theme.colors['base-background']};
`

export const ImageLogo = styled.img`
  max-width: 12rem;
  mix-blend-mode: multiply;
`

export const ContainerUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

export const Line = styled.div`
  height: 1.8rem;
  border-left: 1px solid #000;
`

export const DataUserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
