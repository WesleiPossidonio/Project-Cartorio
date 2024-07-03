import { PDFDownloadLink } from '@react-pdf/renderer'

import { Button, TextRegular } from '../../..'
import { AssociationProps } from '../../../../contexts/RequerimentContext'
import { useUser } from '../../../../hooks/useUser'
import { CreateRequerimentConclutedPdf } from '../../../CreateRequerimentComclutedPdf'
import {
  ContainerModal,
  ContainerRequeriments,
  ContentText,
  HeaderModal,
  TextListModal,
} from './styled'

interface ListRequerimentCompletedProps {
  RequerimentCompleted?: AssociationProps
}

export const ListRequerimentCompleted = ({
  RequerimentCompleted,
}: ListRequerimentCompletedProps) => {
  const { userDataLogin } = useUser()

  console.log(RequerimentCompleted)

  return (
    <div>
      <ContainerModal>
        <HeaderModal>
          <ContentText>
            <TextRegular weight={700} size="m">
              {' '}
              Nome da Instituição:
            </TextRegular>
            <TextRegular>
              {RequerimentCompleted?.nome_da_instituicao}
            </TextRegular>
          </ContentText>
          <ContentText>
            <TextRegular weight={700} size="m">
              Nº CNPJ:
            </TextRegular>
            <TextRegular>{RequerimentCompleted?.cnpj_cpf}</TextRegular>
          </ContentText>
          <ContentText>
            <TextRegular weight={700} size="m">
              Nome do Representante:
            </TextRegular>
            <TextRegular>
              {RequerimentCompleted?.nome_do_representante}
            </TextRegular>
          </ContentText>
          <ContentText>
            <TextRegular weight={700} size="m">
              Email do Representante:
            </TextRegular>
            <TextRegular>
              {RequerimentCompleted?.email_do_representante}
            </TextRegular>
          </ContentText>
        </HeaderModal>

        <TextRegular weight={600}>Lista de Exigencias</TextRegular>

        <ContainerRequeriments>
          {RequerimentCompleted?.exigencias?.assinatura_do_advogado ===
            'Recebido' && (
            <TextListModal>
              Colher assinatura do advogado no ato apresentado para registro;
              <span> (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)</span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.campo_de_assinatura ===
            'Recebido' && (
            <TextListModal>
              Preencher todos os campos de assinatura;
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.declaracao_criminal ===
            'Recebido' && (
            <TextListModal>
              Apresentar declaração de desimpedimento e/ou certidão criminal;
              <span> (CNCGJ Art. 932 § 1º) </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.declaracao_de_desimpedimento ===
            'Recebido' && (
            <TextListModal>
              Apresentar declaração de desimpedimento{' '}
              <span>
                (contratos e averbações de sociedade simples, ME, EPP); (CNCGJ
                Art. 938)
              </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.declaracao_sindical ===
            'Recebido' && (
            <TextListModal>
              Apresentar declaração emitida pelo Ministério do Trabalho
              referente a unicidade sindical e da base territorial;{' '}
              <span> (CNCGJ Art. 935 § 4º) </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.dissolucao_ou_exticao ===
            'Recebido' && (
            <TextListModal>
              No caso de dissolução ou extinção apresentar o documento;
              <span>
                (liquidação, divisão de cotas de sócios, inexistência de ativo e
                passivo, guarda dos livros etc.) (CNCGJ Art. 953)
              </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.documentacao_de_identificacao ===
            'Recebido' && (
            <TextListModal>
              Apresentar cópia simples do documento de identificação
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.fundacoes === 'Recebido' && (
            <TextListModal>
              Nos atos referentes a fundações, exigir-se-á aprovação prévia do
              Ministério Público;
              <span>(CNCGJ Art. 941)</span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.informacao_divergente !==
            'Não há informações divergente' && (
            <TextListModal>
              {RequerimentCompleted?.exigencias?.informacao_divergente}
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.lista_e_edital === 'Recebido' && (
            <TextListModal>
              Apresentar lista de presença e edital;
              <span> (CNCGJ Art. 951) </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.livro_rasao === 'Recebido' && (
            <TextListModal>
              Apresentar livro razão ou contábil anteriormente registrado;
              <span>(CNCGJ Art. 960 § 1º)</span>
            </TextListModal>
          )}

          {RequerimentCompleted?.exigencias?.oab === 'Recebido' && (
            <TextListModal>
              Apresentar cópia da OAB do representante jurídico do ato
              apresentado
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.ppe === 'Recebido' && (
            <TextListModal>
              Apresentar declaração de pessoa politicamente exposta (PPE)
              <span>(Provimento CNJ 88/2019)</span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.preechimento_completo ===
            'Recebido' && (
            <TextListModal>
              No caso de dissolução ou extinção apresentar o documento;
              <span>
                (liquidação, divisão de cotas de sócios, inexistência de ativo e
                passivo, guarda dos livros etc.) (CNCGJ Art. 953)
              </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.reconhecimento_de_firma ===
            'Recebido' && (
            <TextListModal>
              presentar reconhecimento de firme no requerimento do DBE
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.requisitos_criacao_de_estatuto ===
            'Recebido' && (
            <TextListModal>
              Apresentar os requisitos obrigatórios para criação do estatuto;
              <span>(Lei 10.406/2002 Art. 54)</span>
            </TextListModal>
          )}

          {RequerimentCompleted?.exigencias
            ?.requisitos_de_estatutos_fundadores === 'Recebido' && (
            <TextListModal>
              Apresentar os requisitos obrigatórios no Estatuto: relação de
              documentos de fundadores;
              <span>
                ( CNCGJ Art. 945 / Lei 6.015 no Art. 120 / Lei 10.406 Art. 46)
              </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.requisitos_estatuto ===
            'Recebido' && (
            <TextListModal>
              Apresentar cópia do estatuto registrado no Distrito Federal
              <span>
                (Obs:para diretórios de partidos políticos); (CNCGJ Art. 945)
              </span>
            </TextListModal>
          )}
          {RequerimentCompleted?.exigencias?.retificacao_de_redacao ===
            'Recebido' && (
            <TextListModal>
              Retificar redação do documento apresentado;
            </TextListModal>
          )}
        </ContainerRequeriments>

        <div className="PdfContainer">
          <PDFDownloadLink
            document={
              <CreateRequerimentConclutedPdf
                data={RequerimentCompleted}
                dataUser={userDataLogin}
              />
            }
            fileName={`exigencia${RequerimentCompleted?.numero_do_protocolo}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button type="button">Carregando PDF</Button>
              ) : (
                <Button type="button">Imprimir</Button>
              )
            }
          </PDFDownloadLink>
        </div>
      </ContainerModal>
    </div>
  )
}
