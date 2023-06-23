import styled, { css } from 'styled-components'

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

interface InputStyleContainerProps {
  hasError: boolean
}

export const InputContaineStyle = styled.div<InputStyleContainerProps>`
  width: 100%;
  height: 3.155625rem;

  font-style: normal;
  font-weight: 400;
  font-size: 0.8835125rem;
  line-height: 1.3125rem;

  background: ${({ theme }) => theme.colors['bg-input']};

  border-radius: 8.07781px;
  border: 1px solid ${({ theme }) => theme.colors['bg-input']};

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.colors['base-error']};
    `}
`

export const InputStyled = styled.input`
  width: 100%;
  height: 100%;

  background: none;
  border: none;

  font-size: ${({ theme }) => theme.fontSizes['text-regular-s']};
  line-height: 1.3125rem;
  font-style: normal;
  font-weight: 400;
  padding: 0.5rem;

  color: ${({ theme }) => theme.colors['base-cinza-100']};
`
