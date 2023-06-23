import { forwardRef, InputHTMLAttributes } from 'react'

import { TextRegular } from '../typography'
import { InputContaineStyle, InputStyled, InputWrapper } from './style'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ClassName, ...props }, ref) => {
    return (
      <InputWrapper className={ClassName}>
        <InputContaineStyle hasError={!!error}>
          <InputStyled ref={ref} {...props} />
        </InputContaineStyle>
        {error && (
          <TextRegular size="s" color="error">
            {error}
          </TextRegular>
        )}
      </InputWrapper>
    )
  }
)
