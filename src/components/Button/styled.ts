import styled from 'styled-components'

interface ButtonContainerProps {
  concluted?: boolean
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 1rem;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;

  font-size: 1rem;
  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

  background: ${({ concluted }) => (concluted ? '#265a63' : '#2b3d63')};
  color: #fff;

  font-weight: 600;
  font-size: 1rem;
`
