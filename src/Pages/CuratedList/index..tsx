import { PDFDownloadLink } from '@react-pdf/renderer'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  Button,
  CreatePdfList,
  MenuPage,
  TextRegular,
  TitleText,
} from '../../components'
import { ListRequerimentProps } from '../../contexts/RequerimentContext'
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
  state: ListRequerimentProps
}

export const CuratedList = () => {
  const { state } = useLocation() as unknown as LocationProps
  const { sendMail } = useRequeriment()

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
    const dataSendMAil = state
    sendMail(dataSendMAil)
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
                  Data de Análize: <strong>23/06/2023</strong>{' '}
                </h4>
              </div>

              <ContentList>
                {state.declaracao_sindical === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar declaração emitida pelo Ministério do Trabalho
                    referente a unicidade sindical e da base territorial; (CNCGJ
                    Art. 935 § 4º)
                  </TextRegular>
                )}

                {state.lista_e_edital === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar lista de presença e edital; (CNCGJ Art. 951)
                  </TextRegular>
                )}

                {state.assinatura_do_advogado === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Colher assinatura do advogado no ato apresentado para
                    registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)
                  </TextRegular>
                )}

                {state.declaracao_criminal === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar declaração de desimpedimento e/ou certidão
                    criminal; (CNCGJ Art. 932 § 1º)
                  </TextRegular>
                )}

                {state.declaracao_de_desimpedimento === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar declaração de desimpedimento (contratos e
                    averbações de sociedade simples, ME, EPP); (CNCGJ Art. 938)
                  </TextRegular>
                )}

                {state.livro_rasao === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar livro razão ou contábil anteriormente registrado;
                    (CNCGJ Art. 960 § 1º)
                  </TextRegular>
                )}

                {state.requisitos_estatuto === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar cópia do estatuto registrado no Distrito Federal
                    (Obs:para diretórios de partidos políticos); (CNCGJ Art.
                    945)
                  </TextRegular>
                )}

                {state.ppe === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar declaração de pessoa politicamente exposta (PPE);
                    (Provimento CNJ 88/2019)
                  </TextRegular>
                )}

                {state.requisitos_estatuto === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar os requisitos obrigatórios para criação do
                    estatuto; (Lei 10.406/2002 Art. 54)
                  </TextRegular>
                )}

                {state.requisitos_estatuto === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar os requisitos obrigatórios para criação do
                    estatuto; (Lei 10.406/2002 Art. 54)
                  </TextRegular>
                )}

                {state.dissolucao_ou_exticao === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    No caso de dissolução ou extinção houve no documento:
                    (liquidação, divisão de cotas de sócios, inexistência de
                    ativo e passivo, guarda dos livros etc.) (CNCGJ Art. 953)
                  </TextRegular>
                )}

                {state.fundacoes === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Nos atos referentes a fundações, exigir-se-á aprovação
                    prévia do Ministério Público; (CNCGJ Art. 941)
                  </TextRegular>
                )}

                {state.requisitos_estatuto === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar os requisitos obrigatórios no Estatuto: relação
                    de documentos de fundadores; ( CNCGJ Art. 945 / Lei 6.015 no
                    Art. 120 / Lei 10.406 Art. 46)
                  </TextRegular>
                )}

                {state.reconhecimento_de_firma === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar reconhecimento de firme no requerimento do DBE
                  </TextRegular>
                )}

                {state.campo_de_assinatura === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Preencheu todos os campos do formulário/requerimento{' '}
                  </TextRegular>
                )}

                {state.oab === 'Sim' && (
                  <TextRegular size="s" weight={700}>
                    Apresentar cópia da OAB do representante jurídico do ato
                    apresentado
                  </TextRegular>
                )}

                {state.documentacao_de_identificacao && (
                  <TextRegular size="s" weight={700}>
                    Apresentar cópia simples do documento de identificação de:
                  </TextRegular>
                )}

                {state.informacao_divergente === 'Sim' && (
                  <TextRegular>Divergência de informação</TextRegular>
                )}
              </ContentList>
            </ContentDataList>
          </ContainerList>

          <ContainerButton>
            <Button onClick={handleUpdateDataUser}>Atualizar Lista</Button>
            <PDFDownloadLink
              className="button"
              document={<CreatePdfList data={state} dataUser={userDataLogin} />}
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
