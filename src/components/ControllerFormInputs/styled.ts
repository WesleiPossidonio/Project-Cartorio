import { styled } from 'styled-components'

export const ContainerControllerInput = styled.div`
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 4rem;
  margin: 0 auto;
`

export const ContentInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  margin-top: 2rem;
`

export const ContainerCheckInput = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;

  margin-top: 1rem;

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
  input:checked#documentacao_de_identificacao_true + label {
    background: #265a63;
    color: #fff;

    /* &:hover {
      ${(props) => props.theme['purple-light']};
    } */
  }

  input:checked#lista_e_edital_false + label,
  input:checked#declaracao_sindical_false + label,
  input:checked#assinatura_do_advogado_false + label,
  input:checked#declaracao_criminal_false + label,
  input:checked#requisitos_estatuto_false + label,
  input:checked#declaracao_de_desimpedimento_false + label,
  input:checked#livro_rasao_false + label,
  input:checked#ppe_false + label,
  input:checked#dissolucao_ou_exticao_false + label,
  input:checked#fundacoes_false + label,
  input:checked#reconhecimento_de_firma_false + label,
  input:checked#preechimento_completo_false + label,
  input:checked#oab_false + label,
  input:checked#documentacao_de_identificacao_false + label {
    background: red;
    color: #fff;

    /* &:hover {
      ${(props) => props.theme['purple-light']};
    } */
  }
`

export const ContainerInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  margin-top: 0.5rem;
`

export const LabelCheck = styled.label`
  width: 6rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 6px;
  cursor: pointer;

  background: ${({ theme }) => theme.colors['bg-input']};
`
