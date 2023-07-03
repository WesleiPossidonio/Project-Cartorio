import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { MenuPage } from '../../components/MenuPage'
import { TitleText } from '../../components/typography'
import { ListRequerimentProps } from '../../contexts/RequerimentContext'
import {
  ContainerButton,
  ContainerHome,
  ContainerList,
  Content,
  ContentDataClient,
  ContentList,
  ContentRequeriement,
} from './style'

interface LocationProps {
  state: ListRequerimentProps
}

export const CuratedList = () => {
  const { state } = useLocation() as unknown as LocationProps

  const navigate = useNavigate()

  const handleNavidateToHome = () => {
    navigate('/')
  }

  return (
    <ContainerHome>
      <MenuPage />
      <ContentRequeriement>
        <TitleText size="s">Lista Selecionada</TitleText>
        <button onClick={handleNavidateToHome}>Voltar ao Inicio</button>
        <Content>
          <ContentDataClient>
            <TitleText size="s">Dados do Solicitante</TitleText>
            <div>
              <h4>
                Nª do Exame:
                <strong>{state.numero_do_protocolo}</strong>
              </h4>
              <h4>
                Nome da Instituição:{' '}
                <strong>{state.nome_da_instituicao}</strong>{' '}
              </h4>
              <h4>
                Data de Análize: <strong>23/06/2023</strong>{' '}
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
            <ContentList>
              {state.declaracao_sindical === 'Sim' && (
                <h4>
                  Apresentar declaração emitida pelo Ministério do Trabalho
                  referente a unicidade sindical e da base territorial; (CNCGJ
                  Art. 935 § 4º)?
                </h4>
              )}

              {state.lista_e_edital === 'Sim' && (
                <h4>
                  Apresentou lista de presença e edital; (CNCGJ Art. 951)?
                </h4>
              )}

              {state.assinatura_do_advogado === 'Sim' && (
                <h4>
                  Colheu assinatura do advogado no ato apresentado para
                  registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)?
                </h4>
              )}

              {state.declaracao_criminal === 'Sim' && (
                <h4>
                  Apresentou declaração de desimpedimento e/ou certidão
                  criminal; (CNCGJ Art. 932 § 1º)?
                </h4>
              )}

              {state.declaracao_de_desimpedimento === 'Sim' && (
                <h4>
                  Apresentou declaração de desimpedimento (contratos e
                  averbações de sociedade simples, ME, EPP); (CNCGJ Art. 938)
                </h4>
              )}

              {state.livro_rasao === 'Sim' && (
                <h4>
                  Apresentou livro razão ou contábil anteriormente registrado;
                  (CNCGJ Art. 960 § 1º)
                </h4>
              )}

              {state.requisitos_estatuto === 'Sim' && (
                <h4>
                  Apresentou cópia do estatuto registrado no Distrito Federal
                  (Obs:para diretórios de partidos políticos); (CNCGJ Art. 945)
                </h4>
              )}

              {state.ppe === 'Sim' && (
                <h4>
                  Apresentou declaração de pessoa politicamente exposta (PPE);
                  (Provimento CNJ 88/2019)
                </h4>
              )}
            </ContentList>

            <div></div>

            <ContentList>
              {state.requisitos_estatuto === 'Sim' && (
                <h4>
                  Apresentou os requisitos obrigatórios para criação do
                  estatuto; (Lei 10.406/2002 Art. 54)
                </h4>
              )}

              {state.requisitos_estatuto === 'Sim' && (
                <h4>
                  Apresentou os requisitos obrigatórios para criação do
                  estatuto; (Lei 10.406/2002 Art. 54)
                </h4>
              )}

              {state.dissolucao_ou_exticao === 'Sim' && (
                <h4>
                  No caso de dissolução ou extinção houve no documento:
                  (liquidação, divisão de cotas de sócios, inexistência de ativo
                  e passivo, guarda dos livros etc.) (CNCGJ Art. 953) ?
                </h4>
              )}

              {state.fundacoes === 'Sim' && (
                <h4>
                  Nos atos referentes a fundações, exigir-se-á aprovação prévia
                  do Ministério Público; (CNCGJ Art. 941) ?
                </h4>
              )}

              {state.requisitos_estatuto === 'Sim' && (
                <h4>
                  Apresentou os requisitos obrigatórios no Estatuto: relação de
                  documentos de fundadores; ( CNCGJ Art. 945 / Lei 6.015 no Art.
                  120 / Lei 10.406 Art. 46) ?
                </h4>
              )}

              {state.reconhecimento_de_firma === 'Sim' && (
                <h4>
                  Apresentar reconhecimento de firme no requerimento do DBE
                </h4>
              )}

              {state.campo_de_assinatura === 'Sim' && (
                <h4>Preencheu todos os campos do formulário/requerimento ?</h4>
              )}

              {state.oab === 'Sim' && (
                <h4>
                  Apresentou cópia da OAB do representante jurídico do ato
                  apresentado ?
                </h4>
              )}

              {state.documentacao_de_identificacao && (
                <h4>
                  Apresentou cópia simples do documento de identificação de:
                </h4>
              )}

              {state.informacao_divergente === 'Sim' && (
                <h4>Divergência de informação</h4>
              )}
            </ContentList>
          </ContainerList>

          <ContainerButton>
            <button>Atualizar Lista</button>
            <button>Imprimir</button>
            <button>Enviar Por E-mail</button>
          </ContainerButton>
        </Content>
      </ContentRequeriement>
    </ContainerHome>
  )
}
