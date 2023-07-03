import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Alignment, Content } from 'pdfmake/interfaces'

import pdfImage from '../../assets/imagePdf.svg'
import { ListRequerimentProps } from '../../contexts/RequerimentContext'
import { useUser } from '../../hooks/useUser'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export const PdfGenerator = (data: ListRequerimentProps) => {
  const { userDataLogin } = useUser()

  const completedApplicationList = Object.entries(data).filter(
    ([key, value]) => {
      return value === 'Sim'
    }
  )

  const listCompletedFiltered = Object.fromEntries(completedApplicationList)

  const documentDefinition = {
    pageSize: { width: 595.28, height: 841.89 },
    pageMargins: [15, 50, 15, 40] as [number, number, number, number],
    content: [
      {
        image: pdfImage,
        width: 595.28,
        height: 150,
        style: 'imageHeader',
      },
      [
        {
          text: `Nome da Instituição: ${data.nome_da_instituicao}`,
          style: 'header',
        },
        { text: `CNPJ: ${data.cnpj}`, style: 'header' },

        {
          text: `Nome do Representante: ${data.nome_do_representante}`,
          style: 'header',
        },
        {
          text: `E-mail do Representante: ${data.email_do_representante}`,
          style: 'header',
        },
      ],
      { text: 'LISTA DE EXIGENCIAS', style: 'title' },

      {
        text: `Nº Protocolo: ${data.numero_do_protocolo}`,
        style: 'subTitle',
      },

      { text: 'Lista de exigencias Concluídas', style: 'subTitle' },

      {
        ul: [
          listCompletedFiltered.lista_e_edital &&
            'Apresentou lista de presença e edital; (CNCGJ Art. 951)',

          listCompletedFiltered.listCompletedFiltered &&
            'Apresentou declaração emitida pelo Ministério do Trabalho \n referente a unicidade sindical e da base territorial; (CNCGJ Art. 935 § 4º)',

          listCompletedFiltered.assinatura_do_advogado &&
            'Colheu assinatura do advogado no ato apresentado para registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)',

          listCompletedFiltered.declaracao_de_desimpedimento &&
            'Colheu assinatura do advogado no ato apresentado para registro; (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)',

          listCompletedFiltered.livro_rasao &&
            'Apresentou livro razão ou contábil anteriormente registrado; (CNCGJ Art. 960 § 1º)',

          listCompletedFiltered.ppe &&
            'Apresentou declaração de pessoa politicamente exposta (PPE)',

          listCompletedFiltered.dissolucao_ou_exticao &&
            'No caso de dissolução ou extinção deverá conter no documento: (liquidação, divisão de cotas de sócios, inexistência de ativo e passivo, guarda dos livros etc.) (CNCGJ Art. 953)',

          listCompletedFiltered.fundacoes &&
            'No caso de dissolução ou extinção deverá conter no documento: (liquidação, divisão de cotas de sócios, inexistência de ativo e passivo, guarda dos livros etc.) (CNCGJ Art. 953)',

          listCompletedFiltered.reconhecimento_de_firma &&
            'Apresentou reconhecimento de firme no requerimento do DBE',

          listCompletedFiltered.preechimento_completo &&
            'Preencheu todos os campos do formulário/requerimento',

          listCompletedFiltered.oab &&
            'Apresentou cópia da OAB do representante jurídico do ato apresentado',

          listCompletedFiltered.documentacao_de_identificacao &&
            'Apresentou cópia simples do documento de identificação de',
        ],
        style: 'list',
      },

      { text: 'Lista de exigencias Pendentes', style: 'subTitle' },

      {
        text: `Funcionário responsável pela análize: ${
          userDataLogin?.name
        }  matricula: ${'000/123'}`,
        style: 'userData',
      },

      { text: `Informações importantes:` },

      {
        ol: [
          '- Prazo para análise 15 dias. ',
          '- Cumprimento da exigencia 30 dias.',
          '- Prazo para registro 30 dias satifesta as exigencias necessárias.',
        ],
        style: 'list',
      },
    ] as Content[],

    footer: {
      columns: [
        {
          text: 'Rua Pereira de Souza, nº 104 - Centro, Macaé, RJ CEP:27.913-110 Tel: (22) 2106-1902  WhatsApp: (22) 99979.6222 E-mail: rtd-pj@macae1oficio.com.br',
        },
      ],
      style: 'footer',
    },

    styles: {
      header: {
        fontSize: 12,
        bold: true,
      },

      imageHeader: {
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      title: {
        fontSize: 16,
        margin: [0, 60, 0, 25] as [number, number, number, number],
        alignment: 'center' as Alignment,
      },

      subTitle: {
        margin: [0, 0, 0, 12] as [number, number, number, number],
      },

      list: {
        fontSize: 11,
        margin: [0, 0, 0, 20] as [number, number, number, number],
        lineSpacing: 3,
      },

      userData: {
        margin: [0, 60, 0, 15] as [number, number, number, number],
      },

      footer: {
        alignment: 'center' as Alignment,
      },
    },
  }

  pdfMake.createPdf(documentDefinition).download()
}
