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

export interface CreateAssociationProps {
  nome_da_instituicao: string
  numero_do_protocolo?: number
  nome_do_representante: string
  cnpj: string
  email_do_representante: string
  telefone_contato: string
  data_da_recepcao?: string
  sobre_exigencia: string
}

export interface UpdateAssociationProps {
  id: number
  nome_da_instituicao: string
  estado_do_requerimento?: string
  numero_do_protocolo?: number
  nome_do_representante: string
  cnpj: string
  email_do_representante: string
  telefone_contato: string
  createdAt?: string
}

interface SendMailAssociationProps extends CreateAssociationProps {
  name: string
  registration: string
}

export interface ListRequerimentProps {
  id?: number
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
  estado_do_requerimento?: string
}

export interface AssociationProps extends CreateAssociationProps {
  id: number
  updatedAt?: string
  createdAt?: string
  exigencias?: ListRequerimentProps
}

interface SendMaiRequerimentProps extends CreateAssociationProps {
  itens_da_lista_pendetes: ListRequerimentProps[]
  registration: string
  name: string
}

interface UpdateListProps extends ListRequerimentProps {
  handleListConcluted: boolean
}

interface filteredRequerimentProps {
  query: string
  formTable: string
}

interface RequerimentContextType {
  dataListRequeriment: ListRequerimentProps[]
  filteredDataSearchRequeriment: AssociationProps[]
  filteredDataConclutedRequeriment: AssociationProps[]
  filteredDataSearchAssociations: AssociationProps[]
  dataInpuSearch: string
  selectAListRequeriment: ListRequerimentProps[]
  requestListDataPDF: AssociationProps | undefined
  dataListAssociation: AssociationProps[]
  setSelectAListRequeriment: (curatedList: ListRequerimentProps[]) => void
  setDataListRequeriment: (data: ListRequerimentProps[]) => void
  CreateRequeriment: (data: ListRequerimentProps) => Promise<void>
  handleCreateAssociation: (data: CreateAssociationProps) => Promise<void>
  filteredRequeriment: (data: filteredRequerimentProps) => void
  filteredRequerimentConcluted: (query: string) => void
  updateRequeriment: (data: UpdateListProps) => Promise<void>
  sendMail: (id: number) => Promise<void>
  handleUpdateAssociation: (data: UpdateAssociationProps) => Promise<void>
  getAssociationList: () => Promise<void>
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
  const [dataListAssociation, setDataListAssociation] = useState<
    AssociationProps[]
  >([])

  const [requestListDataPDF, setRequestListDataPDF] =
    useState<AssociationProps>()
  const [dataInpuSearch, setDataInpuSearch] = useState('')
  const [filteredDataSearchRequeriment, setFilteredDataSearchRequeriment] =
    useState<AssociationProps[]>(dataListAssociation)
  const [filteredDataSearchAssociations, setFilteredDataSearchAssociations] =
    useState<AssociationProps[]>(dataListAssociation)
  const [
    filteredDataConclutedRequeriment,
    setFilteredConclutedDataRequeriment,
  ] = useState<AssociationProps[]>(dataListAssociation)
  const [selectAListRequeriment, setSelectAListRequeriment] = useState<
    ListRequerimentProps[]
  >([])
  const [numberProtocolClient, setNumberProtocolClient] =
    useState<number>(20240001)

  const { userDataLogin } = useUser()

  const getAssociationList = useCallback(async () => {
    try {
      const response = await api.get('associationList')
      const { data } = response
      const numberProtocol = data[data.length - 1]?.numero_do_protocolo

      data.length === 0
        ? setNumberProtocolClient(20240001)
        : setNumberProtocolClient(numberProtocol)

      setDataListAssociation(data)
    } catch (error) {
      console.error('Failed to fetch association list:', error)
      setDataListAssociation([])
    }
  }, [])

  useEffect(() => {
    getAssociationList()
  }, [getAssociationList, dataListRequeriment, userDataLogin])

  const filteredRequeriment = ({
    formTable,
    query,
  }: filteredRequerimentProps) => {
    const filterData = (dataList: any[], query: string) => {
      return dataList.filter((data) => {
        return (
          (data.nome_da_instituicao &&
            data.nome_da_instituicao
              .toLowerCase()
              .includes(query.toLowerCase())) ||
          (data.numero_do_protocolo &&
            data.numero_do_protocolo.toString().includes(query))
        )
      })
    }

    if (formTable === 'Listas-Instancias') {
      const dropDownListAssosiations = dataListAssociation.filter(
        (list) => list.exigencias === null
      )
      const filteredAssociations = filterData(dropDownListAssosiations, query)
      setFilteredDataSearchAssociations(filteredAssociations)
    } else if (formTable === 'Listas-Exigências') {
      const dropDownList = dataListAssociation.filter(
        (list) =>
          list.exigencias !== null &&
          list.exigencias?.estado_do_requerimento === 'Pendente'
      )
      const filteredRequeriment = filterData(dropDownList, query)
      setFilteredDataSearchRequeriment(filteredRequeriment)
    } else if (formTable === 'Exigências-Concluídas') {
      const dropDownList = dataListAssociation.filter(
        (list) =>
          list.exigencias !== null &&
          list.exigencias?.estado_do_requerimento === 'Concluído'
      )
      const filteredRequerimentCompleted = filterData(dropDownList, query)
      setFilteredConclutedDataRequeriment(filteredRequerimentCompleted)
    }

    setDataInpuSearch(query)
  }

  const filteredRequerimentConcluted = (query: string) => {
    const listCompleted = dataListAssociation.filter((list) => {
      return list.exigencias?.estado_do_requerimento === 'Concluído'
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

  const sendMail = useCallback(
    async (id: number) => {
      const { registration, name } = userDataLogin

      const filteredAssociation = dataListAssociation.find((list) => {
        return list.id === id
      })

      try {
        if (filteredAssociation) {
          const listSendEmail = {
            ...filteredAssociation,
            data_da_recepcao: filteredAssociation.createdAt,
            itens_da_lista_pendetes: filteredAssociation.exigencias,
            registration,
            name,
          }

          await toast.promise(api.post('sendMailRequeriments', listSendEmail), {
            pending: 'Verificando seus dados',
            success: 'Email enviado com Sucesso!',
            error: 'Ops! Error no Servidor',
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    [dataListAssociation, userDataLogin]
  )

  const sendMailAssociation = useCallback(
    async (dataSendMail: SendMailAssociationProps) => {
      const {
        cnpj,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        numero_do_protocolo,
        data_da_recepcao,
        telefone_contato,
        registration,
        name,
      } = dataSendMail

      const listSendEmailAssociation = {
        numero_do_protocolo,
        cnpj,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        data_da_recepcao,
        telefone_contato,
        registration,
        name,
      }

      try {
        await api.post('sendMailAssociation', listSendEmailAssociation)
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  const sendMailRequeriment = useCallback(
    async (dataSendMail: SendMaiRequerimentProps) => {
      const {
        cnpj,
        itens_da_lista_pendetes,
        name,
        registration,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        telefone_contato,
        data_da_recepcao,
        numero_do_protocolo,
      } = dataSendMail

      const listSendEmailAssociation = {
        itens_da_lista_pendetes,
        numero_do_protocolo,
        cnpj,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        data_da_recepcao,
        telefone_contato,
        registration,
        name,
      }

      try {
        await api.post('sendMailRequeriments', listSendEmailAssociation)
      } catch (error) {
        console.log(error)
      }
    },
    []
  )

  const handleCreateAssociation = useCallback(
    async (data: CreateAssociationProps) => {
      const { name, registration } = userDataLogin
      const {
        cnpj,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        telefone_contato,
        sobre_exigencia,
      } = data

      const regex = /(\d{2})(\d{5})(\d{4})/

      const formatedNumberPhone =
        telefone_contato && telefone_contato.replace(regex, '($1) $2-$3')

      const newListAssociation = {
        numero_do_protocolo: numberProtocolClient + 1,
        cnpj,
        nome_da_instituicao,
        nome_do_representante,
        telefone_contato: formatedNumberPhone,
        email_do_representante,
        sobre_exigencia,
      }

      try {
        const newList = await toast.promise(
          api.post('associationData', newListAssociation),
          {
            pending: 'Verificando seus dados',
            success: 'Exigencia Criada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )

        const { data } = newList
        setNumberProtocolClient(data.numero_do_protocolo)
        setDataListAssociation((prevState) => [...prevState, data])

        sendMailAssociation({
          ...newListAssociation,
          name,
          registration,
        })

        setRequestListDataPDF(data)
      } catch (error) {
        console.log(error)
      }
    },
    [userDataLogin, numberProtocolClient, sendMailAssociation]
  )

  const handleUpdateAssociation = useCallback(
    async (data: UpdateAssociationProps) => {
      const {
        id,
        email_do_representante,
        nome_da_instituicao,
        cnpj,
        nome_do_representante,
        telefone_contato,
      } = data

      const updatedData = {
        email_do_representante,
        nome_da_instituicao,
        cnpj,
        nome_do_representante,
        telefone_contato,
      }

      try {
        const updateAsssotiationResponse = await toast.promise(
          api.put(`association/${id}`, updatedData),
          {
            pending: 'Verificando seus dados',
            success: 'Exigencia Atualizada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )

        const { data } = updateAsssotiationResponse

        setDataListAssociation([...dataListAssociation, data])
      } catch (error) {
        console.log(error)
      }
    },
    [dataListAssociation]
  )

  const CreateRequeriment = useCallback(
    async (data: ListRequerimentProps) => {
      const { name, registration } = userDataLogin
      const {
        id,
        assinatura_do_advogado,
        declaracao_criminal,
        declaracao_de_desimpedimento,
        declaracao_sindical,
        dissolucao_ou_exticao,
        documentacao_de_identificacao,
        fundacoes,
        lista_e_edital,
        livro_rasao,
        oab,
        ppe,
        preechimento_completo,
        reconhecimento_de_firma,
        requisitos_estatuto,
        requisitos_criacao_de_estatuto,
        requisitos_de_estatutos_fundadores,
        informacao_divergente,
        campo_de_assinatura,
        retificacao_de_redacao,
      } = data

      const filteredAssociation = dataListAssociation.find(
        (list) => list.id === id
      )

      const newListRequeriment = {
        assinatura_do_advogado,
        declaracao_criminal,
        declaracao_de_desimpedimento,
        declaracao_sindical,
        dissolucao_ou_exticao,
        documentacao_de_identificacao,
        fundacoes,
        lista_e_edital,
        livro_rasao,
        oab,
        ppe,
        preechimento_completo,
        reconhecimento_de_firma,
        requisitos_estatuto,
        requisitos_criacao_de_estatuto,
        requisitos_de_estatutos_fundadores,
        informacao_divergente,
        campo_de_assinatura,
        retificacao_de_redacao,
        exigencias_id: id,
        estado_do_requerimento: 'Pendente',
      }

      try {
        const newList = await toast.promise(
          api.post('createRequeriment', newListRequeriment),
          {
            pending: 'Verificando seus dados',
            success: 'Exigencia Criada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )

        const { data } = newList

        filteredAssociation &&
          setRequestListDataPDF({ ...data, ...filteredAssociation })

        setDataListRequeriment((prevState) => [...prevState, data])

        filteredAssociation &&
          sendMailRequeriment({
            ...filteredAssociation,
            name,
            registration,
            itens_da_lista_pendetes: data,
            data_da_recepcao: filteredAssociation.updatedAt,
          })
      } catch (error) {
        console.log(error)
      }
    },
    [dataListAssociation, sendMailRequeriment, userDataLogin]
  )

  const updateRequeriment = useCallback(
    async (data: UpdateListProps) => {
      const currentDate = new Date()
      const currentDateDay = currentDate.getDate()
      const currentDateMonth = currentDate.getMonth() + 1
      const currentDateYears = currentDate.getFullYear()

      const dataString = `${currentDateDay}/${currentDateMonth}/${currentDateYears}`
      const { name, registration } = userDataLogin

      const dataRequerimentUpdated = {
        assinatura_do_advogado: data.assinatura_do_advogado,
        campo_de_assinatura: data.campo_de_assinatura,
        data_atualizacao: dataString,
        data_da_recepcao: data.data_da_recepcao,
        declaracao_criminal: data.declaracao_criminal,
        declaracao_de_desimpedimento: data.declaracao_de_desimpedimento,
        declaracao_sindical: data.declaracao_sindical,
        dissolucao_ou_exticao: data.dissolucao_ou_exticao,
        documentacao_de_identificacao: data.documentacao_de_identificacao,
        estado_do_requerimento: data.estado_do_requerimento,
        fundacoes: data.fundacoes,
        exigencias_id: data.id,
        informacao_divergente: data.informacao_divergente,
        lista_e_edital: data.lista_e_edital,
        livro_rasao: data.livro_rasao,
        oab: data.oab,
        ppe: data.ppe,
        preechimento_completo: data.preechimento_completo,
        reconhecimento_de_firma: data.reconhecimento_de_firma,
        requisitos_criacao_de_estatuto: data.requisitos_criacao_de_estatuto,
        requisitos_de_estatutos_fundadores:
          data.requisitos_de_estatutos_fundadores,
        requisitos_estatuto: data.requisitos_estatuto,
        retificacao_de_redacao: data.retificacao_de_redacao,
      }

      const stringValues = Object.values(data).filter(
        (valor) => typeof valor === 'string'
      )
      const fullFilteredList = Object.values(stringValues).every(
        (valor) => valor === 'Recebido'
      )

      const filteredAssociation = dataListAssociation.find(
        (list) => list.id === data.id
      )

      if (fullFilteredList) {
        const ListConcruted = {
          ...dataRequerimentUpdated,
          estado_do_requerimento: 'Concluído',
        }
        try {
          const updateRequermentResponse = await toast.promise(
            api.put(
              `updateRequeriment/${dataRequerimentUpdated.exigencias_id}`,
              ListConcruted
            ),
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
        try {
          const updateRequermentResponse = await toast.promise(
            api.put(
              `updateRequeriment/${dataRequerimentUpdated.exigencias_id}`,
              dataRequerimentUpdated
            ),
            {
              pending: 'Verificando seus dados',
              success: 'Exigencia Atualizada com Sucesso!',
              error: 'Ops! Verifique os Dados Digitados',
            }
          )

          const { data } = updateRequermentResponse
          setDataListRequeriment([...dataListRequeriment, data])
          filteredAssociation &&
            sendMailRequeriment({
              ...filteredAssociation,
              name,
              registration,
              itens_da_lista_pendetes: data,
              data_da_recepcao: filteredAssociation.updatedAt,
            })

          console.log(filteredAssociation && filteredAssociation.updatedAt)
        } catch (error) {
          console.log(error)
        }
      }
    },
    [
      dataListAssociation,
      dataListRequeriment,
      sendMailRequeriment,
      userDataLogin,
    ]
  )

  return (
    <RequerimentContext.Provider
      value={{
        dataListRequeriment,
        filteredDataSearchRequeriment,
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
        handleCreateAssociation,
        dataListAssociation,
        handleUpdateAssociation,
        getAssociationList,
        filteredDataSearchAssociations,
      }}
    >
      {children}
    </RequerimentContext.Provider>
  )
}
