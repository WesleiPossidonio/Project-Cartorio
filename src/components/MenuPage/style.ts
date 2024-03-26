import styled from 'styled-components'

export const MenuContainer = styled.aside`
  position: fixed;
  top: 6rem;
  bottom: 0;
  left: 0;
  width: 20%;
  height: 100vh;
  display: flex;

  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 0.5rem;

  background: #fff;
  padding: 5.7rem 0;

  svg {
    color: ${({ theme }) => theme.colors['base-blue']};
  }

  @media (max-width: 1023px) {
    display: none;
  }
`

interface MenuContainerProps {
  selected: boolean
  isUserAdmin?: boolean
}

export const ContainerButton = styled.button<MenuContainerProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 1.5rem;

  background: ${({ theme, selected }) =>
    selected ? theme.colors['base-hover'] : theme.colors['base-background']};

  border: none;

  cursor: pointer;

  border-left: ${({ theme, selected }) =>
    selected && `4px solid ${theme.colors['base-blue']}`};

  &:hover {
    background: ${({ theme, selected }) =>
      !selected && theme.colors['base-hover']};
  }

  svg {
    color: ${({ theme, selected }) => selected && theme.colors['base-blue']};
  }

  p {
    text-align: center;
    color: ${({ theme, selected }) => selected && theme.colors['base-title']};
  }
`
