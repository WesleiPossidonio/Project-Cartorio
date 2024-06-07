import { styled } from 'styled-components'
export const ContainerModal = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  margin-top: 2rem;

  .PdfContainer {
    align-self: flex-start;
  }
`

export const HeaderModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-self: flex-start;
  gap: 0.4rem;
`

export const ContentText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`

export const ContainerRequeriments = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`

export const TextListModal = styled.p`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors['base-background']};

  font-size: 0.764rem;
  font-weight: 600;
  border-radius: 6px;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  cursor: pointer;
`
