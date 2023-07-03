import { User } from 'phosphor-react'

import Logo from '../../assets/Logo-Cartorio.svg'
import { useUser } from '../../hooks/useUser'
import { TextRegular } from '../typography'
import {
  ContainerHeader,
  ContainerUser,
  DataUserName,
  ImageLogo,
  Line,
} from './style'

export const Header = () => {
  const { userDataLogin } = useUser()
  return (
    <ContainerHeader>
      <ImageLogo src={Logo} alt="" />
      <ContainerUser>
        <User fontSize={32} />
        <Line></Line>
        <DataUserName>
          <TextRegular>Olá</TextRegular>
          <TextRegular size="l">Dr. {userDataLogin?.name}</TextRegular>
        </DataUserName>
      </ContainerUser>
    </ContainerHeader>
  )
}
