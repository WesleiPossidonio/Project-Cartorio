import { ButtonHTMLAttributes, ReactNode } from 'react'

import { ButtonContainer } from './styled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  buttonSubmit?: boolean
  selectButton?: boolean
  selected?: boolean
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonContainer {...props}>{children}</ButtonContainer>
}
