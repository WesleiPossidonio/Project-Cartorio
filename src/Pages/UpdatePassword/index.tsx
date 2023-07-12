import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import ImageLogoCartorio from '../../assets/Logo-Cartorio.jpg'
import { Button, Input, TitleText } from '../../components'
import { useUser } from '../../hooks/useUser'
import { ContainerUpdatePassword, ContentUpdatePassword, Form } from './style'

const updatePasswordSchema = zod
  .object({
    password: zod
      .string()
      .min(6, 'A senha deve conter  6 caracteres')
      .max(6, 'A senha deve conter 6 caracteres')
      .nonempty('Por favor, digite sua nova senha'),
    confirmPassword: zod
      .string()
      .min(6, 'A senha deve conter  6 caracteres')
      .max(6, 'A senha deve conter 6 caracteres')
      .nonempty('Por favor, confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As Senhas devem ser iguais',
    path: ['confirmPassword'],
  })

type CreateUpdatePasswordFormInputs = zod.infer<typeof updatePasswordSchema>

export const UpdatePaswordLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUpdatePasswordFormInputs>({
    resolver: zodResolver(updatePasswordSchema),
    shouldUnregister: true,
  })

  const { updatePassword } = useUser()

  const handleUpdatePassowrd = (data: CreateUpdatePasswordFormInputs) => {
    updatePassword(data)
    reset()
  }

  return (
    <ContainerUpdatePassword>
      <ContentUpdatePassword>
        <img src={ImageLogoCartorio} alt="" />
        <TitleText size="sm" weight={700}>
          Atualizar Senha
        </TitleText>
        <Form onSubmit={handleSubmit(handleUpdatePassowrd)}>
          <label htmlFor="password">
            <Input
              type="password"
              placeholder="Digite sua Nova Senha"
              {...register('password')}
              error={errors.password?.message}
            />
          </label>
          <label htmlFor="password">
            <Input
              type="password"
              placeholder="Confirme sua Nova Senha"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </label>

          <Button type="submit">Atualizar Senha</Button>
        </Form>
      </ContentUpdatePassword>
    </ContainerUpdatePassword>
  )
}
