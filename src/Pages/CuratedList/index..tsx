import { PDFDownloadLink } from '@react-pdf/renderer'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Button,
  CreateRequerimentPdfList,
  MenuPage,
  TextRegular,
  TitleText,
} from '../../components'
import { AssociationProps } from '../../contexts/RequerimentContext'
import { useRequeriment } from '../../hooks/useRequeriment'
import { useUser } from '../../hooks/useUser'
import {
  ContainerButton,
  ContainerHome,
  ContainerList,
  Content,
  ContentDataClient,
  ContentDataList,
  ContentList,
  ContentRequeriement,
} from './style'

interface LocationProps {
  state: AssociationProps
}

export const CuratedList = () => {
  const { state } = useLocation() as unknown as LocationProps
  const { sendMail, updateRequeriment } = useRequeriment()

  const { userDataLogin } = useUser()

  const navigate = useNavigate()

  const handleNavidateToHome = () => {
    navigate('/')
  }

  const handleUpdateDataUser = () => {
    navigate('/atualizar-lista', {
      state,
    })
  }

  const handleSendMail = () => {
    const dataSendMail = state
    const { name, registration } = userDataLogin

    const ListSendMail = {
      ...dataSendMail,
      updateMail: true,
      name,
      registration,
    }

    sendMail(ListSendMail)
  }

  const handleCompletedList = () => {
    updateRequeriment({ ...state, handleListConcluted: true })
  }

  return (
    <ContainerHome>
      <MenuPage />
      <ContentRequeriement>
        <TitleText size="s">Lista Selecionada</TitleText>
        <Button onClick={handleNavidateToHome}>Voltar ao Inicio</Button>
        <Content>
          <ContentDataClient>
            <TitleText size="s">Dados do Solicitante</TitleText>
            <div>
              <h4>
                Nome da Instituição:{' '}
                <strong>{state.nome_da_instituicao}</strong>{' '}
              </h4>

              <h4>
                CNPJ: <strong>{state.cnpj}</strong>{' '}
              </h4>
              <h4>
                Nome do Representante:{' '}
                <strong>{state.nome_do_representante}</strong>{' '}
              </h4>
              <h4>
                E-mail: <strong>{state.email_do_representante}</strong>{' '}
              </h4>
              <h4>
                Nº Telefone de contato:{' '}
                <strong>{state.telefone_contato}</strong>{' '}
              </h4>
            </div>
          </ContentDataClient>
          <TitleText size="s">Lista de Exigência</TitleText>
          <ContainerList>
            <ContentDataList>
              <div>
                <h4>
                  Nª do Exame:
                  <strong>{state.numero_do_protocolo}</strong>
                </h4>
                <h4>
                  Data de Análize: <strong>{state.data_da_recepcao}</strong>{' '}
                </h4>
              </div>

              {state.exigencias !== undefined &&
                state.exigencias.map((exigencia) => {
                  return (
                    <ContentList key={exigencia.id}>
                      {exigencia.lista_e_edital === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar lista de presença e edital; (CNCGJ Art.
                          951)
                        </TextRegular>
                      )}

                      {exigencia.declaracao_sindical === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar declaração emitida pelo Ministério do
                          Trabalho referente a unicidade sindical e da base
                          territorial (CNCGJ Art. 935 § 4º)
                        </TextRegular>
                      )}

                      {exigencia.assinatura_do_advogado === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Colher assinatura do advogado no ato apresentado para
                          registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 §
                          3º)
                        </TextRegular>
                      )}

                      {exigencia.declaracao_criminal === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar declaração de desimpedimento e/ou certidão
                          criminal; (CNCGJ Art. 932 § 1º)
                        </TextRegular>
                      )}

                      {exigencia.requisitos_estatuto === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar cópia do estatuto registrado no Distrito
                          Federal (Obs:para diretórios de partidos políticos);
                          (CNCGJ Art. 945)
                        </TextRegular>
                      )}

                      {exigencia.declaracao_de_desimpedimento ===
                        'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar declaração de desimpedimento; (contratos e
                          averbações de sociedade simples, ME, EPP); (CNCGJ)
                        </TextRegular>
                      )}

                      {exigencia.livro_rasao === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar livro razão ou contábil anteriormente
                          registrado; (CNCGJ Art. 960 § 1º)
                        </TextRegular>
                      )}

                      {exigencia.ppe === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar declaração de pessoa politicamente exposta
                          (PPE); (Provimento CNJ 88/2019)
                        </TextRegular>
                      )}

                      {exigencia.dissolucao_ou_exticao === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          No caso de dissolução ou extinção apresentar o
                          documento; (liquidação, divisão de cotas de sócios,
                          inexistência de ativo e passivo, guarda dos livros
                          etc.) (CNCGJ Art. 953)
                        </TextRegular>
                      )}

                      {exigencia.fundacoes === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Nos atos referentes a fundações, exigir-se-á aprovação
                          prévia do Ministério Público; (CNCGJ Art. 941)
                        </TextRegular>
                      )}

                      {exigencia.reconhecimento_de_firma === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar reconhecimento de firme no requerimento do
                          DBE
                        </TextRegular>
                      )}

                      {exigencia.preechimento_completo === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Preencher todos os campos do formulário/requerimento
                        </TextRegular>
                      )}

                      {exigencia.oab === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar cópia da OAB do representante jurídico do
                          ato apresentado
                        </TextRegular>
                      )}

                      {exigencia.documentacao_de_identificacao ===
                        'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar cópia simples do documento de identificação
                        </TextRegular>
                      )}

                      {exigencia.requisitos_de_estatutos_fundadores ===
                        'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar os requisitos obrigatórios no Estatuto:
                          relação de documentos de fundadores; ( CNCGJ Art. 945
                          / Lei 6.015 no Art. 120 / Lei 10.406 Art. 46)
                        </TextRegular>
                      )}

                      {exigencia.requisitos_criacao_de_estatuto ===
                        'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Apresentar os requisitos obrigatórios para criação do
                          estatuto; (Lei 10.406/2002 Art. 54)
                        </TextRegular>
                      )}

                      {exigencia.retificacao_de_redacao === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Retificar redação do documento apresentado;
                        </TextRegular>
                      )}

                      {exigencia.campo_de_assinatura === 'Pendente' && (
                        <TextRegular size="s" weight={700}>
                          Preencher todos os campos de assinatura;
                        </TextRegular>
                      )}
                    </ContentList>
                  )
                })}
            </ContentDataList>
          </ContainerList>

          <ContainerButton>
            <Button onClick={handleCompletedList}>Concluir Lista</Button>
            <Button onClick={handleUpdateDataUser}>Atualizar Lista</Button>
            <PDFDownloadLink
              className="button"
              document={
                <CreateRequerimentPdfList
                  data={state}
                  dataUser={userDataLogin}
                />
              }
              fileName="Exigência"
            >
              {({ loading }) => (loading ? 'Carregando PDF' : 'Imprimir')}
            </PDFDownloadLink>

            <Button onClick={handleSendMail}>Enviar Por E-mail</Button>
          </ContainerButton>
        </Content>
      </ContentRequeriement>
    </ContainerHome>
  )
}
