import { MenuPage } from '../../components/MenuPage'
import { HeaderContent } from './components/HeaderContent'
import { TableRequeriment } from './components/ListRequeriment'
import { ContainerHome, ContainerMainList, ContentRequeriement } from './style'

export const CompletedAplicationList = () => {
  return (
    <ContainerHome>
      <MenuPage />
      <ContentRequeriement>
        <ContainerMainList>
          <HeaderContent />
          <TableRequeriment />
        </ContainerMainList>
      </ContentRequeriement>
    </ContainerHome>
  )
}
