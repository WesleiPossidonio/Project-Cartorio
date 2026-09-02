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
import { 
  ConfirmMailProps, 
  CreaterUser, 
  ResponseDataUser, 
  UpdatePasswordProps, 
  UpdateUser, 
  UserData, 
  UserLoginProps, 
  UserPagination 
} from '../@types/typesUserContext'
interface UserContextType {
  handleCreateUser: (data: CreaterUser) => Promise<void>
  handleLoginUser: (data: UserLoginProps) => Promise<void>
  confirmMail: (data: ConfirmMailProps) => Promise<void>
  updatePassword: (data: UpdatePasswordProps) => Promise<void>
  handleUpdateUser: (data: UpdateUser) => Promise<void>
  setUserDataLogin: React.Dispatch<SetStateAction<ResponseDataUser>>
  handleDeleteUser: (id: string) => Promise<void>
  getAllUsers: (page?: number, search?: string) => Promise<void>
  setCurrentPage: React.Dispatch<SetStateAction<number>>
  setLinkMenuSelected: React.Dispatch<SetStateAction<{ page: string; modal: string }>>
  linkMenuSelected: { page: string; modal: string }
  pagination: UserPagination
  userDataLogin: ResponseDataUser
  listUsers: UserData[]
  currentPage: number
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
  const [listUsers, setListUsers] = useState<UserData[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<UserPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const [linkMenuSelected, setLinkMenuSelected] = useState({
    page: 'Home',
    modal: ''
  })

  const getAllUsers = useCallback(
    async (page = 1, search = '') => {
      try {
        const response = await api.get('users', {
          params: {
            page,
            limit: 10,
            search: search.trim() || undefined,
          },
        })
  
        const { usersData, total, currentPage, totalPages } =
          response.data
  
        setListUsers(usersData)
  
        setPagination({
          page: currentPage,
          limit: 10,
          total,
          totalPages,
        })
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  useEffect(() => {
    getAllUsers()
  }, [getAllUsers])

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
    const response =  await toast.promise(
        api.post('users', { password, admin, name, registration, email }),
        {
          pending: 'Enviando Dados',
          success: 'Usuário Criado com Sucesso!',
          error: 'Usuário existente Verifique seu email e senha 🤯',
        }
      )

      setListUsers((prevList: UserData[]) => [...prevList, response.data])
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

  const handleDeleteUser = useCallback(async (id: string) => {
    try {
      await toast.promise(api.delete(`users/${id}`), {
        pending: 'Deletando Usuário',
        success: 'Usuário Deletado com Sucesso!',
        error: 'Ops! Verifique os Dados Digitados',
      })
      setListUsers((prevList) => prevList.filter((user) => user.id !== id))
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
        getAllUsers,
        setLinkMenuSelected,
        linkMenuSelected,
        listUsers,
        setUserDataLogin,
        handleDeleteUser,
        currentPage,
        setCurrentPage,
        pagination,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
