import { styled } from 'styled-components'

export const ContainerControllerInput = styled.section`
  width: 90%;
  display: flex;
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
  input:checked#documentacao_de_identificacao_true + label,
  input:checked#requisitos_criacao_de_estatuto_true + label,
  input:checked#requisitos_de_estatutos_fundadores_true + label {
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
  align-items: center;
  justify-content: center;
`

export const LabelCheck = styled.label`
  width: 100%;
  font-size: 0.875rem;
  font-weight: 700;

  border: none;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  padding: 1rem;

  background: ${({ theme }) => theme.colors['bg-input']};

  &:hover {
    background: #2b3d63;
    color: #fff;
  }

  p {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 0.75rem;
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
