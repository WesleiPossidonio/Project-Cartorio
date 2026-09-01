import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { useUser } from '../../hooks/useUser'
import { Input } from '../Input'
import { CloseButton, Content, Overlay } from './style'
import { UpdateUser } from '../../@types/typesUserContext'


interface UpdateUserProps {
  id?: string
  title: string
}

const updateUserFormSchema = zod.object({
  name: zod.string().min(3, 'Por gentileza digite o seu nome'),
  email: zod.string().email('Por Favor digite um email válido'),
  password: zod
    .string()
    .min(6, 'Limite mínimo de 6 digitos'),
  registration: zod.string().min(3, 'Por gentileza digite o nº da matricula'),
})

type UpdateUserFormInputs = zod.infer<typeof updateUserFormSchema>

export const UpdateUserModal = ({ id, title }: UpdateUserProps) => {
const { handleUpdateUser, userDataLogin, listUsers } = useUser()

const userDataSelected = listUsers.find(
  (user) => user.id === id
)

const user = userDataSelected ?? userDataLogin

const userData: UpdateUser = {
  id: user.id,
  name: user.name,
  email: user.email,
  password: '',
  registration: user.registration,
}

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<UpdateUserFormInputs>({
    resolver: zodResolver(updateUserFormSchema),
  })

  const handleCreateNewUser = async (data: UpdateUserFormInputs) => {
    const { email, name, password, registration } = data

    await handleUpdateUser({
      id: userDataLogin.id,
      email,
      name,
      password,
      registration,
    })
    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>{title}</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewUser)}>
          <Input
            type="text"
            placeholder="Nome"
            defaultValue={userData.name}
            {...register('name')}
            error={errors.name?.message}
          />

          <Input
            type="text"
            placeholder="Email"
            defaultValue={userData.email}
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            type="text"
            placeholder="Nº Matricula"
            defaultValue={userData.registration}
            {...register('registration')}
            error={errors.registration?.message}
          />

          <Input
            type="password"
            placeholder="Senha"
            {...register('password')}
            error={errors.password?.message}
          />

          <button type="submit" disabled={isSubmitting}>
            Atualizar Dados
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
