export interface CreateAssociationProps {
  nome_da_instituicao: string
  numero_do_protocolo?: number
  nome_do_representante: string
  cnpj_cpf: string
  email_do_representante: string
  telefone_contato: string
  data_da_recepcao: string
  sobre_exigencia: string
  status_association?: string
}

export interface UpdateAssociationProps {
  id: number
  nome_da_instituicao: string
  estado_do_requerimento?: string
  numero_do_protocolo?: number
  nome_do_representante: string
  cnpj_cpf: string
  email_do_representante: string
  telefone_contato: string
  status_association?: string
  createdAt?: string
}

export interface SendMailAssociationProps extends CreateAssociationProps {
  name: string
  registration: string
}

export interface ListRequerimentProps {
  id?: number
  exigencias_id?: number
  documento_inelegivel?: string
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
  unlisted_requirements?: [{
    id?: number
    name?: string,
    status?: string,
    observacao?: string
  }]
  requerimento_eletronico_rcpj?: string
  updatedAt?: string
  data_da_recepcao?: string
  requisitos_de_estatutos_fundadores?: string
  requisitos_criacao_de_estatuto?: string
  data_atualizacao?: string
  estado_do_requerimento?: string
  observations_lista_e_edital?: string
  observations_assinatura_do_advogado?: string
  observations_declaracao_criminal?: string
  observations_documento_inelegivel?: string
  observations_declaracao_de_desimpedimento?: string
  observations_livro_rasao?: string
  observations_requisitos_estatuto?: string
  observations_ppe?: string
  observations_requisitos_criacao_de_estatuto?: string
  observations_dissolucao_ou_exticao?: string
  observations_fundacoes?: string
  observations_reconhecimento_de_firma?: string
  observations_oab?: string
  observations_documentacao_de_identificacao?: string
  observations_requisitos_de_estatutos_fundadores?: string
  observations_campo_de_assinatura?: string
  observations_retificacao_de_redacao?: string
  observations_requerimento_eletronico_rcpj?: string
}

export interface AssociationProps extends CreateAssociationProps {
  id: number
  updatedAt?: string
  createdAt?: string
  exigencia?: ListRequerimentProps
}

export interface SendMailRequerimentProps extends CreateAssociationProps {
  itens_da_lista_pendetes: ListRequerimentProps[]
  registration: string
  name: string
}

export interface UpdateListProps extends ListRequerimentProps {
  handleListConcluted: boolean
  exigencias_id: number
}

export interface filteredRequerimentProps {
  query: string
  formTable: string
}

export interface UpdatestatusProps {
  id: number
  status: string
  updatedForm: string
  exigencias_id?: number
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}