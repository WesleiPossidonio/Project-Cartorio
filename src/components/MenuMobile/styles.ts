import styled, { css } from 'styled-components'

interface ContainerProps {
  isVisible: boolean
}

export const Container = styled.section<ContainerProps>`
  position: absolute;
  backdrop-filter: blur(3px);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors['base-button']};

  opacity: 0;
  pointer-events: none;
  transform: translateY(50px);

  transition: 0.5s;

  > svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    transform: rotate(45deg);
    transition: 0.7s;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    transform: scale(0.7);
    transition: 0.7s;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0px);

      > svg {
        transform: rotate(0deg);
      }

      nav {
        transform: scale(1);
      }
    `}
`

interface ContainerButtonProps {
  selected: boolean
}

export const ContainerButton = styled.button<ContainerButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  border-radius: 6px;

  svg {
    color: #000;
  }
`
export const ButtonMobile = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border: none;
  border-radius: 6px;

  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none;

  background: ${({ theme }) => theme.colors['base-bg-image']};

  color: ${({ theme }) => theme.colors['base-text']};
`
export const Line = styled.div`
  height: 1.8rem;
  border-left: 1px solid #fff;
`

export const ContentUser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  margin-bottom: 1rem;

  color: #fff;

  p {
    color: #fff;
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
