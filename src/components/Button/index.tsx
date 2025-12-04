import { ButtonHTMLAttributes, ReactNode } from 'react'
import { ButtonContainer } from './styled'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  buttonSubmit?: boolean
  selectButton?: boolean
  selected?: boolean
}

export const Button = ({
  children,
  buttonSubmit,
  selectButton,
  selected,
  ...rest
}: ButtonProps) => {
  return (
    <ButtonContainer
      $buttonSubmit={buttonSubmit}
      $selectButton={selectButton}
      $selected={selected}
      {...rest}
    >
      {children}
    </ButtonContainer>
  )
}
