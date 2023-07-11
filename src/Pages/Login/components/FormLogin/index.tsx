import React from 'react'
import { useFormContext } from 'react-hook-form'

import ImageLogin from '../../../../assets/Image-Logint.svg'
import LogoCartorio from '../../../../assets/Logo-Cartorio.svg'
import { Input } from '../../../../components'
import {
  Button,
  ContentInputLogin,
  ImageLogo,
  Label,
  ImageMainLogin,
} from './style'

interface ErrosType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}

export const FormLogin = () => {
  const { register, formState } = useFormContext()

  const { errors } = formState as unknown as ErrosType

  return (
    <ContentInputLogin>
      <div>
        <ImageLogo src={LogoCartorio as unknown as string} alt="" />
        <ImageMainLogin src={ImageLogin as unknown as string} alt="" />
      </div>

      <Label htmlFor="email">
        Email:
        <Input
          type="text"
          id="email"
          placeholder="Digite seu Email"
          {...register('email')}
          error={errors.email?.message}
        />
      </Label>
      <Label htmlFor="password">
        Senha:
        <Input
          type="password"
          id="password"
          placeholder="Digite sua Senha"
          {...register('password')}
          error={errors.password?.message}
        />
      </Label>
      <Button>Fazer Login</Button>
    </ContentInputLogin>
  )
}
