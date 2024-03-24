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

  .mobile {
    display: none;
  }

  @media (max-width: 1023px) {
    .mobile {
      display: initial;
    }

    > nav {
      display: none;
    }
  }

  @media (max-width: 700px) {
    padding: 14.5px 16px;
  }
`

export const Line = styled.div`
  height: 1.8rem;
  border-left: 1px solid #000;
`

export const ContentUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 1023px) {
    display: none;
  }
`

export const DataUserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ContentName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
`
