/* eslint-disable camelcase */
import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  createContext,
} from 'react'
import { toast } from 'react-toastify'

import { PdfList } from '../components/PdfList'
import { CreateRequerimentFormInputs } from '../Pages/CreateRequeriment'
import { PdfGenerator } from '../Pages/Home/components/PdfListRequeriment'
import api from '../services/api'

export interface ListRequerimentProps {
  id?: number
  nome_da_instituicao?: string
  estado_do_requerimento?: string
  numero_do_protocolo?: string
  nome_do_representante?: string
  cnpj?: string
  email_do_representante?: string
  telefone_contato?: string
  declaracao_sindical?: string
  lista_e_edital?: string
  assinatura_do_advogado?: string
  declaracao_criminal?: string
  declaracao_de_desimpedimento?: string
  livro_rasao?: string
  ppe?: string
  requisitos_estatuto?: string
  dissolucao_ou_exticao?: string
  fundacoes?: string
  reconhecimento_de_firma?: string
  preechimento_completo?: string
  oab?: string
  documentacao_de_identificacao?: string
  campo_de_assinatura?: string
  retificacao_de_redacao?: string
  informacao_divergente?: string
  quais_informacoes_divergentes?: string | null
  updatedAt?: string
}

interface SendMailProps {
  assinatura_do_advogado?: string
  declaracao_criminal?: string
  estado_do_requerimento?: string
  numero_do_protocolo?: string
  cnpj?: string
  declaracao_de_desimpedimento?: string
  declaracao_sindical?: string
  dissolucao_ou_exticao?: string
  documentacao_de_identificacao?: string
  email_do_representante?: string
  fundacoes?: string
  lista_e_edital?: string
  livro_rasao?: string
  nome_da_instituicao?: string
  nome_do_representante?: string
  oab?: string
  ppe?: string
  preechimento_completo?: string
  reconhecimento_de_firma?: string
  requisitos_estatuto?: string
  telefone_contato?: string

  campo_de_assinatura?: string
  retificacao_de_redacao?: string
  informacao_divergente?: string
  quais_informacoes_divergentes?: string
}

interface RequerimentContextType {
  dataListRequeriment: ListRequerimentProps[]
  filteredDataRequeriment: ListRequerimentProps[]
  dataInpuSearch: string
  selectAListRequeriment: ListRequerimentProps[]
  setSelectAListRequeriment: (curatedList: ListRequerimentProps[]) => void
  CreateRequeriment: (data: CreateRequerimentFormInputs) => void
  filteredRequeriment: (query: string) => void
}

interface RequerimentProviderProps {
  children: ReactNode
}

export const RequerimentContext = createContext({} as RequerimentContextType)

export const RequerimentContextProvider = ({
  children,
}: RequerimentProviderProps) => {
  const [dataListRequeriment, setDataListRequeriment] = useState<
    ListRequerimentProps[]
  >([])
  const [numberProtocolClient, setNumberProtocolClient] = useState(650)
  const [dataInpuSearch, setDataInpuSearch] = useState('')
  const [filteredDataRequeriment, setFilteredDataRequeriment] =
    useState<ListRequerimentProps[]>(dataListRequeriment)
  const [selectAListRequeriment, setSelectAListRequeriment] = useState<
    ListRequerimentProps[]
  >([])

  const getListRequeriment = useCallback(async () => {
    const listRequeriment = await api.get('requeriment')
    const { data } = listRequeriment

    setDataListRequeriment(data)
  }, [])

  useEffect(() => {
    getListRequeriment()

    const loadNumberProtocol = async () => {
      const getNumberProtocol = await localStorage.getItem(
        'cartorio:numberProtocol'
      )

      if (getNumberProtocol) {
        setNumberProtocolClient(JSON.parse(getNumberProtocol))
      }
    }

    loadNumberProtocol()
  }, [getListRequeriment, numberProtocolClient])

  const filteredRequeriment = (query: string) => {
    const filteredRequeriment = dataListRequeriment.filter((data) => {
      return (
        (data.nome_da_instituicao &&
          data.nome_da_instituicao
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        (data.numero_do_protocolo &&
          data.numero_do_protocolo.toLowerCase().includes(query.toLowerCase()))
      )
    })

    setFilteredDataRequeriment(filteredRequeriment)
    setDataInpuSearch(query)
  }

  const sendMail = useCallback(async (dataSendMail: SendMailProps) => {
    const notCompletedApplicationList = Object.entries(dataSendMail).filter(
      ([key, value]) => {
        return value === 'Sim'
      }
    )

    const listNotCompletedFiltered = Object.fromEntries(
      notCompletedApplicationList
    )

    const {
      cnpj,
      email_do_representante,
      nome_da_instituicao,
      nome_do_representante,
      numero_do_protocolo,
    } = dataSendMail

    try {
      await api.post('sendMail', {
        numero_do_protocolo,
        cnpj,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        itens_da_lista_pendetes: listNotCompletedFiltered,
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const CreateRequeriment = useCallback(
    async (data: CreateRequerimentFormInputs) => {
      const {
        assinatura_do_advogado,
        declaracao_criminal,
        cnpj,
        declaracao_de_desimpedimento,
        declaracao_sindical,
        dissolucao_ou_exticao,
        documentacao_de_identificacao,
        email_do_representante,
        fundacoes,
        lista_e_edital,
        livro_rasao,
        nome_da_instituicao,
        nome_do_representante,
        oab,
        ppe,
        preechimento_completo,
        reconhecimento_de_firma,
        requisitos_estatuto,
        telefone_contato,
      } = data

      const regex = /(\d{2})(\d{5})(\d{4})/

      const formatedNumberPhone = telefone_contato.replace(regex, '($1) $2-$3')

      const formattedCnpj = `${cnpj.substring(0, 2)}.${cnpj.substring(
        2,
        5
      )}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`

      const numberProtocol = numberProtocolClient + 1

      setNumberProtocolClient(numberProtocol)
      await localStorage.setItem(
        'cartorio:numberProtocol',
        JSON.stringify(numberProtocol)
      )

      const currentDate = new Date().getFullYear()
      const numberProtocolString = `${numberProtocolClient}/${currentDate}`

      try {
        const createRequermentResponse = await toast.promise(
          api.post('requerimentData', {
            assinatura_do_advogado,
            declaracao_criminal,
            estado_do_requerimento: 'Pendente',
            numero_do_protocolo: numberProtocolString,
            cnpj: formattedCnpj,
            declaracao_de_desimpedimento,
            declaracao_sindical,
            dissolucao_ou_exticao,
            documentacao_de_identificacao,
            email_do_representante,
            fundacoes,
            lista_e_edital,
            livro_rasao,
            nome_da_instituicao,
            nome_do_representante,
            oab,
            ppe,
            preechimento_completo,
            reconhecimento_de_firma,
            requisitos_estatuto,
            telefone_contato: formatedNumberPhone,

            campo_de_assinatura: 'teste',
            retificacao_de_redacao: 'teste',
            informacao_divergente: 'teste',
            quais_informacoes_divergentes: 'teste',
          }),
          {
            pending: 'Verificando seus dados',
            success: 'Exigencia Criada com Sucesso!',
            error: 'Ops! Verifique so Dados Digitados',
          }
        )

        const { data } = createRequermentResponse

        setDataListRequeriment([...dataListRequeriment, data])

        const listPdf = { ...data, numeroDoProtocolo: numberProtocolClient }
        console.log(listPdf)

        PdfList(listPdf)

        PdfGenerator(listPdf)
      } catch (error) {
        console.log(error)
      }

      const dataSendMail = {
        assinatura_do_advogado,
        declaracao_criminal,
        estado_do_requerimento: 'Pendente',
        numero_do_protocolo: numberProtocolString,
        cnpj: formattedCnpj,
        declaracao_de_desimpedimento,
        declaracao_sindical,
        dissolucao_ou_exticao,
        documentacao_de_identificacao,
        email_do_representante,
        fundacoes,
        lista_e_edital,
        livro_rasao,
        nome_da_instituicao,
        nome_do_representante,
        oab,
        ppe,
        preechimento_completo,
        reconhecimento_de_firma,
        requisitos_estatuto,
        telefone_contato,

        campo_de_assinatura: 'teste',
        retificacao_de_redacao: 'teste',
        informacao_divergente: 'teste',
        quais_informacoes_divergentes: 'teste',
      }

      sendMail(dataSendMail)
    },
    [numberProtocolClient, sendMail, dataListRequeriment]
  )

  return (
    <RequerimentContext.Provider
      value={{
        dataListRequeriment,
        CreateRequeriment,
        dataInpuSearch,
        filteredRequeriment,
        filteredDataRequeriment,
        selectAListRequeriment,
        setSelectAListRequeriment,
      }}
    >
      {children}
    </RequerimentContext.Provider>
  )
}
