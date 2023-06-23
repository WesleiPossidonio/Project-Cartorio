import { useNavigate } from 'react-router-dom'

import { MenuPage } from '../../components/MenuPage'
import { TitleText } from '../../components/typography'
import { useRequeriment } from '../../hooks/useRequeriment'
import {
  ContainerButton,
  ContainerHome,
  ContainerList,
  Content,
  ContentDataClient,
  ContentList,
  ContentRequeriement,
} from './style'

export const CuratedList = () => {
  const { selectAListRequeriment } = useRequeriment()
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

            {selectAListRequeriment.map((data) => {
              return (
                <div key={data.id}>
                  <h4>
                    Nª do Exame:
                    <strong>{data.numero_do_protocolo}</strong>
                  </h4>
                  <h4>
                    Nome da Instituição:{' '}
                    <strong>{data.nome_da_instituicao}</strong>{' '}
                  </h4>
                  <h4>
                    Data de Análize: <strong>23/06/2023</strong>{' '}
                  </h4>
                  <h4>
                    CNPJ: <strong>{data.cnpj}</strong>{' '}
                  </h4>
                  <h4>
                    Nome do Representante:{' '}
                    <strong>{data.nome_do_representante}</strong>{' '}
                  </h4>
                  <h4>
                    E-mail: <strong>{data.email_do_representante}</strong>{' '}
                  </h4>
                  <h4>
                    Nº Telefone de contato:{' '}
                    <strong>{data.telefone_contato}</strong>{' '}
                  </h4>
                </div>
              )
            })}
          </ContentDataClient>

          <TitleText size="s">Lista de Exigência</TitleText>

          {selectAListRequeriment.map((data) => {
            return (
              <ContainerList key={data.id}>
                <ContentList>
                  <div>
                    <h4>
                      Apresentou declaração emitida pelo Ministério do Trabalho
                      referente a unicidade sindical e da base territorial;
                      (CNCGJ Art. 935 § 4º)?
                    </h4>
                    <h6>{data.declaracao_sindical}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou lista de presença e edital; (CNCGJ Art. 951)?
                    </h4>
                    <h6>{data.lista_e_edital}</h6>
                  </div>

                  <div>
                    <h4>
                      Colheu assinatura do advogado no ato apresentado para
                      registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)?
                    </h4>
                    <h6>{data.assinatura_do_advogado}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou declaração de desimpedimento e/ou certidão
                      criminal; (CNCGJ Art. 932 § 1º)?
                    </h4>
                    <h6>{data.declaracao_criminal}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou declaração de desimpedimento (contratos e
                      averbações de sociedade simples, ME, EPP); (CNCGJ Art.
                      938)
                    </h4>
                    <h6>{data.declaracao_de_desimpedimento}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou livro razão ou contábil anteriormente
                      registrado; (CNCGJ Art. 960 § 1º)
                    </h4>
                    <h6>{data.livro_rasao}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou cópia do estatuto registrado no Distrito
                      Federal (Obs:para diretórios de partidos políticos);
                      (CNCGJ Art. 945)
                    </h4>
                    <h6>{data.requisitos_estatuto}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou declaração de pessoa politicamente exposta
                      (PPE); (Provimento CNJ 88/2019)
                    </h4>
                    <h6>{data.ppe}</h6>
                  </div>
                </ContentList>

                <div></div>

                <ContentList>
                  <div>
                    <h4>
                      Apresentou os requisitos obrigatórios para criação do
                      estatuto; (Lei 10.406/2002 Art. 54)
                    </h4>
                    <h6>{data.requisitos_estatuto}</h6>
                  </div>

                  <div>
                    <h4>
                      No caso de dissolução ou extinção houve no documento:
                      (liquidação, divisão de cotas de sócios, inexistência de
                      ativo e passivo, guarda dos livros etc.) (CNCGJ Art. 953)
                      ?
                    </h4>
                    <h6>{data.dissolucao_ou_exticao}</h6>
                  </div>

                  <div>
                    <h4>
                      Nos atos referentes a fundações, exigir-se-á aprovação
                      prévia do Ministério Público; (CNCGJ Art. 941) ?
                    </h4>
                    <h6>{data.fundacoes}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou os requisitos obrigatórios no Estatuto: relação
                      de documentos de fundadores; ( CNCGJ Art. 945 / Lei 6.015
                      no Art. 120 / Lei 10.406 Art. 46) ?
                    </h4>
                    <h6>{data.requisitos_estatuto}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou reconhecimento de firme no requerimento do DBE
                      ?
                    </h4>
                    <h6>{data.reconhecimento_de_firma}</h6>
                  </div>

                  <div>
                    <h4>
                      Preencheu todos os campos do formulário/requerimento ?
                    </h4>
                    <h6>{data.campo_de_assinatura}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou cópia da OAB do representante jurídico do ato
                      apresentado ?
                    </h4>
                    <h6>{data.oab}</h6>
                  </div>

                  <div>
                    <h4>
                      Apresentou cópia simples do documento de identificação de:
                    </h4>
                    <h6>{data.documentacao_de_identificacao}</h6>
                  </div>

                  <div>
                    <h4>Divergência de informação?</h4>
                    <h6>{data.informacao_divergente}</h6>
                  </div>
                </ContentList>
              </ContainerList>
            )
          })}

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
