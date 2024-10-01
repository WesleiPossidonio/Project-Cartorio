import { styled } from 'styled-components'

export const ContainerControllerInput = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;

    svg {
      width: 2rem;
    }
  }
`

export const ContentInput = styled.div`
  width: 100%;
`

export const ContainerCheckInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.3rem;

  margin-top: 1.2rem;
  border-radius: 6px;

  input {
    visibility: hidden;
    appearance: none;
  }

  input:checked#lista_e_edital_true + label,
  input:checked#declaracao_sindical_true + label,
  input:checked#assinatura_do_advogado_true + label,
  input:checked#declaracao_criminal_true + label,
  input:checked#requisitos_estatuto_true + label,
  input:checked#declaracao_de_desimpedimento_true + label,
  input:checked#livro_rasao_true + label,
  input:checked#ppe_true + label,
  input:checked#dissolucao_ou_exticao_true + label,
  input:checked#fundacoes_true + label,
  input:checked#reconhecimento_de_firma_true + label,
  input:checked#preechimento_completo_true + label,
  input:checked#oab_true + label,
  input:checked#documentacao_de_identificacao_true + label,
  input:checked#requisitos_criacao_de_estatuto_true + label,
  input:checked#requisitos_de_estatutos_fundadores_true + label,
  input:checked#retificacao_de_redacao_true + label,
  input:checked#requisitos_criacao_de_estatuto_true + label,
  input:checked#campo_de_assinatura_true + label {
    background: #265a63;
    color: #fff;

    /* &:hover {
      ${(props) => props.theme['purple-light']};
    } */
  }
`

export const ContainerInput = styled.div`
  width: 100%;
  height: max-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export const LabelCheck = styled.label`
  width: 90%;
  font-size: 0.875rem;
  font-weight: 700;

  border: none;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;

  padding: 1rem;

  background: ${({ theme }) => theme.colors['base-background']};

  p {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 0.75rem;
  }

  &:hover {
    background: #2b3d63;
    color: #fff;
  }

  @media (max-width: 768px) {
    span {
      font-size: 0.625rem;
    }
  }

  @media (max-width: 768px) {
    svg {
      display: none;
    }
  }
`

export const ContainerInfo = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    visibility: hidden;
    appearance: none;
  }

  input:checked#observations_lista_e_edital + label,
  input:checked#observations_declaracao_sindical + label,
  input:checked#observations_assinatura_do_advogado + label,
  input:checked#observations_declaracao_criminal + label,
  input:checked#observations_requisitos_estatuto + label,
  input:checked#observations_declaracao_de_desimpedimento + label,
  input:checked#observations_livro_rasao + label,
  input:checked#observations_ppe + label,
  input:checked#observations_dissolucao_ou_exticao + label,
  input:checked#observations_fundacoes + label,
  input:checked#observations_reconhecimento_de_firma + label,
  input:checked#observations_preechimento_completo + label,
  input:checked#observations_oab + label,
  input:checked#observations_documentacao_de_identificacao + label,
  input:checked#observations_requisitos_criacao_de_estatuto + label,
  input:checked#observations_requisitos_de_estatutos_fundadores + label,
  input:checked#observations_retificacao_de_redacao + label,
  input:checked#observations_requisitos_criacao_de_estatuto + label,
  input:checked#observations_campo_de_assinatura + label {
    background: ${({ theme }) => theme.colors['base-error']};
    color: #fff;
  }
`

export const ContentInfo = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5;

  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 1rem;
  background: ${({ theme }) => theme.colors['base-background']};

  &:hover {
    background: ${({ theme }) => theme.colors['base-blue']};
    color: #fff;
  }
`

export const ContainerButtonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 1.5rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    margin-top: 0.8rem;
  }
`
export const TextArea = styled.textarea`
  width: 50%;
  height: 10rem;

  align-self: flex-start;
  margin-top: 1rem;

  border: 2px solid #2b3d63;
  border-radius: 8px;
  padding: 0.8rem;

  &:focus {
    border-color: #265a63;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`
export const TextAreaObservations = styled(TextArea)`
  width: 85%;
  height: 6rem;
  margin-left: 0.5rem;
  margin-top: 0.2rem;
`
