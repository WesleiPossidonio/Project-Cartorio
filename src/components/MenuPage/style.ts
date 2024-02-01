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

  background: #fff;
  padding: 5.7rem 0 0 1.5rem;

  svg {
    color: #2b3d63;
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
  display: ${({ isUserAdmin }) => (isUserAdmin ? 'flex' : 'none')};
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  padding: 1.5rem;
  border-radius: 6px 0 0 6px;

  border: none;

  cursor: pointer;

  background: ${({ selected }) => selected && '#2b3d63'};

  &:hover {
    background: ${({ theme, selected }) =>
      !selected && theme.colors['base-hover']};
  }

  svg {
    color: ${({ selected }) => selected && '#fff'};
  }

  p {
    text-align: center;
    color: ${({ selected }) => selected && '#fff'};
  }
`
