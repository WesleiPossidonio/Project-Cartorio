import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { useUser } from '../../hooks/useUser'
import { TextRegular } from '../typography'
import {
  CloseButton,
  Content,
  CreateUserType,
  CreateUserTypeButton,
  Overlay,
} from './style'

const createUserFormSchema = zod.object({
  admin: zod.string(),
  name: zod.string(),
  email: zod.string().email('Por Favor digite um email válido'),
  password: zod.string(),
  registration: zod.string(),
})

type CreateUserFormInputs = zod.infer<typeof createUserFormSchema>

export const CreateUserModal = () => {
  const { handleCreateUser } = useUser()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreateUserFormInputs>({
    resolver: zodResolver(createUserFormSchema),
  })

  const handleCreateNewUser = async (data: CreateUserFormInputs) => {
    const { admin, email, name, password, registration } = data

    const isAdmin = Boolean(admin)

    await handleCreateUser({
      email,
      admin: isAdmin,
      name,
      password,
      registration,
    })

    console.log(isAdmin, admin, email, name, password)
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Cadastrar Usuário</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewUser)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register('name')}
          />

          <input
            type="text"
            placeholder="Email"
            required
            {...register('email')}
          />
          <input
            type="text"
            placeholder="Nº Matricula"
            required
            {...register('registration')}
          />

          <input
            type="text"
            placeholder="Senha"
            required
            {...register('password')}
          />

          <Controller
            control={control}
            name="admin"
            render={({ field }) => {
              const stringValue = field.value
              return (
                <CreateUserType
                  onValueChange={field.onChange}
                  value={stringValue}
                >
                  <TextRegular size="s">
                    O Usuário será Administrador?
                  </TextRegular>
                  <div>
                    <CreateUserTypeButton variant="true" value="true">
                      <ArrowCircleUp size={26} />
                      Sim
                    </CreateUserTypeButton>

                    <CreateUserTypeButton variant="false" value="false">
                      <ArrowCircleDown size={26} />
                      Não
                    </CreateUserTypeButton>
                  </div>
                </CreateUserType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
