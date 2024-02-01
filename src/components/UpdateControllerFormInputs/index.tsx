import { Check } from 'phosphor-react'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import { CreateRequerimentFormInputs } from '../../Pages/CreateRequeriment'
import { LocationProps } from '../../Pages/UpdateRequeriment'
import {
  ContainerInput,
  ContainerCheckInput,
  ContainerControllerInput,
  ContentInput,
  LabelCheck,
} from './styled'

interface ControllerUpdateProps {
  register: UseFormRegister<CreateRequerimentFormInputs>
}

export const UpdateControllerFormInputs = ({
  register,
}: ControllerUpdateProps) => {
  const { state } = useLocation() as unknown as LocationProps

  return (
    <ContainerControllerInput>
      <ContentInput>
        {state.lista_e_edital === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="lista_e_edital_true"
                type="checkbox"
                {...register('lista_e_edital')}
                name="lista_e_edital"
              />

              <LabelCheck htmlFor="lista_e_edital_true">
                <Check size={32} />
                <p>
                  Apresentar lista de presença e edital;
                  <span> (CNCGJ Art. 951) </span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.declaracao_sindical === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="declaracao_sindical_true"
                type="checkbox"
                {...register('declaracao_sindical')}
                name="declaracao_sindical"
              />

              <LabelCheck htmlFor="declaracao_sindical_true">
                <Check size={32} />
                <p>
                  Apresentar declaração emitida pelo Ministério do Trabalho
                  referente a unicidade sindical e da base territorial;{' '}
                  <span> (CNCGJ Art. 935 § 4º) </span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.assinatura_do_advogado === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="assinatura_do_advogado_true"
                type="checkbox"
                {...register('assinatura_do_advogado')}
                name="assinatura_do_advogado"
              />

              <LabelCheck htmlFor="assinatura_do_advogado_true">
                <Check size={32} />
                <p>
                  Colher assinatura do advogado no ato apresentado para
                  registro;
                  <span> (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)</span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.declaracao_criminal === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="declaracao_criminal_true"
                type="checkbox"
                {...register('declaracao_criminal')}
                name="declaracao_criminal"
              />

              <LabelCheck htmlFor="declaracao_criminal_true">
                <Check size={32} />
                <p>
                  Apresentar declaração de desimpedimento e/ou certidão
                  criminal;
                  <span> (CNCGJ Art. 932 § 1º) </span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.requisitos_estatuto === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="requisitos_estatuto_true"
                type="checkbox"
                {...register('requisitos_estatuto')}
                name="requisitos_estatuto"
              />
              <LabelCheck htmlFor="requisitos_estatuto_true">
                <Check size={32} />
                <p>
                  Apresentar cópia do estatuto registrado no Distrito Federal
                  <span>
                    (Obs:para diretórios de partidos políticos); (CNCGJ Art.
                    945)
                  </span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.declaracao_de_desimpedimento === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="declaracao_de_desimpedimento_true"
                type="checkbox"
                {...register('declaracao_de_desimpedimento')}
                name="declaracao_de_desimpedimento"
              />
              <LabelCheck htmlFor="declaracao_de_desimpedimento_true">
                <Check size={32} />
                <p>
                  Apresentar declaração de desimpedimento{' '}
                  <span>
                    (contratos e averbações de sociedade simples, ME, EPP);
                    (CNCGJ Art. 938)
                  </span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}
        {state.livro_rasao === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="livro_rasao_true"
                type="checkbox"
                {...register('livro_rasao')}
                name="livro_rasao"
              />
              <LabelCheck htmlFor="livro_rasao_true">
                <Check size={32} />
                <p>
                  Apresentar livro razão ou contábil anteriormente registrado;
                  <span>(CNCGJ Art. 960 § 1º)</span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.ppe === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="ppe_true"
                type="checkbox"
                {...register('ppe')}
                name="ppe"
              />
              <LabelCheck htmlFor="ppe_true">
                <Check size={32} />
                <p>
                  Apresentar declaração de pessoa politicamente exposta (PPE)
                  <span>(Provimento CNJ 88/2019)</span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}
        {state.dissolucao_ou_exticao === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="dissolucao_ou_exticao_true"
                type="checkbox"
                {...register('dissolucao_ou_exticao')}
                name="dissolucao_ou_exticao"
              />
              <LabelCheck htmlFor="dissolucao_ou_exticao_true">
                <Check size={32} />
                <p>
                  No caso de dissolução ou extinção apresentar o documento;
                  <span>
                    (liquidação, divisão de cotas de sócios, inexistência de
                    ativo e passivo, guarda dos livros etc.) (CNCGJ Art. 953)
                  </span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.fundacoes === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="fundacoes_true"
                type="checkbox"
                {...register('fundacoes')}
                name="fundacoes"
              />

              <LabelCheck htmlFor="fundacoes_true">
                <Check size={32} />
                <p>
                  Nos atos referentes a fundações, exigir-se-á aprovação prévia
                  do Ministério Público;
                  <span>(CNCGJ Art. 941)</span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.reconhecimento_de_firma === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="reconhecimento_de_firma_true"
                type="checkbox"
                {...register('reconhecimento_de_firma')}
                name="reconhecimento_de_firma"
              />
              <LabelCheck htmlFor="reconhecimento_de_firma_true">
                <Check size={32} />
                <p>presentar reconhecimento de firme no requerimento do DBE</p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.preechimento_completo === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="preechimento_completo_true"
                type="checkbox"
                {...register('preechimento_completo')}
                name="preechimento_completo"
              />

              <LabelCheck htmlFor="preechimento_completo_true">
                <Check size={32} />
                <p>Preencher todos os campos do formulário/requerimento</p>{' '}
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.oab === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="oab_true"
                type="checkbox"
                {...register('oab')}
                name="oab"
              />
              <LabelCheck htmlFor="oab_true">
                <Check size={32} />
                <p>
                  Apresentar cópia da OAB do representante jurídico do ato
                  apresentado
                </p>{' '}
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.documentacao_de_identificacao === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="documentacao_de_identificacao_true"
                type="checkbox"
                value="Não"
                {...register('documentacao_de_identificacao')}
                name="documentacao_de_identificacao"
              />

              <LabelCheck htmlFor="documentacao_de_identificacao_true">
                <Check size={32} />
                <p>Apresentar cópia simples do documento de identificação</p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.requisitos_de_estatutos_fundadores === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="requisitos_de_estatutos_fundadores_true"
                type="checkbox"
                {...register('requisitos_de_estatutos_fundadores')}
                name="requisitos_de_estatutos_fundadores"
              />

              <LabelCheck htmlFor="requisitos_de_estatutos_fundadores_true">
                <Check size={32} />
                <p>
                  Apresentar os requisitos obrigatórios no Estatuto: relação de
                  documentos de fundadores;
                  <span>
                    ( CNCGJ Art. 945 / Lei 6.015 no Art. 120 / Lei 10.406 Art.
                    46)
                  </span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.requisitos_criacao_de_estatuto === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="requisitos_criacao_de_estatuto_true"
                type="checkbox"
                {...register('requisitos_criacao_de_estatuto')}
                name="requisitos_criacao_de_estatuto"
              />

              <LabelCheck htmlFor="requisitos_criacao_de_estatuto_true">
                <Check size={32} />
                <p>
                  Apresentar os requisitos obrigatórios para criação do
                  estatuto;
                  <span>(Lei 10.406/2002 Art. 54)</span>
                </p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.retificacao_de_redacao === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="retificacao_de_redacao_true"
                type="checkbox"
                {...register('retificacao_de_redacao')}
                name="retificacao_de_redacao"
              />

              <LabelCheck htmlFor="retificacao_de_redacao_true">
                <Check size={32} />
                <p>Retificar redação do documento apresentado;</p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}

        {state.campo_de_assinatura === 'Pendente' && (
          <ContainerCheckInput>
            <ContainerInput>
              <input
                id="campo_de_assinatura_true"
                type="checkbox"
                {...register('campo_de_assinatura')}
                name="campo_de_assinatura"
              />

              <LabelCheck htmlFor="campo_de_assinatura_true">
                <Check size={32} />
                <p>Preencher todos os campos de assinatura;</p>
              </LabelCheck>
            </ContainerInput>
          </ContainerCheckInput>
        )}
      </ContentInput>
    </ContainerControllerInput>
  )
}
