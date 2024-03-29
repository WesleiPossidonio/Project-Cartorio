import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { useUser } from '../../hooks/useUser'
import { FormLogin } from './components/FormLogin'
import { ContainerInput } from './style'

const confirmOrderLoginValidationSchema = zod.object({
  name: zod.string().min(3, 'Informe o nome do usuário'),
  password: zod.string().min(4, 'Informe a Senha'),
})

export type OrderData = zod.infer<typeof confirmOrderLoginValidationSchema>

type ConfirmOrderFormLoginData = OrderData

export const Login = () => {
  const { handleLoginUser } = useUser()

  const confirmOrderLoginForm = useForm<ConfirmOrderFormLoginData>({
    resolver: zodResolver(confirmOrderLoginValidationSchema),
  })

  const { handleSubmit } = confirmOrderLoginForm

  const handleConfirmOrder = (data: ConfirmOrderFormLoginData) => {
    handleLoginUser(data)
  }

  return (
    <ContainerInput>
      <form action="#" onSubmit={handleSubmit(handleConfirmOrder)}>
        <FormProvider {...confirmOrderLoginForm}>
          <FormLogin />
        </FormProvider>
      </form>
    </ContainerInput>
  )
}
