import { Trash, Warning } from 'phosphor-react'
import React, { useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { toast } from 'react-toastify'

import { ListRequerimentProps } from '../../../../contexts/RequerimentContext'
import { useRequeriment } from '../../../../hooks/useRequeriment'
import api from '../../../../services/api'
import { TextAreaObservations } from '../../../ControllerFormInputs/styled'
import { CreateRequerimentFormInputs } from '../../../CreateRequerimentModal/Components/CreateRequeriment'
import {
  ContainerControllerInput,
  ContainerIcons,
  ContainerInput,
  ContentInput,
  LabelCheck,
} from './style'

interface ControllerUpdateProps {
  register: UseFormRegister<CreateRequerimentFormInputs>
  dataRequeriment?: ListRequerimentProps
}

export const UpdateControllerFormInputs = ({
  register,
  dataRequeriment,
}: ControllerUpdateProps) => {
  const { dataListRequeriment, setDataListRequeriment } = useRequeriment()

  const [openInputsObservations, setOpenInputsObservations] = useState<{
    [key: string]: boolean
  }>({})
  const [updateList, setUpdateList] = useState<ListRequerimentProps>({
    ...dataRequeriment,
  })

  const handleDeleteRequest = async (nameList: string) => {
    const deleteList = {
      ...dataRequeriment,
      [nameList]: 'Não Listado',
      exigencias_id: dataRequeriment?.id,
    }

    if (dataRequeriment) {
      try {
        const updateRequermentResponse = await toast.promise(
          api.put(`updateRequeriment/${dataRequeriment.id}`, deleteList),
          {
            pending: 'Verificando seus dados',
            success: 'Exigencia Deletada com Sucesso!',
            error: 'Ops! Verifique os Dados Digitados',
          }
        )

        const { data } = updateRequermentResponse

        setDataListRequeriment([...dataListRequeriment, data])
        setUpdateList(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const toggleObservationInput = (fieldName: string) => {
    setOpenInputsObservations((prevState) => {
      const newState = {
        ...prevState,
        [fieldName]: !prevState[fieldName],
      }
      return newState
    })
  }

  return (
    <ContainerControllerInput>
      <ContentInput>
        {updateList.lista_e_edital === 'Pendente' && (
          <ContainerInput>
            <input
              id="lista_e_edital_true"
              type="checkbox"
              {...register('lista_e_edital')}
              name="lista_e_edital"
            />

            <input
              type="checkbox"
              {...register('observations_lista_e_edital')}
              name="observations_lista_e_edital"
              defaultValue={updateList.observations_lista_e_edital}
            />

            <LabelCheck htmlFor="lista_e_edital_true">
              <p>
                Apresentar lista de presença e edital;
                <span> (CNCGJ Art. 951) </span>
              </p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('lista_e_edital')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_lista_e_edital !== 'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('lista_e_edital')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.lista_e_edital && (
          <TextAreaObservations
            {...register('observations_lista_e_edital')}
            defaultValue={updateList.observations_lista_e_edital}
          />
        )}

        {updateList.declaracao_sindical === 'Pendente' && (
          <ContainerInput>
            <input
              id="declaracao_sindical_true"
              type="checkbox"
              {...register('declaracao_sindical')}
              name="declaracao_sindical"
            />

            <LabelCheck htmlFor="declaracao_sindical_true">
              <p>
                Apresentar declaração emitida pelo Ministério do Trabalho
                referente a unicidade sindical e da base territorial;{' '}
                <span> (CNCGJ Art. 935 § 4º) </span>
              </p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('declaracao_sindical')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_declaracao_sindical !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('declaracao_sindical')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.declaracao_sindical && (
          <TextAreaObservations
            {...register('observations_declaracao_sindical')}
            defaultValue={updateList.observations_declaracao_sindical}
          />
        )}

        {updateList.assinatura_do_advogado === 'Pendente' && (
          <ContainerInput>
            <input
              id="assinatura_do_advogado_true"
              type="checkbox"
              {...register('assinatura_do_advogado')}
              name="assinatura_do_advogado"
            />

            <LabelCheck htmlFor="assinatura_do_advogado_true">
              <p>
                Colher assinatura do advogado no ato apresentado para registro;
                <span> (Lei 8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)</span>
              </p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('assinatura_do_advogado')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_assinatura_do_advogado !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() =>
                    toggleObservationInput('assinatura_do_advogado')
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.assinatura_do_advogado && (
          <TextAreaObservations
            {...register('observations_assinatura_do_advogado')}
            defaultValue={updateList.observations_assinatura_do_advogado}
          />
        )}

        {updateList.declaracao_criminal === 'Pendente' && (
          <ContainerInput>
            <input
              id="declaracao_criminal_true"
              type="checkbox"
              {...register('declaracao_criminal')}
              name="declaracao_criminal"
            />

            <LabelCheck htmlFor="declaracao_criminal_true">
              <p>
                Apresentar declaração de desimpedimento e/ou certidão criminal;
                <span> (CNCGJ Art. 932 § 1º) </span>
              </p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('declaracao_criminal')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_declaracao_criminal !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('declaracao_criminal')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.declaracao_criminal && (
          <TextAreaObservations
            {...register('observations_declaracao_criminal')}
            defaultValue={updateList.observations_declaracao_criminal}
          />
        )}

        {updateList.requisitos_estatuto === 'Pendente' && (
          <ContainerInput>
            <input
              id="requisitos_estatuto_true"
              type="checkbox"
              {...register('requisitos_estatuto')}
              name="requisitos_estatuto"
            />
            <LabelCheck htmlFor="requisitos_estatuto_true">
              <p>
                Apresentar cópia do estatuto registrado no Distrito Federal
                <span>
                  (Obs:para diretórios de partidos políticos); (CNCGJ Art. 945)
                </span>
              </p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('requisitos_estatuto')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_requisitos_estatuto !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('requisitos_estatuto')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.requisitos_estatuto && (
          <TextAreaObservations
            {...register('observations_requisitos_estatuto')}
            defaultValue={updateList.observations_requisitos_estatuto}
          />
        )}

        {updateList.declaracao_de_desimpedimento === 'Pendente' && (
          <ContainerInput>
            <input
              id="declaracao_de_desimpedimento_true"
              type="checkbox"
              {...register('declaracao_de_desimpedimento')}
              name="declaracao_de_desimpedimento"
            />
            <LabelCheck htmlFor="declaracao_de_desimpedimento_true">
              <p>
                Apresentar declaração de desimpedimento{' '}
                <span>
                  (contratos e averbações de sociedade simples, ME, EPP); (CNCGJ
                  Art. 938)
                </span>
              </p>

              <ContainerIcons>
                <Trash
                  onClick={() =>
                    handleDeleteRequest('declaracao_de_desimpedimento')
                  }
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_declaracao_de_desimpedimento !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() =>
                    toggleObservationInput('declaracao_de_desimpedimento')
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.declaracao_de_desimpedimento && (
          <TextAreaObservations
            {...register('observations_declaracao_de_desimpedimento')}
            defaultValue={updateList.observations_declaracao_de_desimpedimento}
          />
        )}

        {updateList.livro_rasao === 'Pendente' && (
          <ContainerInput>
            <input
              id="livro_rasao_true"
              type="checkbox"
              {...register('livro_rasao')}
              name="livro_rasao"
            />

            <LabelCheck htmlFor="livro_rasao_true">
              <p>
                Apresentar livro razão ou contábil anteriormente registrado;
                <span>(CNCGJ Art. 960 § 1º)</span>
              </p>

              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('livro_rasao')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_livro_rasao !== 'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('livro_rasao')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.livro_rasao && (
          <TextAreaObservations
            {...register('observations_livro_rasao')}
            defaultValue={updateList.observations_livro_rasao}
          />
        )}

        {updateList.ppe === 'Pendente' && (
          <ContainerInput>
            <input
              id="ppe_true"
              type="checkbox"
              {...register('ppe')}
              name="ppe"
            />
            <LabelCheck htmlFor="ppe_true">
              <p>
                Apresentar declaração de pessoa politicamente exposta (PPE)
                <span>(Provimento CNJ 88/2019)</span>
              </p>
              <ContainerIcons>
                <Trash size={35} onClick={() => handleDeleteRequest('ppe')} />
                <Warning
                  size={32}
                  color={
                    updateList.observations_ppe !== 'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('ppe')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.ppe && (
          <TextAreaObservations
            {...register('observations_ppe')}
            defaultValue={updateList.observations_ppe}
          />
        )}

        {updateList.dissolucao_ou_exticao === 'Pendente' && (
          <ContainerInput>
            <input
              id="dissolucao_ou_exticao_true"
              type="checkbox"
              {...register('dissolucao_ou_exticao')}
              name="dissolucao_ou_exticao"
            />
            <LabelCheck htmlFor="dissolucao_ou_exticao_true">
              <p>
                No caso de dissolução ou extinção apresentar o documento;
                <span>
                  (liquidação, divisão de cotas de sócios, inexistência de ativo
                  e passivo, guarda dos livros etc.) (CNCGJ Art. 953)
                </span>
              </p>

              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('dissolucao_ou_exticao')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_dissolucao_ou_exticao !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() =>
                    toggleObservationInput('dissolucao_ou_exticao')
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.dissolucao_ou_exticao && (
          <TextAreaObservations
            {...register('observations_dissolucao_ou_exticao')}
            defaultValue={updateList.observations_dissolucao_ou_exticao}
          />
        )}

        {updateList.fundacoes === 'Pendente' && (
          <ContainerInput>
            <input
              id="fundacoes_true"
              type="checkbox"
              {...register('fundacoes')}
              name="fundacoes"
            />

            <LabelCheck htmlFor="fundacoes_true">
              <p>
                Nos atos referentes a fundações, exigir-se-á aprovação prévia do
                Ministério Público;
                <span>(CNCGJ Art. 941)</span>
              </p>

              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('fundacoes')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_fundacoes !== 'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('fundacoes')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.fundacoes && (
          <TextAreaObservations
            {...register('observations_fundacoes')}
            defaultValue={updateList.observations_fundacoes}
          />
        )}

        {updateList.reconhecimento_de_firma === 'Pendente' && (
          <ContainerInput>
            <input
              id="reconhecimento_de_firma_true"
              type="checkbox"
              {...register('reconhecimento_de_firma')}
              name="reconhecimento_de_firma"
            />
            <LabelCheck htmlFor="reconhecimento_de_firma_true">
              <p>presentar reconhecimento de firme no requerimento do DBE</p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('reconhecimento_de_firma')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_reconhecimento_de_firma !==
                    undefined
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() =>
                    toggleObservationInput('reconhecimento_de_firma')
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.reconhecimento_de_firma && (
          <TextAreaObservations
            {...register('observations_reconhecimento_de_firma')}
            defaultValue={updateList.observations_reconhecimento_de_firma}
          />
        )}

        {updateList.preechimento_completo === 'Pendente' && (
          <ContainerInput>
            <input
              id="preechimento_completo_true"
              type="checkbox"
              {...register('preechimento_completo')}
              name="preechimento_completo"
            />

            <LabelCheck htmlFor="preechimento_completo_true">
              <p>Preencher todos os campos do formulário/requerimento</p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('preechimento_completo')}
                  size={35}
                />{' '}
                <Warning
                  size={32}
                  color={
                    updateList.observations_ppe !== 'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() =>
                    toggleObservationInput('preechimento_completo')
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {/* {openInputsObservations.preechimento_completo && (
          <TextAreaObservations
            {...register('observations_preechimento_completo')}
            defaultValue={updateList.observations_preechimento_completo}
          />
        )} */}

        {updateList.oab === 'Pendente' && (
          <ContainerInput>
            <input
              id="oab_true"
              type="checkbox"
              {...register('oab')}
              name="oab"
            />
            <LabelCheck htmlFor="oab_true">
              <p>
                Apresentar cópia da OAB do representante jurídico do ato
                apresentado
              </p>

              <ContainerIcons>
                <Trash size={35} onClick={() => handleDeleteRequest('oab')} />{' '}
                <Warning
                  size={32}
                  color={
                    updateList.observations_oab !== 'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                  onClick={() => toggleObservationInput('oab')}
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.oab && (
          <TextAreaObservations
            {...register('observations_oab')}
            defaultValue={updateList.observations_oab}
          />
        )}

        {updateList.documentacao_de_identificacao === 'Pendente' && (
          <ContainerInput>
            <input
              id="documentacao_de_identificacao_true"
              type="checkbox"
              {...register('documentacao_de_identificacao')}
              name="documentacao_de_identificacao"
            />

            <LabelCheck htmlFor="documentacao_de_identificacao_true">
              <ContainerIcons></ContainerIcons>
              <p>Apresentar cópia simples do documento de identificação</p>
              <Trash
                onClick={() =>
                  handleDeleteRequest('documentacao_de_identificacao')
                }
                size={35}
              />
              <Warning
                size={32}
                color={
                  updateList.observations_documentacao_de_identificacao !==
                  'Sem observações'
                    ? '#FF0000'
                    : '#000'
                }
                onClick={() =>
                  toggleObservationInput('documentacao_de_identificacao')
                }
              />
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.documentacao_de_identificacao && (
          <TextAreaObservations
            {...register('observations_documentacao_de_identificacao')}
            defaultValue={updateList.observations_documentacao_de_identificacao}
          />
        )}

        {updateList.requisitos_de_estatutos_fundadores === 'Pendente' && (
          <ContainerInput>
            <input
              id="requisitos_de_estatutos_fundadores_true"
              type="checkbox"
              {...register('requisitos_de_estatutos_fundadores')}
              name="requisitos_de_estatutos_fundadores"
            />

            <LabelCheck htmlFor="requisitos_de_estatutos_fundadores_true">
              <p>
                Apresentar os requisitos obrigatórios no Estatuto: relação de
                documentos de fundadores;
                <span>
                  ( CNCGJ Art. 945 / Lei 6.015 no Art. 120 / Lei 10.406 Art. 46)
                </span>
              </p>

              <ContainerIcons>
                <Trash
                  onClick={() =>
                    handleDeleteRequest('requisitos_de_estatutos_fundadores')
                  }
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_requisitos_de_estatutos_fundadores !==
                    undefined
                      ? '#FF0000'
                      : '#000'
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.requisitos_de_estatutos_fundadores && (
          <TextAreaObservations
            {...register('observations_requisitos_de_estatutos_fundadores')}
            defaultValue={
              updateList.observations_requisitos_de_estatutos_fundadores
            }
          />
        )}

        {updateList.requisitos_criacao_de_estatuto === 'Pendente' && (
          <ContainerInput>
            <input
              id="requisitos_criacao_de_estatuto_true"
              type="checkbox"
              {...register('requisitos_criacao_de_estatuto')}
              name="requisitos_criacao_de_estatuto"
            />

            <LabelCheck htmlFor="requisitos_criacao_de_estatuto_true">
              <p>
                Apresentar os requisitos obrigatórios para criação do estatuto;
                <span>(Lei 10.406/2002 Art. 54)</span>
              </p>

              <ContainerIcons>
                <Trash
                  onClick={() =>
                    handleDeleteRequest('requisitos_criacao_de_estatuto')
                  }
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_requisitos_criacao_de_estatuto !==
                    undefined
                      ? '#FF0000'
                      : '#000'
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.requisitos_criacao_de_estatuto && (
          <TextAreaObservations
            {...register('observations_requisitos_criacao_de_estatuto')}
            defaultValue={
              updateList.observations_requisitos_criacao_de_estatuto
            }
          />
        )}

        {updateList.retificacao_de_redacao === 'Pendente' && (
          <ContainerInput>
            <input
              id="retificacao_de_redacao_true"
              type="checkbox"
              {...register('retificacao_de_redacao')}
              name="retificacao_de_redacao"
            />

            <LabelCheck htmlFor="retificacao_de_redacao_true">
              <p>Retificar redação do documento apresentado;</p>

              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('retificacao_de_redacao')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_retificacao_de_redacao !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {openInputsObservations.retificacao_de_redacao && (
          <TextAreaObservations
            {...register('observations_retificacao_de_redacao')}
            defaultValue={updateList.observations_retificacao_de_redacao}
          />
        )}

        {updateList.campo_de_assinatura === 'Pendente' && (
          <ContainerInput>
            <input
              id="campo_de_assinatura_true"
              type="checkbox"
              {...register('campo_de_assinatura')}
              name="campo_de_assinatura"
            />

            <LabelCheck htmlFor="campo_de_assinatura_true">
              <p>Preencher todos os campos de assinatura;</p>
              <ContainerIcons>
                <Trash
                  onClick={() => handleDeleteRequest('campo_de_assinatura')}
                  size={35}
                />
                <Warning
                  size={32}
                  color={
                    updateList.observations_campo_de_assinatura !==
                    'Sem observações'
                      ? '#FF0000'
                      : '#000'
                  }
                />
              </ContainerIcons>
            </LabelCheck>
          </ContainerInput>
        )}

        {/* {openInputsObservations.campo_de_assinatura && (
          <TextAreaObservations
            {...register('observations_campo_de_assinatura ')}
            defaultValue={updateList.observations_campo_de_assinatura}
          />
        )} */}
      </ContentInput>
    </ContainerControllerInput>
  )
}
