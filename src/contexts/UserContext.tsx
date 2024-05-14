import {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useRequeriment } from '../hooks/useRequeriment'
import api from '../services/api'

interface UserLoginProps {
  name: string
  password: string
}

export interface ResponseDataUser {
  admin: boolean
  id: string
  registration: string
  name: string
  token: string
  email: string
}

interface CreaterUser {
  admin: boolean
  name: string
  password: string
  registration: string
  email: string
}

interface UpdateUser {
  id: string
  name: string
  password: string
  registration: string
  email: string
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
  handleUpdateUser: (data: UpdateUser) => Promise<void>
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
  const { getListRequeriment } = useRequeriment()

  const handleLoginUser = useCallback(
    async (data: UserLoginProps) => {
      const { name, password } = data

      try {
        const response = await toast.promise(
          api.post('sessions', { name, password }),
          {
            pending: 'Verificando seus dados',
            success: 'Seja bem-vindo(a)!',
            error: 'Verifique o nome do usuário e senha 🤯',
          }
        )
        const { data } = response
        await localStorage.setItem('cartorio:userData1.0', JSON.stringify(data))
        setUserDataLogin(data)

        setTimeout(() => {
          navigate('/')
        }, 1000)

        await getListRequeriment()
      } catch (error) {
        console.log(error)
      }
    },
    [getListRequeriment, navigate]
  )

  useEffect(() => {
    const LoadDataUser = async () => {
      const dataUserLogin = await localStorage.getItem('cartorio:userData1.0')

      dataUserLogin && setUserDataLogin(JSON.parse(dataUserLogin))
    }

    LoadDataUser()
  }, [])

  const handleCreateUser = useCallback(async (data: CreaterUser) => {
    const { password, admin, name, registration, email } = data

    try {
      await toast.promise(
        api.post('users', { password, admin, name, registration, email }),
        {
          pending: 'Enviando Dados',
          success: 'Usuário Criado com Sucesso!',
          error: 'Usuário existente Verifique seu email e senha 🤯',
        }
      )
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

  const handleUpdateUser = useCallback(async (data: UpdateUser) => {
    const { email, id, name, password, registration } = data

    const updatedData = {
      email,
      name,
      password,
      registration,
    }

    try {
      await toast.promise(api.put(`requeriment/${id}`, updatedData), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updatePassword = useCallback(async (data: UpdatePasswordProps) => {
    const confirmEmail = localStorage.getItem('cartorio:UserConfirmEmail')
    const idUser = confirmEmail && JSON.parse(confirmEmail).id

    try {
      await toast.promise(api.put(`requeriment/${idUser}`, data.password), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
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
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
