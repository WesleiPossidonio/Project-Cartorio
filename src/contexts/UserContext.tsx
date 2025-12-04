import {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useEffect,
  SetStateAction,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import api from '../services/api'
import { decodeToken } from '../utils/DecodeToken'

interface UserLoginProps {
  name: string
  password: string
}

export interface ResponseDataUser {
  admin: boolean
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
  updateNumber: string
}

interface UserContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>
  handleLoginUser: (data: UserLoginProps) => Promise<void>
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  updatePassword: (data: UpdatePasswordProps) => Promise<void>
  handleUpdateUser: (data: UpdateUser) => Promise<void>
  setUserDataLogin: React.Dispatch<SetStateAction<ResponseDataUser>>
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
        localStorage.setItem('cartorio:userData1.0', JSON.stringify(data))
        setUserDataLogin(data)
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    },
    [navigate]
  )

  useEffect(() => {
    const LoadDataUser = async () => {
      const dataUserLogin = await localStorage.getItem('cartorio:userData1.0')

      if (dataUserLogin) {
        setUserDataLogin(JSON.parse(dataUserLogin))
      }
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

  const confirmMail = useCallback(async (data: ConfirmMailProps) => {
    const { email } = data

    try {
      const response = await toast.promise(api.post('confirmMail', { email }), {
        pending: 'Verificando seus dados',
        success: 'Email Encontrado! verifique seu email.',
        error: 'E-mail não encontrado digite novamente 🤯',
      })
      const { data } = response
      await localStorage.setItem(
        'cartorio:UserConfirmEmail',
        JSON.stringify(data)
      )

      setUserDataLogin(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleUpdateUser = useCallback(async (data: UpdateUser) => {
    const { email, name, password, registration } = data
    const tokenUser = localStorage.getItem('cartorio:userData1.0')
    const idUser = decodeToken(tokenUser)

    const updatedData = {
      email,
      name,
      password,
      registration,
    }

    try {
      await toast.promise(api.put(`users/${idUser?.id}`, updatedData), {
        pending: 'Verificando seus dados',
        success: 'Senha Atualizada com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
      await localStorage.setItem('cartorio:userData1.0', JSON.stringify(data))
      setUserDataLogin((state) => ({ ...state, email, name, password, registration }))
    } catch (error) {
      console.log(error)
    }
  }, [])

  const updatePassword = useCallback(async (data: UpdatePasswordProps) => {
    const confirmEmailId = localStorage.getItem('cartorio:UserConfirmEmail')
    const idUser = decodeToken(confirmEmailId)

    const { password, updateNumber } = data

    if (idUser) {
      const updateData = { password, updateNumber }

      try {
        await toast.promise(
          api.patch(`updatePassword/${idUser.id}`, updateData),
          {
            pending: 'Verificando seus dados',
            success: 'Senha Atualizada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )
      } catch (error) {
        console.log(error)
      }
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
        setUserDataLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
