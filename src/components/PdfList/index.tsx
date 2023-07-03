import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

import { ListRequerimentProps } from '../../contexts/RequerimentContext'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

export const PdfList = ({ listPdf }: { listPdf: ListRequerimentProps }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {listPdf.nome_da_instituicao === 'Sim' && (
            <Text>{listPdf.nome_da_instituicao}</Text>
          )}
        </View>
        <View style={styles.section}>
          {listPdf.nome_da_instituicao === 'Sim' && (
            <Text>{listPdf.nome_da_instituicao}</Text>
          )}
        </View>
      </Page>
    </Document>
  )
}
