import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import ImageLogoCartorio from '../../../assets/Logo-Cartorio.jpg'
import { Button, Input, TextRegular, TitleText } from '../../components'
import { useUser } from '../../hooks/useUser'
import { ContainerUpdatePassword, ContentUpdatePassword, Form } from './style'

const updatePasswordSchema = zod.object({
  email: zod.string().nonempty('Por favor, digite o seu E-mail'),
})

type CreateConfirmEmailFormInputs = zod.infer<typeof updatePasswordSchema>

export const ConfirmEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateConfirmEmailFormInputs>({
    resolver: zodResolver(updatePasswordSchema),
    shouldUnregister: true,
  })

  const { confirmMail } = useUser()

  const handleConfirmPassword = (data: CreateConfirmEmailFormInputs) => {
    confirmMail(data)
    reset()
  }

  return (
    <ContainerUpdatePassword>
      <ContentUpdatePassword>
        <img src={ImageLogoCartorio} alt="" />
        <TitleText size="sm" weight={700}>
          Lembra do seu E-mail?
        </TitleText>
        <TextRegular size="s">
          Digite o seu E-mail para enviar um acesso para cadastrar uma nova
          senha{' '}
        </TextRegular>
        <Form onSubmit={handleSubmit(handleConfirmPassword)}>
          <label htmlFor="password">
            <Input
              type="password"
              placeholder="Digite seu E-mail"
              {...register('email')}
              error={errors.email?.message}
            />
          </label>
          <Button type="submit">Enviar</Button>
        </Form>
      </ContentUpdatePassword>
    </ContainerUpdatePassword>
  )
}
