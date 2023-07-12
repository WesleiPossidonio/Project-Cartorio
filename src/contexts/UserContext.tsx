import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../services/api'

interface UserLoginProps {
  email: string
  password: string
}

export interface ResponseDataUser {
  admin: boolean
  id: string
  registration: string
  email: string
  name: string
  token: string
}

interface CreaterUser {
  admin: boolean
  name: string
  password: string
  email: string
  registration: string
}

interface ConfirmMailProps {
  email: string
}

interface UpdatePasswordProps {
  password: string
  confirmPassword: string
}

interface UserContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>
  handleLoginUser: (data: UserLoginProps) => Promise<void>
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  updatePassword: (data: UpdatePasswordProps) => Promise<void>
  userDataLogin: ResponseDataUser
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const navigate = useNavigate()
  const [userDataLogin, setUserDataLogin] = useState<ResponseDataUser>(
    {} as ResponseDataUser
  )

  const handleLoginUser = useCallback(
    async (data: UserLoginProps) => {
      const { email, password } = data

      try {
        const response = await toast.promise(
          api.post('sessions', { email, password }),
          {
            pending: 'Verificando seus dados',
            success: 'Seja bem-vindo(a)!',
            error: 'Verifique seu email e senha 🤯',
          }
        )
        const { data } = response
        await localStorage.setItem('cartorio:userData1.0', JSON.stringify(data))

        setUserDataLogin(data)

        setTimeout(() => {
          navigate('/')
        }, 1000)
      } catch (error) {
        console.log(error)
      }
    },
    [navigate]
  )

  useEffect(() => {
    const LoadDataUser = async () => {
      const dataUserLogin = await localStorage.getItem('cartorio:userData1.0')

      dataUserLogin && setUserDataLogin(JSON.parse(dataUserLogin))
    }

    LoadDataUser()
  }, [])

  const handleCreateUser = useCallback(async (data: CreaterUser) => {
    const { password, admin, email, name, registration } = data

    try {
      const createUserResponse = await toast.promise(
        api.post('users', { password, admin, email, name, registration }),
        {
          pending: 'Enviando Dados',
          success: 'Usuário Criado com Sucesso!',
          error: 'Usuário existente Verifique seu email e senha 🤯',
        }
      )

      console.log(createUserResponse.data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const confirmMail = useCallback(
    async (data: ConfirmMailProps) => {
      const { email } = data

      try {
        const response = await toast.promise(
          api.post('confirmMail', { email }),
          {
            pending: 'Verificando seus dados',
            success: 'Email Encontrado! verifique seu email.',
            error: 'E-mail não encontrado digite novamente 🤯',
          }
        )
        const { data } = response
        await localStorage.setItem(
          'cartorio:UserConfirmEmail',
          JSON.stringify(data)
        )

        setUserDataLogin(data)

        setTimeout(() => {
          navigate('/')
        }, 1000)
      } catch (error) {
        console.log(error)
      }
    },
    [navigate]
  )

  const updatePassword = useCallback(async (data: UpdatePasswordProps) => {
    const confirmEmail = localStorage.getItem('cartorio:UserConfirmEmail')
    const idUser = confirmEmail && JSON.parse(confirmEmail).id

    try {
      await toast.promise(api.put(`requeriment/${idUser}`, data.password), {
        pending: 'Verificando seus dados',
        success: 'Exigencia Atualizada com Sucesso!',
        error: 'Ops! Verifique so Dados Digitados',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        handleLoginUser,
        userDataLogin,
        handleCreateUser,
        confirmMail,
        updatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
