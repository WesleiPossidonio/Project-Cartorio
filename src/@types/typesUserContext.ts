export interface UserLoginProps {
  name: string
  password: string
}

export interface ResponseDataUser {
  id: string
  admin: boolean
  registration: string
  name: string
  token: string
  email: string
}

export interface UserData extends ResponseDataUser {
  id: string
  createdAt: string
  updatedAt: string
}

export interface CreaterUser {
  admin: boolean
  name: string
  password: string
  registration: string
  email: string
}

export interface UpdateUser {
  id: string
  name: string
  password: string
  registration: string
  email: string
}

export interface UserPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface ConfirmMailProps {
  email: string
}

export interface UpdatePasswordProps {
  password: string
  confirmPassword: string
  updateNumber: string
}