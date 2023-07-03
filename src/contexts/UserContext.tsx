import {
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

interface ResponseDataUser {
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

interface UserContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>
  handleLoginUser: (data: UserLoginProps) => Promise<void>
  userDataLogin: ResponseDataUser | undefined
}

interface UserContextProviderProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const navigate = useNavigate()
  const [userDataLogin, setUserDataLogin] = useState<ResponseDataUser>()

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

      if (dataUserLogin) {
        setUserDataLogin(JSON.parse(dataUserLogin))
      }
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

  return (
    <UserContext.Provider
      value={{ handleLoginUser, userDataLogin, handleCreateUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
