/* eslint-disable react-refresh/only-export-components */
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
  createContext,
} from 'react'

import { toast } from 'react-toastify'

import { useUser } from '../hooks/useUser'
import api from '../services/api'

import {
  AssociationProps,
  CreateAssociationProps,
  filteredRequerimentProps,
  ListRequerimentProps,
  Pagination,
  SendMailAssociationProps,
  SendMailRequerimentProps,
  UpdateAssociationProps,
  UpdateListProps,
  UpdatestatusProps,
} from '../@types/typesRequerimentContest'

interface RequerimentContextType {
  dataListRequeriment: ListRequerimentProps[]
  selectAListRequeriment: ListRequerimentProps[]
  requestListDataPDF: AssociationProps | undefined

  dataListAssociationWithoutRequirement: AssociationProps[]
  dataInputSearchAssociation: string
  paginationWithoutRequirement: Pagination
  currentPageWithoutRequirement: number

  dataListPendingRequirements: AssociationProps[]
  dataInputSearchRequirement: string
  paginationPendingRequirements: Pagination
  currentPagePendingRequirements: number

  dataListCompletedAssociations: AssociationProps[]
  dataInputSearchConcluted: string
  paginationCompletedAssociations: Pagination
  currentPageCompletedAssociations: number

  searchFunction: (data: filteredRequerimentProps) => void
  setSelectAListRequeriment: (curatedList: ListRequerimentProps[]) => void
  setDataListRequeriment: (data: ListRequerimentProps[]) => void
  CreateRequeriment: (data: ListRequerimentProps) => Promise<void>
  handleCreateAssociation: (data: CreateAssociationProps) => Promise<void>
  updateRequeriment: (data: UpdateListProps) => Promise<void>
  sendMail: (id: number) => Promise<void>
  handleUpdateAssociation: (data: UpdateAssociationProps) => Promise<void>
  handleUpdateStatus: (data: UpdatestatusProps) => Promise<void>
  setDataListPendingRequirements: (data: AssociationProps[]) => void
  setCurrentPageWithoutRequirement: (page: number) => void
  setCurrentPagePendingRequirements: (page: number) => void
  setCurrentPageCompletedAssociations: (page: number) => void
  getPendingRequirements: (page?: number, search?: string) => Promise<void>
  getCompletedAssociations: (page?: number, search?: string) => Promise<void>
}

interface RequerimentProviderProps {
  children: ReactNode
}

export const RequerimentContext =
  createContext({} as RequerimentContextType)

export const RequerimentContextProvider = ({
  children,
}: RequerimentProviderProps) => {
  const [dataListRequeriment, setDataListRequeriment] =
    useState<ListRequerimentProps[]>([])

  const [requestListDataPDF, setRequestListDataPDF] =
    useState<AssociationProps>()

  const [selectAListRequeriment, setSelectAListRequeriment] =
    useState<ListRequerimentProps[]>([])

  const [
    dataListAssociationWithoutRequirement,
    setDataListAssociationWithoutRequirement,
  ] = useState<AssociationProps[]>([])

  const [
    dataInputSearchAssociation,
    setDataInputSearchAssociation,
  ] = useState('')

  const [
    currentPageWithoutRequirement,
    setCurrentPageWithoutRequirement,
  ] = useState(1)

  const [
    paginationWithoutRequirement,
    setPaginationWithoutRequirement,
  ] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const [
    dataListPendingRequirements,
    setDataListPendingRequirements,
  ] = useState<AssociationProps[]>([])

  const [
    dataInputSearchRequirement,
    setDataInputSearchRequirement,
  ] = useState('')

  const [
    currentPagePendingRequirements,
    setCurrentPagePendingRequirements,
  ] = useState(1)

  const [
    paginationPendingRequirements,
    setPaginationPendingRequirements,
  ] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const [
    dataListCompletedAssociations,
    setDataListCompletedAssociations,
  ] = useState<AssociationProps[]>([])

  const [
    dataInputSearchConcluted,
    setDataInputSearchConcluted,
  ] = useState('')

  const [
    currentPageCompletedAssociations,
    setCurrentPageCompletedAssociations,
  ] = useState(1)

  const [
    paginationCompletedAssociations,
    setPaginationCompletedAssociations,
  ] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const { userDataLogin } = useUser()

  const getAssociationListPending = useCallback(
    async (page = 1, search: string) => {
         console.log(dataInputSearchRequirement, search)
      try {
        const response = await api.get(
          'association/pending',
          {
            params: {
              page,
              limit: 10,
              search: search.trim() || undefined,
            },
          },
        )

        const { data } = response

        setDataListAssociationWithoutRequirement(
          data.associationDataList,
        )

        setPaginationWithoutRequirement(
          data.pagination,
        )
      } catch (error) {
        console.error(
          'Failed to fetch pending associations:',
          error,
        )

        setDataListAssociationWithoutRequirement([])
      }
    },
    [],
  )

  const getPendingRequirements = useCallback(
    async (page = 1, search = '') => {
      try {
        const response = await api.get(
          'association/requirements',
          {
            params: {
              page,
              limit: 10,
              search: search.trim() || undefined,
            },
          },
        )

        const { data } = response

        setDataListPendingRequirements(
          data.associationDataList,
        )

        setPaginationPendingRequirements(
          data.pagination,
        )
      } catch (error) {
        console.error(
          'Failed to fetch pending requirements:',
          error,
        )

        setDataListPendingRequirements([])
      }
    },
    [],
  )

  const getCompletedAssociations = useCallback(
    async (page = 1, search = '') => {
      try {
        const response = await api.get(
          '/association/completed',
          {
            params: {
              page,
              limit: 10,
              search: search.trim() || undefined,
            },
          },
        )

        const { data } = response

        setDataListCompletedAssociations(
          data.associationDataList,
        )

        setPaginationCompletedAssociations(
          data.pagination,
        )
      } catch (error) {
        console.error(
          'Failed to fetch completed associations:',
          error,
        )

        setDataListCompletedAssociations([])
      }
    },
    [],
  )

  useEffect(() => {
    getAssociationListPending(
      currentPageWithoutRequirement,
      dataInputSearchAssociation,
    )

  }, [
    currentPageWithoutRequirement,
    dataInputSearchAssociation,
    getAssociationListPending,
  ])

  useEffect(() => {
    getPendingRequirements(
      currentPagePendingRequirements,
      dataInputSearchRequirement,
    )
  }, [
    currentPagePendingRequirements,
    dataInputSearchRequirement,
    getPendingRequirements,
  ])

  useEffect(() => {
    getCompletedAssociations(
      currentPageCompletedAssociations,
      dataInputSearchConcluted,
    )
  }, [
    currentPageCompletedAssociations,
    dataInputSearchConcluted,
    getCompletedAssociations,
  ])

 const searchFunction = (
  data: filteredRequerimentProps,
) => {
  const { query, formTable } = data

  switch (formTable) {
    case 'Listas-Instancias':
      setDataInputSearchAssociation(query)
      setCurrentPageWithoutRequirement(1)
      break

    case 'Listas-Exigências':
      setDataInputSearchRequirement(query)
      setCurrentPagePendingRequirements(1)
      break

    case 'Exigências-Concluídas':
      setDataInputSearchConcluted(query)
      setCurrentPageCompletedAssociations(1)
      break

    default:
      break
  }
}

  const findAssociationById = useCallback(
    (id?: number) => {
      if (typeof id !== 'number') {
        return undefined
      }

      return (
        dataListAssociationWithoutRequirement.find(
          (association) => association.id === id,
        ) ||
        dataListPendingRequirements.find(
          (association) => association.id === id,
        ) ||
        dataListCompletedAssociations.find(
          (association) => association.id === id,
        )
      )
    },
    [
      dataListAssociationWithoutRequirement,
      dataListPendingRequirements,
      dataListCompletedAssociations,
    ],
  )


  const sendMail = useCallback(
    async (id: number) => {
      if (!userDataLogin) {
        console.error('Usuário não está logado.')
        return
      }

      const { registration, name } =
        userDataLogin

      const filteredAssociation =
        findAssociationById(id)

      if (!filteredAssociation) {
        console.error(
          `Nenhuma associação encontrada para o ID: ${id}`,
        )
        return
      }

      if (!filteredAssociation.createdAt) {
        console.error(
          'Associação não possui data de criação.',
        )
        return
      }

      try {
        const date = format(
          new Date(
            filteredAssociation.createdAt,
          ),
          'dd/MM/yyyy',
          {
            locale: ptBR,
          },
        )

        const listSendEmail = {
          ...filteredAssociation,
          data_da_recepcao: date,
          itens_da_lista_pendetes:
            filteredAssociation.exigencia,
          registration,
          name,
        }

        const apiEndpoint =
          filteredAssociation.exigencia === null
            ? 'sendMailAssociation'
            : 'sendMailRequeriments'

        await toast.promise(
          api.post(apiEndpoint, listSendEmail),
          {
            pending: 'Verificando seus dados',
            success: 'Email enviado com sucesso!',
            error: 'Ops! Erro no servidor',
          },
        )
      } catch (error) {
        console.error(
          'Erro ao enviar e-mail:',
          error,
        )

        toast.error(
          'Ocorreu um erro ao enviar o e-mail.',
        )
      }
    },
    [findAssociationById, userDataLogin],
  )

  const sendMailAssociation = useCallback(
    async (
      dataSendMail: SendMailAssociationProps,
    ) => {
      const {
        cnpj_cpf,
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
        cnpj_cpf,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        data_da_recepcao,
        telefone_contato,
        registration,
        name,
      }

      try {
        await api.post(
          'sendMailAssociation',
          listSendEmailAssociation,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  const sendMailRequeriment = useCallback(
    async (
      dataSendMail: SendMailRequerimentProps,
    ) => {
      const {
        cnpj_cpf,
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
        cnpj_cpf,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        data_da_recepcao,
        telefone_contato,
        registration,
        name,
      }

      try {
        await api.post(
          'sendMailRequeriments',
          listSendEmailAssociation,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  const handleCreateAssociation = useCallback(
    async (data: CreateAssociationProps) => {
      const { name, registration } =
        userDataLogin

      const {
        cnpj_cpf,
        email_do_representante,
        nome_da_instituicao,
        nome_do_representante,
        telefone_contato,
        sobre_exigencia,
      } = data

      const regex = /(\d{2})(\d{5})(\d{4})/

      const formatedNumberPhone =
        telefone_contato &&
        telefone_contato.replace(
          regex,
          '($1) $2-$3',
        )

      const newListAssociation = {
        cnpj_cpf,
        nome_da_instituicao,
        nome_do_representante,
        telefone_contato:
          formatedNumberPhone,
        email_do_representante,
        sobre_exigencia,
      }

      try {
        const newList = await toast.promise(
          api.post(
            'associationData',
            newListAssociation,
          ),
          {
            pending: 'Verificando seus dados',
            success:
              'Exigencia Criada com Sucesso!',
            error:
              'Ops! Verifique os Dados Digitados',
          },
        )

        const { data: association } =
          newList

        const date = format(
          new Date(association.createdAt),
          'dd/MM/yyyy',
          {
            locale: ptBR,
          },
        )

        setRequestListDataPDF(association)

        sendMailAssociation({
          ...association,
          name,
          registration,
          data_da_recepcao: date,
          sobre_exigencia,
        })

        setCurrentPageWithoutRequirement(1)
        await getAssociationListPending(
          1,
          dataInputSearchAssociation,
        )
      } catch (error) {
        console.log(error)
      }
    },
    [
      userDataLogin,
      sendMailAssociation,
      getAssociationListPending,
      dataInputSearchAssociation,
    ],
  )

  const handleUpdateAssociation =
    useCallback(
      async (data: UpdateAssociationProps) => {
        const {
          id,
          email_do_representante,
          nome_da_instituicao,
          cnpj_cpf,
          nome_do_representante,
          telefone_contato,
          status_association,
        } = data

        const updatedData = {
          email_do_representante,
          nome_da_instituicao,
          cnpj_cpf,
          nome_do_representante,
          telefone_contato,
          status_association,
        }

        try {
          await toast.promise(
            api.put(
              `association/${id}`,
              updatedData,
            ),
            {
              pending: 'Verificando seus dados',
              success:
                'Exigencia Atualizada com Sucesso!',
              error:
                'Ops! Verifique os Dados Digitados',
            },
          )

          /*
           * Recarrega as tabelas.
           *
           * Isso é mais seguro do que usar:
           * updatedList[id - 1] = data
           *
           * pois agora os dados são paginados.
           */

          await Promise.all([
            getAssociationListPending(
              currentPageWithoutRequirement,
              dataInputSearchAssociation,
            ),
            getPendingRequirements(
              currentPagePendingRequirements,
              dataInputSearchRequirement,
            ),
            getCompletedAssociations(
              currentPageCompletedAssociations,
              dataInputSearchConcluted,
            ),
          ])
        } catch (error) {
          console.log(error)
        }
      },
      [
        getPendingRequirements,
        getCompletedAssociations,
        currentPageWithoutRequirement,
        currentPagePendingRequirements,
        currentPageCompletedAssociations,
        dataInputSearchAssociation,
        dataInputSearchRequirement,
        dataInputSearchConcluted,
      ],
    )

  const handleUpdateStatus = useCallback(
    async (data: UpdatestatusProps) => {
      const {
        id,
        status,
        updatedForm,
        exigencias_id,
      } = data

      try {
        if (
          updatedForm === 'Association'
        ) {
          await toast.promise(
            api.put(`association/${id}`, {
              status_association: status,
            }),
            {
              pending: 'Verificando seus dados',
              success:
                'Status da Exigência Atualizada com Sucesso!',
              error:
                'Ops! Verifique os Dados Digitados',
            },
          )
        }

        const RequerimentStatus = {
          exigencias_id,
          estado_do_requerimento: status,
        }

        await toast.promise(
          api.put(
            `updateRequeriment/${id}`,
            RequerimentStatus,
          ),
          {
            pending: 'Verificando seus dados',
            success:
              'Exigencia Atualizada com Sucesso!',
            error:
              'Ops! Verifique os Dados Digitados',
          },
        )

        /*
         * Atualiza as três tabelas.
         */

        await Promise.all([
          getAssociationListPending(
            currentPageWithoutRequirement,
            dataInputSearchAssociation,
          ),
          getPendingRequirements(
            currentPagePendingRequirements,
            dataInputSearchRequirement,
          ),
          getCompletedAssociations(
            currentPageCompletedAssociations,
            dataInputSearchConcluted,
          ),
        ])
      } catch (error) {
        console.log(error)
      }
    },
    [
      getAssociationListPending,
      getPendingRequirements,
      getCompletedAssociations,
      currentPageWithoutRequirement,
      currentPagePendingRequirements,
      currentPageCompletedAssociations,
      dataInputSearchAssociation,
      dataInputSearchRequirement,
      dataInputSearchConcluted,
    ],
  )

  const CreateRequeriment = useCallback(
    async (data: ListRequerimentProps) => {
      const { name, registration } =
        userDataLogin

      const {
        id,
        assinatura_do_advogado,
        declaracao_criminal,
        declaracao_de_desimpedimento,
        documento_inelegivel,
        dissolucao_ou_exticao,
        documentacao_de_identificacao,
        fundacoes,
        lista_e_edital,
        livro_rasao,
        oab,
        ppe,
        preechimento_completo,
        reconhecimento_de_firma,
        estado_do_requerimento,
        requisitos_estatuto,
        requisitos_criacao_de_estatuto,
        requisitos_de_estatutos_fundadores,
        informacao_divergente,
        campo_de_assinatura,
        retificacao_de_redacao,
        observations_documento_inelegivel,
        observations_lista_e_edital,
        observations_assinatura_do_advogado,
        observations_declaracao_criminal,
        observations_declaracao_de_desimpedimento,
        observations_livro_rasao,
        observations_requisitos_estatuto,
        observations_ppe,
        observations_requisitos_criacao_de_estatuto,
        observations_dissolucao_ou_exticao,
        observations_fundacoes,
        observations_reconhecimento_de_firma,
        observations_oab,
        observations_documentacao_de_identificacao,
        observations_requisitos_de_estatutos_fundadores,
        observations_campo_de_assinatura,
        observations_retificacao_de_redacao,
        requerimento_eletronico_rcpj,
      } = data

      const filteredAssociation =
        findAssociationById(id)

      const newListRequeriment = {
        assinatura_do_advogado,
        declaracao_criminal,
        declaracao_de_desimpedimento,
        documento_inelegivel,
        dissolucao_ou_exticao,
        documentacao_de_identificacao,
        fundacoes,
        lista_e_edital,
        livro_rasao,
        oab,
        ppe,
        preechimento_completo,
        reconhecimento_de_firma,
        requerimento_eletronico_rcpj,
        requisitos_estatuto,
        requisitos_criacao_de_estatuto,
        requisitos_de_estatutos_fundadores,
        estado_do_requerimento,
        informacao_divergente: {
          info: informacao_divergente?.info,
          state: informacao_divergente?.state,
        },

        campo_de_assinatura,
        retificacao_de_redacao,

        exigencias_id: id,

        observations_documento_inelegivel,
        observations_lista_e_edital,
        observations_assinatura_do_advogado,
        observations_declaracao_criminal,
        observations_declaracao_de_desimpedimento,
        observations_livro_rasao,
        observations_requisitos_estatuto,
        observations_ppe,
        observations_requisitos_criacao_de_estatuto,
        observations_dissolucao_ou_exticao,
        observations_fundacoes,
        observations_reconhecimento_de_firma,
        observations_oab,
        observations_documentacao_de_identificacao,
        observations_requisitos_de_estatutos_fundadores,
        observations_campo_de_assinatura,
        observations_retificacao_de_redacao,
      }

      try {
        const newList = await toast.promise(
          api.post(
            'createRequeriment',
            newListRequeriment,
          ),
          {
            pending: 'Verificando seus dados',
            success:
              'Exigencia Criada com Sucesso!',
            error:
              'Ops! Verifique os Dados Digitados',
          },
        )

        const { data: requeriment } =
          newList

        if (filteredAssociation) {
          setRequestListDataPDF({
            ...requeriment,
            ...filteredAssociation,
          })
        }

        setDataListRequeriment((prev) => [
          ...prev,
          requeriment,
        ])

        if (filteredAssociation?.createdAt) {
          const date = format(
            new Date(
              filteredAssociation.createdAt,
            ),
            'dd/MM/yyyy',
            {
              locale: ptBR,
            },
          )

          sendMailRequeriment({
            ...filteredAssociation,
            name,
            registration,
            itens_da_lista_pendetes:
              requeriment,
            data_da_recepcao: date,
          })
        }

        /*
         * A associação deixou de estar em
         * "sem requerimento" e passou para
         * "requerimentos pendentes".
         */

        await Promise.all([
          getAssociationListPending(
            currentPageWithoutRequirement,
            dataInputSearchAssociation,
          ),
          getPendingRequirements(
            currentPagePendingRequirements,
            dataInputSearchRequirement,
          ),
        ])
      } catch (error) {
        console.log(error)
      }
    },
    [
      userDataLogin,
      findAssociationById,
      sendMailRequeriment,
      getPendingRequirements,
      currentPageWithoutRequirement,
      currentPagePendingRequirements,
      dataInputSearchAssociation,
      dataInputSearchRequirement,
    ],
  )

const updateRequeriment = useCallback(
  async (data: UpdateListProps) => {
    const currentDate = new Date()

    const dataString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`

    const { name, registration } = userDataLogin

    const dataRequerimentUpdated = {
      id: data.id,
      assinatura_do_advogado: data.assinatura_do_advogado,
      campo_de_assinatura: data.campo_de_assinatura,
      data_atualizacao: dataString,
      data_da_recepcao: data.data_da_recepcao,
      declaracao_criminal: data.declaracao_criminal,
      declaracao_de_desimpedimento:
        data.declaracao_de_desimpedimento,
      declaracao_sindical: data.documento_inelegivel,
      dissolucao_ou_exticao: data.dissolucao_ou_exticao,
      documentacao_de_identificacao:
        data.documentacao_de_identificacao,
      fundacoes: data.fundacoes,
      exigencias_id: data.exigencias_id,
      informacao_divergente: data.informacao_divergente,
      lista_e_edital: data.lista_e_edital,
      livro_rasao: data.livro_rasao,
      oab: data.oab,
      ppe: data.ppe,
      preechimento_completo: data.preechimento_completo,
      reconhecimento_de_firma:
        data.reconhecimento_de_firma,
      requisitos_criacao_de_estatuto:
        data.requisitos_criacao_de_estatuto,
      requisitos_de_estatutos_fundadores:
        data.requisitos_de_estatutos_fundadores,
      requisitos_estatuto: data.requisitos_estatuto,
      retificacao_de_redacao:
        data.retificacao_de_redacao,
      requerimento_eletronico_rcpj:
        data.requerimento_eletronico_rcpj,
    }

    const filteredAssociation = findAssociationById(data.id)

    try {
      const updateRequermentResponse =
        await toast.promise(
          api.put(
            `updateRequeriment/${dataRequerimentUpdated.id}`,
            dataRequerimentUpdated,
          ),
          {
            pending: 'Verificando seus dados',
            success: 'Exigência atualizada com sucesso!',
            error: 'Ops! Verifique os dados digitados',
          },
        )

      const { data: updatedRequeriment } =
        updateRequermentResponse

      setDataListRequeriment((prev) => [
        ...prev,
        updatedRequeriment,
      ])

      if (filteredAssociation) {
        const date = format(
          new Date(
            updatedRequeriment.updatedAt ??
              updatedRequeriment.updateAt ??
              new Date(),
          ),
          'dd/MM/yyyy',
          {
            locale: ptBR,
          },
        )

        await sendMailRequeriment({
          ...filteredAssociation,
          name,
          registration,
          itens_da_lista_pendetes:
            updatedRequeriment,
          data_da_recepcao: date,
        })
      }

      await Promise.all([
        getPendingRequirements(
          currentPagePendingRequirements,
          dataInputSearchRequirement,
        ),
        getCompletedAssociations(
          currentPageCompletedAssociations,
          dataInputSearchConcluted,
        ),
      ])
    } catch (error) {
      console.log(error)
    }
  },
  [
    userDataLogin,
    findAssociationById,
    sendMailRequeriment,
    getPendingRequirements,
    getCompletedAssociations,
    currentPagePendingRequirements,
    currentPageCompletedAssociations,
    dataInputSearchRequirement,
    dataInputSearchConcluted,
  ],
)

  return (
    <RequerimentContext.Provider
      value={{
        dataListRequeriment,
        selectAListRequeriment,
        requestListDataPDF,
        dataListAssociationWithoutRequirement,
        dataInputSearchAssociation,
        paginationWithoutRequirement,
        currentPageWithoutRequirement,

        /*
         * Requerimentos pendentes
         */
        dataListPendingRequirements,
        dataInputSearchRequirement,
        paginationPendingRequirements,
        currentPagePendingRequirements,
        setDataListPendingRequirements,

        /*
         * Concluídos
         */
        dataListCompletedAssociations,
        dataInputSearchConcluted,
        paginationCompletedAssociations,
        currentPageCompletedAssociations,

        CreateRequeriment,
        setSelectAListRequeriment,
        updateRequeriment,
        sendMail,
        setDataListRequeriment,
        handleCreateAssociation,
        handleUpdateStatus,
        searchFunction,
        handleUpdateAssociation,

        getPendingRequirements,
        getCompletedAssociations,

        setCurrentPageWithoutRequirement,
        setCurrentPagePendingRequirements,
        setCurrentPageCompletedAssociations,
      }}
    >
      {children}
    </RequerimentContext.Provider>
  )
}