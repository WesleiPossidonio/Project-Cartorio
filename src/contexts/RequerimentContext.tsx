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
  numero_do_protocolo?: number
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
  updatedAt?: string
  data_da_recepcao?: string
  requisitos_de_estatutos_fundadores?: string
  requisitos_criacao_de_estatuto?: string
  data_atualizacao?: string
}

interface UpdateListProps extends ListRequerimentProps {
  handleListConcluted: boolean
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
  setDataListRequeriment: (data: ListRequerimentProps[]) => void
  CreateRequeriment: (data: ListRequerimentProps) => Promise<void>
  filteredRequeriment: (query: string) => void
  filteredRequerimentConcluted: (query: string) => void
  updateRequeriment: (data: UpdateListProps) => Promise<void>
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
  const [numberProtocolClient, setNumberProtocolClient] =
    useState<number>(2024065)

  const { userDataLogin } = useUser()

  const getListRequeriment = useCallback(async () => {
    const listRequeriment = await api.get('requeriment')
    const { data } = listRequeriment
    setDataListRequeriment(data)

    const lastNumberProtocol = data[data.length - 1].numero_do_protocolo + 3

    if (!numberProtocolClient) {
      setNumberProtocolClient(2024065)
    } else {
      setNumberProtocolClient(lastNumberProtocol)
    }
  }, [numberProtocolClient])

  useEffect(() => {
    getListRequeriment()
  }, [])

  useEffect(() => {
    getListRequeriment()
  }, [dataListRequeriment, numberProtocolClient])

  const filteredRequeriment = (query: string) => {
    const dropDownList = dataListRequeriment.filter((list) => {
      return list.estado_do_requerimento === 'Pendente'
    })

    const filteredRequeriment = dropDownList.filter((data) => {
      return (
        (data.nome_da_instituicao &&
          data.nome_da_instituicao
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        (data.numero_do_protocolo &&
          data.numero_do_protocolo.toString().includes(query))
      )
    })

    setFilteredDataRequeriment(filteredRequeriment)
    setDataInpuSearch(query)
  }

  const filteredRequerimentConcluted = (query: string) => {
    const listCompleted = dataListRequeriment.filter((list) => {
      return list.estado_do_requerimento === 'Concluído'
    })

    const filteredRequeriment = listCompleted.filter((data) => {
      return (
        (data.nome_da_instituicao &&
          data.nome_da_instituicao
            .toLowerCase()
            .includes(query.toLowerCase())) ||
        (data.numero_do_protocolo &&
          data.numero_do_protocolo.toString().includes(query))
      )
    })

    setFilteredConclutedDataRequeriment(filteredRequeriment)
    setDataInpuSearch(query)
  }

  const sendMail = useCallback(async (dataSendMail: SendMailProps) => {
    const notCompletedApplicationList = Object.entries(dataSendMail).filter(
      ([key, value]) => {
        return value ? 'Pendente' : 'Recebido'
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
        requisitos_criacao_de_estatuto,
        requisitos_de_estatutos_fundadores,
        informacao_divergente,
        campo_de_assinatura,
        retificacao_de_redacao,
      } = data

      const regex = /(\d{2})(\d{5})(\d{4})/

      const formatedNumberPhone =
        telefone_contato && telefone_contato.replace(regex, '($1) $2-$3')

      const currentDate = new Date()

      const currentDateDay = currentDate.getDate()
      const currentDateMonth = currentDate.getMonth() + 1
      const currentDateYears = currentDate.getFullYear()

      const dataString = `${currentDateDay}/${currentDateMonth}/${currentDateYears}`

      const newListRequeriment = {
        assinatura_do_advogado,
        declaracao_criminal,
        estado_do_requerimento,
        numero_do_protocolo: numberProtocolClient,
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
        requisitos_criacao_de_estatuto,
        requisitos_de_estatutos_fundadores,
        informacao_divergente,
        campo_de_assinatura,
        retificacao_de_redacao,
      }

      try {
        const newList = await toast.promise(
          api.post('requerimentData', newListRequeriment),
          {
            pending: 'Verificando seus dados',
            success: 'Exigencia Criada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )

        const { data } = newList

        setRequestListDataPDF(newListRequeriment)

        setDataListRequeriment((prevState) => [...prevState, data])

        sendMail({
          ...data,
          updateMail: false,
          name,
          registration,
        })
      } catch (error) {
        console.log(error)
      }
    },
    [numberProtocolClient, sendMail, userDataLogin]
  )

  const updateRequeriment = useCallback(
    async (data: UpdateListProps) => {
      const currentDate = new Date()
      const currentDateDay = currentDate.getDate()
      const currentDateMonth = currentDate.getMonth() + 1
      const currentDateYears = currentDate.getFullYear()

      const dataString = `${currentDateDay}/${currentDateMonth}/${currentDateYears}`

      if (data.handleListConcluted) {
        const updatedList = {
          ...data,
          data_atualizacao: dataString,
          estado_do_requerimento: 'Concluído',
        }

        try {
          const updateRequermentResponse = await toast.promise(
            api.put(`requeriment/${updatedList.id}`, updatedList),
            {
              pending: 'Verificando seus dados',
              success: 'Exigencia Concluída com Sucesso!',
              error: 'Ops! Verifique os Dados Digitados',
            }
          )

          const { data } = updateRequermentResponse

          setDataListRequeriment([...dataListRequeriment, data])
        } catch (error) {
          console.log(error)
        }
      } else {
        const updatedList = { ...data, data_atualizacao: dataString }

        try {
          const updateRequermentResponse = await toast.promise(
            api.put(`requeriment/${updatedList.id}`, updatedList),
            {
              pending: 'Verificando seus dados',
              success: 'Exigencia Atualizada com Sucesso!',
              error: 'Ops! Verifique os Dados Digitados',
            }
          )

          const { data } = updateRequermentResponse

          setDataListRequeriment([...dataListRequeriment, data])
        } catch (error) {
          console.log(error)
        }
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
        setDataListRequeriment,
      }}
    >
      {children}
    </RequerimentContext.Provider>
  )
}
