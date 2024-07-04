import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from '@react-pdf/renderer'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import ImageLogo from '../../assets/Logo-Cartorio.jpg'
import { AssociationProps } from '../../contexts/RequerimentContext'
import { ResponseDataUser } from '../../contexts/UserContext'

interface DataProps {
  data: AssociationProps
  dataUser: ResponseDataUser
  infoDivergente?: string
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#FFF' },
  header: {
    margin: 30,
    marginBottom: 30,
  },
  main: {
    margin: 30,
    marginBottom: 10,
  },
  headerImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentInfoUser: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start',
    margin: 30,
    marginBottom: 0,
  },
  image: {
    width: 150,
  },
  titleText: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 30,
    textAlign: 'center',
  },
  titleList: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 20,
  },
  text: {
    fontSize: 9,
    marginBottom: 8,
  },
  textheader2: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 3,
  },
  titleInfo: {
    fontSize: 10,
    fontWeight: 500,
  },
  textInfo: {
    fontSize: 10,
  },
  textFooter: {
    fontSize: 11,
    fontWeight: 700,
    textAlign: 'center',
  },
})

export const CreatePdfList = ({
  data,
  dataUser,
  infoDivergente,
}: DataProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerImage}>
          <Image src={ImageLogo} style={styles.image} />
        </View>
        <View style={styles.header}>
          <Text style={styles.titleList}>
            Nº do Exame: {data.numero_do_protocolo}
          </Text>

          <Text style={styles.textheader2}>
            Data da Recepção:{' '}
            {data.createdAt &&
              format(new Date(data.createdAt), 'dd/MM/yyyy', {
                locale: ptBR,
              })}
          </Text>

          {data.updatedAt === '' && (
            <Text style={styles.textheader2}>
              Data da Exigência: {data.updatedAt}
            </Text>
          )}
          <Text style={styles.textheader2}>
            Nome da Instituição: {data.nome_da_instituicao}
          </Text>

          <Text style={styles.textheader2}>
            CNPJ ou CPF: {data && data.cnpj_cpf}
          </Text>

          <Text style={styles.textheader2}>
            Nome do Representante: {data.nome_do_representante}
          </Text>
          <Text style={styles.textheader2}>
            Email do Representante: {data.email_do_representante}
          </Text>
        </View>

        <View style={styles.main}>
          <Text style={styles.titleText}>Lista de Exigências Pendentes</Text>

          {data.exigencias?.lista_e_edital === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar lista de presença e edital; (CNCGJ Art. 951)
            </Text>
          )}
          {data.exigencias?.declaracao_sindical === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar declaração emitida pelo Ministério do Trabalho
              referente a unicidade sindical e da base territorial (CNCGJ Art.
              935 § 4º)
            </Text>
          )}
          {data.exigencias?.assinatura_do_advogado === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Colher assinatura do advogado no ato apresentado para
              registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)
            </Text>
          )}

          {data.exigencias?.declaracao_criminal === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar declaração de desimpedimento e/ou certidão
              criminal; (CNCGJ Art. 932 § 1º)
            </Text>
          )}

          {data.exigencias?.requisitos_estatuto === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar cópia do estatuto registrado no Distrito Federal
              (Obs:para diretórios de partidos políticos); (CNCGJ Art. 945)
            </Text>
          )}

          {data.exigencias?.declaracao_de_desimpedimento === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar declaração de desimpedimento (contratos e
              averbações de sociedade simples, ME, EPP); (CNCGJ)
            </Text>
          )}

          {data.exigencias?.livro_rasao === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar livro razão ou contábil anteriormente registrado;
              (CNCGJ Art. 960 § 1º)
            </Text>
          )}

          {data.exigencias?.ppe === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar declaração de pessoa politicamente exposta (PPE)
            </Text>
          )}

          {data.exigencias?.requisitos_de_estatutos_fundadores ===
            'Pendente' && (
            <Text style={styles.text}>
              [ ] No caso de dissolução ou extinção deverá conter no documento:
              (liquidação, divisão de cotas de sócios, inexistência de ativo e
              passivo, guarda dos livros etc.) (CNCGJ Art. 953)
            </Text>
          )}

          {data.exigencias?.dissolucao_ou_exticao === 'Pendente' && (
            <Text style={styles.text}>
              [ ] No caso de dissolução ou extinção apresentar o documento:
              (liquidação, divisão de cotas de sócios, inexistência de ativo e
              passivo, guarda dos livros etc.) (CNCGJ Art. 953)
            </Text>
          )}

          {data.exigencias?.fundacoes === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Nos atos referentes a fundações, exigir-se-á aprovação prévia
              do Ministério Público; (CNCGJ Art. 941)
            </Text>
          )}

          {data.exigencias?.reconhecimento_de_firma === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar reconhecimento de firme no requerimento do DBE
            </Text>
          )}

          {data.exigencias?.preechimento_completo === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Preencher todos os campos do formulário/requerimento
            </Text>
          )}

          {data.exigencias?.oab === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar cópia da OAB do representante jurídico do ato
              apresentado
            </Text>
          )}

          {data.exigencias?.documentacao_de_identificacao === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar cópia simples do documento de identificação
            </Text>
          )}

          {data.exigencias?.requisitos_de_estatutos_fundadores ===
            'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar os requisitos obrigatórios no Estatuto: relação de
              documentos de fundadores; ( CNCGJ Art. 945 / Lei 6.015 no Art. 120
              / Lei 10.406 Art. 46)
            </Text>
          )}

          {data.exigencias?.requisitos_criacao_de_estatuto === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Apresentar os requisitos obrigatórios para criação do
              estatuto; (Lei 10.406/2002 Art. 54)
            </Text>
          )}

          {data.exigencias?.retificacao_de_redacao === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Retificar redação do documento apresentado:
            </Text>
          )}

          {data.exigencias?.campo_de_assinatura === 'Pendente' && (
            <Text style={styles.text}>
              [ ] Preencher todos os campos de assinatura
            </Text>
          )}

          {data.exigencias?.informacao_divergente === 'Pendente' && (
            <Text style={styles.text}>[ ] {infoDivergente}</Text>
          )}
        </View>

        <View style={styles.contentInfoUser}>
          <Text style={styles.titleInfo}>
            Funcionário Responsável Pela Análise: {dataUser.name}
          </Text>
          <Text style={styles.titleInfo}>
            Matricula: {dataUser.registration}
          </Text>
        </View>

        <View style={styles.main}>
          <Text style={styles.titleInfo}>Informações importantes:</Text>
          <Text style={styles.textInfo}> - Prazo para análize 15 dias</Text>
          <Text style={styles.textInfo}>
            - Cumprimento de exigencia 30 dias
          </Text>
          <Text style={styles.textInfo}>
            - Prazo de registro de 30 dias satifesta as exigencias necessárias.
          </Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.textFooter}>
            Rua Pereira de Souza, nº 104 - Centro, Macaé, RJ CEP:27.913-110
          </Text>
          <Text style={styles.textFooter}>
            Tel: (22) 2106-1902 WhatsApp: (22) 99979.6222
          </Text>
          <Text style={styles.textFooter}>
            E-mail: rtd-pj@macae1oficio.com.br
          </Text>
        </View>
      </Page>
    </Document>
  )
}
