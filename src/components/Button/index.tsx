import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import { ButtonContainer } from './styled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  buttonSubmit?: boolean
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return <ButtonContainer {...props}>{children}</ButtonContainer>
}
