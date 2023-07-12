import styled from 'styled-components'

interface ButtonContainerProps {
  concluted?: boolean
  buttonSubmit?: boolean
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: ${({ buttonSubmit }) => buttonSubmit && '20rem'};
  padding: 1.1rem;
  border: none;
  border-radius: 6px;

  margin-top: ${({ buttonSubmit }) => buttonSubmit && '5rem'};

  cursor: pointer;

  font-size: 1rem;
  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

  background: #2b3d63;
  color: #fff;

  font-weight: 600;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.9rem;

    svg {
      width: 2rem;
    }
  }
`
