/* eslint-disable camelcase */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  createContext,
} from 'react'
import { toast } from 'react-toastify'

import { useUser } from '../hooks/useUser'
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
  quais_informacoes_divergentes?: string
  updatedAt?: string
  data_da_recepcao?: string
  requisitos_de_estatutos_fundadores?: string
  requisitos_criacao_de_estatuto?: string
  data_da_atualizacao?: string
}

interface SendMailProps extends ListRequerimentProps {
  updateMail: boolean
  name: string
  registration: string
}

interface RequerimentContextType {
  dataListRequeriment: ListRequerimentProps[]
  filteredDataRequeriment: ListRequerimentProps[]
  filteredDataConclutedRequeriment: ListRequerimentProps[]
  dataInpuSearch: string
  selectAListRequeriment: ListRequerimentProps[]
  requestListDataPDF: ListRequerimentProps
  setSelectAListRequeriment: (curatedList: ListRequerimentProps[]) => void
  CreateRequeriment: (data: ListRequerimentProps) => Promise<void>
  filteredRequeriment: (query: string) => void
  filteredRequerimentConcluted: (query: string) => void
  updateRequeriment: (data: ListRequerimentProps) => Promise<void>
  sendMail: (dataSendMail: SendMailProps) => Promise<void>
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

  const [requestListDataPDF, setRequestListDataPDF] =
    useState<ListRequerimentProps>({})
  const [numberProtocolClient, setNumberProtocolClient] =
    useState<string>('650/2023')
  const [dataInpuSearch, setDataInpuSearch] = useState('')
  const [filteredDataRequeriment, setFilteredDataRequeriment] =
    useState<ListRequerimentProps[]>(dataListRequeriment)
  const [
    filteredDataConclutedRequeriment,
    setFilteredConclutedDataRequeriment,
  ] = useState<ListRequerimentProps[]>(dataListRequeriment)
  const [selectAListRequeriment, setSelectAListRequeriment] = useState<
    ListRequerimentProps[]
  >([])

  const { userDataLogin } = useUser()

  const getListRequeriment = useCallback(async () => {
    const listRequeriment = await api.get('requeriment')
    const { data } = listRequeriment

    setDataListRequeriment(data)
  }, [])

  useEffect(() => {
    getListRequeriment()

    const loadNumberProtocol = async () => {
      const lastNumberProtocol =
        dataListRequeriment[dataListRequeriment.length - 1]

      const getNumberProtocol = await localStorage.getItem(
        'cartorio:numberProtocol'
      )

      if (
        lastNumberProtocol &&
        getNumberProtocol !== lastNumberProtocol.numero_do_protocolo
      ) {
        setNumberProtocolClient(lastNumberProtocol.numero_do_protocolo || '')
        await localStorage.setItem(
          'cartorio:numberProtocol',
          JSON.stringify(lastNumberProtocol.numero_do_protocolo)
        )
      }

      if (
        lastNumberProtocol &&
        getNumberProtocol === lastNumberProtocol.numero_do_protocolo
      ) {
        setNumberProtocolClient(getNumberProtocol)
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

  const filteredRequerimentConcluted = (query: string) => {
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

    setFilteredConclutedDataRequeriment(filteredRequeriment)
    setDataInpuSearch(query)
  }

  const sendMail = useCallback(async (dataSendMail: SendMailProps) => {
    const notCompletedApplicationList = Object.entries(dataSendMail).filter(
      ([key, value]) => {
        return value ? 'Sim' : 'Não'
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
      data_da_recepcao,
      telefone_contato,
      updateMail,
      registration,
      name,
    } = dataSendMail

    const listSendEmail = {
      numero_do_protocolo,
      cnpj,
      email_do_representante,
      nome_da_instituicao,
      nome_do_representante,
      data_da_recepcao,
      telefone_contato,
      itens_da_lista_pendetes: listNotCompletedFiltered,
      registration,
      name,
    }

    try {
      if (updateMail) {
        await toast.promise(api.post('sendMail', listSendEmail), {
          pending: 'Verificando seus dados',
          success: 'Email enviado com Sucesso!',
          error: 'Ops! Error no Servidor',
        })
      }
      await api.post('sendMail', listSendEmail)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const CreateRequeriment = useCallback(
    async (data: ListRequerimentProps) => {
      const { name, registration } = userDataLogin
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
        estado_do_requerimento,
      } = data

      const numberProtocol = numberProtocolClient + 1

      setNumberProtocolClient(numberProtocol)
      await localStorage.setItem(
        'cartorio:numberProtocol',
        JSON.stringify(numberProtocol)
      )

      const regex = /(\d{2})(\d{5})(\d{4})/

      const formatedNumberPhone =
        telefone_contato && telefone_contato.replace(regex, '($1) $2-$3')

      // const formattedCnpj = `${cnpj && cnpj.substring(0, 2)}.${
      //   cnpj && cnpj.substring(2, 5)
      // }.${cnpj && cnpj.substring(5, 8)}/${cnpj && cnpj.substring(8, 12)}-${
      //   cnpj && cnpj.substring(12)
      // }`

      const currentDate = new Date()

      const currentDateDay = currentDate.getDate()
      const currentDateMonth = currentDate.getMonth() + 1
      const currentDateYears = currentDate.getFullYear()
      const numberProtocolString = `${numberProtocolClient}-${currentDateYears}`

      const dataString = `${currentDateDay}/${currentDateMonth}/${currentDateYears}`

      const newListRequeriment = {
        assinatura_do_advogado,
        declaracao_criminal,
        estado_do_requerimento,
        numero_do_protocolo: numberProtocolString,
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
        telefone_contato: formatedNumberPhone,
        data_da_recepcao: dataString,

        campo_de_assinatura: 'teste',
        retificacao_de_redacao: 'teste',
        informacao_divergente: 'teste',
        quais_informacoes_divergentes: 'teste',
        existe_exigencias_nao_listadas: 'Teste',
        requisitos_criacao_de_estatuto: 'teste adicionar no interface',
        requisitos_de_estatutos_fundadores: 'teste adicionar no interface',
      }

      setDataListRequeriment((prevState) => [...prevState, newListRequeriment])

      try {
        await toast.promise(api.post('requerimentData', newListRequeriment), {
          pending: 'Verificando seus dados',
          success: 'Exigencia Criada com Sucesso!',
          error: 'Ops! Verifique os Dados Digitados',
        })

        setRequestListDataPDF(newListRequeriment)

        setDataListRequeriment((prevState) => [
          ...prevState,
          newListRequeriment,
        ])

        sendMail({
          ...newListRequeriment,
          updateMail: false,
          name,
          registration,
        })
      } catch (error) {
        console.log(error)
      }
    },
    [numberProtocolClient, sendMail]
  )

  const updateRequeriment = useCallback(
    async (data: ListRequerimentProps) => {
      const currentDate = new Date()
      const currentDateDay = currentDate.getDate()
      const currentDateMonth = currentDate.getMonth() + 1
      const currentDateYears = currentDate.getFullYear()

      const dataString = `${currentDateDay}/${currentDateMonth}/${currentDateYears}`

      const updatedList = { ...data, data_da_atualizacao: dataString }

      try {
        const createRequermentResponse = await toast.promise(
          api.put(`requeriment/${updatedList.id}`, updatedList),
          {
            pending: 'Verificando seus dados',
            success: 'Exigencia Atualizada com Sucesso!',
            error: 'Ops! Verifique so Dados Digitados',
          }
        )

        const { data } = createRequermentResponse

        setDataListRequeriment([...dataListRequeriment, data])
      } catch (error) {
        console.log(error)
      }
    },
    [dataListRequeriment]
  )

  return (
    <RequerimentContext.Provider
      value={{
        dataListRequeriment,
        filteredDataRequeriment,
        selectAListRequeriment,
        dataInpuSearch,
        requestListDataPDF,
        filteredDataConclutedRequeriment,
        CreateRequeriment,
        filteredRequeriment,
        setSelectAListRequeriment,
        updateRequeriment,
        sendMail,
        filteredRequerimentConcluted,
      }}
    >
      {children}
    </RequerimentContext.Provider>
  )
}
