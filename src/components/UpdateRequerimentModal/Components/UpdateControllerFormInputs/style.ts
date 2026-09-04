import { styled } from 'styled-components'

export const ContainerControllerInput = styled.section`
  width: 100%;
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

export const ContainerInput = styled.div`
  width: 100%;
  height: max-content;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  border-radius: 8px;

  text-align: start;

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
  input:checked#documento_inelegivel_true + label,
  input:checked#retificacao_de_redacao_true + label,
  input:checked#requerimento_eletronico_rcpj_true + label,
  input:checked#campo_de_assinatura_true + label {
    background: ${({ theme }) => theme.colors['base-green']};
    color: ${({ theme }) => theme.colors['base-hover']};
  }

  svg {
    color: ${({ theme }) => theme.colors['base-text']};
    z-index: 10;

    &:hover {
      color: ${({ theme }) => theme.colors['base-background']};
    }
  }
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
  justify-content: space-between;
  gap: 0.5rem;

  padding: 1rem;

  background: ${({ theme }) => theme.colors['bg-input']};

  p {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 0.75rem;
  }

  &:hover {
    background: ${({ theme }) => theme.colors['base-blue']};
    color: ${({ theme }) => theme.colors['base-hover']};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3rem;
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

export const ContainerIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 22px;
`

export const ContainerUnilestedRequirement = styled.div`
width: 100%;
height: max-content;

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 1.5rem;

padding: 0.7rem;

h1 {
  align-self: start;
  margin-top: 1rem;
}


`

export const ContentUnilestedRequirement = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;



  select {
    width: 8.5rem;
    height: 4.5rem;

    border: none;
    border-radius: 8px;
    padding: 0.5rem;

    font-size: 1rem;


     background: ${({ theme }) => theme.colors['bg-input']};
  }
`

export const ContainerAddUnlistedRequirements = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
gap: 1rem;
margin-bottom: 1rem;

 input {
  width: 100%;
  padding: 0.9rem 0.5rem;
  border: none;
  border-radius: 5px;
  font-size: 0.875rem;
 }

 #delete {
  width: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 900;

  background-color: #ffffff;

  &:hover {
    background-color: #2b3d63;
    color: #ffffff;
  }
}
`