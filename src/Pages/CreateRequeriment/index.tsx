import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

import { ControllerFormInputs } from '../../components/ControllerFormInputs'
import { Input } from '../../components/Input'
import { MenuPage } from '../../components/MenuPage'
import { TitleText } from '../../components/typography'
import { useRequeriment } from '../../hooks/useRequeriment'
import {
  ButtonCreateRequeriment,
  ButtonHome,
  ContainerForm,
  SectionCreateRequirement,
} from './styled'

const createRequerimentFormSchema = zod.object({
  nome_da_instituicao: zod.string(),
  nome_do_representante: zod.string(),
  cnpj: zod
    .string()
    .min(14, 'Por Favor, digite o CNPJ valido')
    .max(14, 'Por Favor, digite o CNPJ valido'),
  email_do_representante: zod
    .string()
    .email('Por favor digite um email válido'),
  telefone_contato: zod.string().min(11).max(11),
  declaracao_sindical: zod.string(),
  lista_e_edital: zod.string(),
  assinatura_do_advogado: zod.string(),
  declaracao_criminal: zod.string(),
  declaracao_de_desimpedimento: zod.string(),
  livro_rasao: zod.string(),
  ppe: zod.string(),
  requisitos_estatuto: zod.string(),
  dissolucao_ou_exticao: zod.string(),
  fundacoes: zod.string(),
  reconhecimento_de_firma: zod.string(),
  preechimento_completo: zod.string(),
  oab: zod.string(),
  documentacao_de_identificacao: zod.string(),
  // campo_de_assinatura: zod.string(),
  // retificacao_de_redacao: zod.string(),
  // informacao_divergente: zod.string(),
  // quais_informacoes_divergentes: zod.string(),
})

export type CreateRequerimentFormInputs = zod.infer<
  typeof createRequerimentFormSchema
>

export const FormCreateRequeriment = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateRequerimentFormInputs>({
    resolver: zodResolver(createRequerimentFormSchema),
  })

  const { CreateRequeriment } = useRequeriment()

  const navigate = useNavigate()

  const handleNavigateToHome = () => {
    navigate('/')
  }

  const handleCreateRequeriment = async (data: CreateRequerimentFormInputs) => {
    console.log(data)
    CreateRequeriment(data)
    reset()
  }

  return (
    <SectionCreateRequirement>
      <MenuPage />
      <div>
        <TitleText size="s">Adicionar Exigência</TitleText>
        <ButtonHome onClick={handleNavigateToHome}>Voltar ao Início</ButtonHome>

        <form onSubmit={handleSubmit(handleCreateRequeriment)}>
          <TitleText size="s">Criar Exigência</TitleText>
          <ContainerForm>
            <div id="institution-name">
              <Input
                placeholder="Nome da Instituição"
                type="text"
                {...register('nome_da_instituicao')}
              />
            </div>

            <Input
              placeholder="Nº CNPJ"
              type="text"
              id="number-cnpj"
              {...register('cnpj')}
              error={errors.cnpj?.message}
            />
            <Input
              placeholder="Nome do Representante"
              type="text"
              id="name-of-representative"
              {...register('nome_do_representante')}
            />
            <Input
              placeholder="E-mail"
              type="text"
              id="email"
              {...register('email_do_representante')}
              error={errors.email_do_representante?.message}
            />

            <Input
              placeholder="Telefone de contato"
              type="text"
              id="phone"
              {...register('telefone_contato')}
            />
          </ContainerForm>

          <ControllerFormInputs register={register} />

          <ButtonCreateRequeriment type="submit" disabled={isSubmitting}>
            Enviar Dados
          </ButtonCreateRequeriment>
        </form>
      </div>
    </SectionCreateRequirement>
  )
}
