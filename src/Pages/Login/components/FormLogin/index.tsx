import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import LogoCartorio from '../../../../assets/Logo-Cartorio.svg'
import { Input, TextRegular } from '../../../../components'
import { Button, ContentInputLogin, ImageLogo, Label } from './style'

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

  const navigate = useNavigate()

  const handleNavigateConfirmEmail = () => {
    navigate('/Confirmar-Email')
  }

  return (
    <ContentInputLogin>
      <div>
        <ImageLogo src={LogoCartorio as unknown as string} />
      </div>

      <Label htmlFor="name">
        Nome:
        <Input
          type="text"
          id="name"
          placeholder="Digite o Nome do Usuário"
          {...register('name')}
          error={errors.name?.message}
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
      <TextRegular onClick={handleNavigateConfirmEmail}>
        Esqueceu a senha?
      </TextRegular>
      <Button>Fazer Login</Button>
    </ContentInputLogin>
  )
}
