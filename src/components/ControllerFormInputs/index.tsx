import { UseFormRegister } from 'react-hook-form'

import { CreateRequerimentFormInputs } from '../../Pages/CreateRequeriment'
import { TextRegular } from '../typography'
import {
  ContainerInput,
  ContainerCheckInput,
  ContainerControllerInput,
  ContentInput,
  LabelCheck,
} from './styled'

interface ControllerProps {
  register: UseFormRegister<CreateRequerimentFormInputs>
}

export const ControllerFormInputs = ({ register }: ControllerProps) => {
  return (
    <ContainerControllerInput>
      <ContentInput>
        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou lista de presença e edital; (CNCGJ Art. 951)
          </TextRegular>
          <ContainerInput>
            <input
              id="lista_e_edital_true"
              type="radio"
              value="Sim"
              {...register('lista_e_edital')}
            />
            <LabelCheck htmlFor="lista_e_edital_true">Sim</LabelCheck>

            <input
              id="lista_e_edital_false"
              type="radio"
              value="Não"
              {...register('lista_e_edital')}
            />
            <LabelCheck htmlFor="lista_e_edital_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou declaração emitida pelo Ministério do Trabalho referente
            a unicidade sindical e da base territorial; (CNCGJ Art. 935 § 4º)
          </TextRegular>
          <ContainerInput>
            <input
              id="declaracao_sindical_true"
              type="radio"
              value="Sim"
              {...register('declaracao_sindical')}
            />
            <LabelCheck htmlFor="declaracao_sindical_true">Sim</LabelCheck>

            <input
              id="declaracao_sindical_false"
              type="radio"
              value="Não"
              {...register('declaracao_sindical')}
            />
            <LabelCheck htmlFor="declaracao_sindical_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Colheu assinatura do advogado no ato apresentado para registro; (Lei
            8.906 Art. 1º §2º / CNCGJ Artigo 944 § 3º)
          </TextRegular>
          <ContainerInput>
            <input
              id="assinatura_do_advogado_true"
              type="radio"
              value="Sim"
              {...register('assinatura_do_advogado')}
            />
            <LabelCheck htmlFor="assinatura_do_advogado_true">Sim</LabelCheck>

            <input
              id="assinatura_do_advogado_false"
              type="radio"
              value="Não"
              {...register('assinatura_do_advogado')}
            />
            <LabelCheck htmlFor="assinatura_do_advogado_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou declaração de desimpedimento e/ou certidão criminal;
            (CNCGJ Art. 932 § 1º)
          </TextRegular>
          <ContainerInput>
            <input
              id="declaracao_criminal_true"
              type="radio"
              value="Sim"
              {...register('declaracao_criminal')}
            />
            <LabelCheck htmlFor="declaracao_criminal_true">Sim</LabelCheck>

            <input
              id="declaracao_criminal_false"
              type="radio"
              value="Não"
              {...register('declaracao_criminal')}
            />
            <LabelCheck htmlFor="declaracao_criminal_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou cópia do estatuto registrado no Distrito Federal
            (Obs:para diretórios de partidos políticos); (CNCGJ Art. 945)
          </TextRegular>
          <ContainerInput>
            <input
              id="requisitos_estatuto_true"
              type="radio"
              value="Sim"
              {...register('requisitos_estatuto')}
            />
            <LabelCheck htmlFor="requisitos_estatuto_true">Sim</LabelCheck>

            <input
              id="requisitos_estatuto_false"
              type="radio"
              value="Não"
              {...register('requisitos_estatuto')}
            />
            <LabelCheck htmlFor="requisitos_estatuto_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou declaração de desimpedimento (contratos e averbações de
            sociedade simples, ME, EPP); (CNCGJ Art. 938)
          </TextRegular>
          <ContainerInput>
            <input
              id="declaracao_de_desimpedimento_true"
              type="radio"
              value="Sim"
              {...register('declaracao_de_desimpedimento')}
            />
            <LabelCheck htmlFor="declaracao_de_desimpedimento_true">
              Sim
            </LabelCheck>

            <input
              id="declaracao_de_desimpedimento_false"
              type="radio"
              value="Não"
              {...register('declaracao_de_desimpedimento')}
            />
            <LabelCheck htmlFor="declaracao_de_desimpedimento_false">
              Não
            </LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou livro razão ou contábil anteriormente registrado; (CNCGJ
            Art. 960 § 1º)
          </TextRegular>
          <ContainerInput>
            <input
              id="livro_rasao_true"
              type="radio"
              value="Sim"
              {...register('livro_rasao')}
            />
            <LabelCheck htmlFor="livro_rasao_true">Sim</LabelCheck>

            <input
              id="livro_rasao_false"
              type="radio"
              value="Não"
              {...register('livro_rasao')}
            />
            <LabelCheck htmlFor="livro_rasao_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>
      </ContentInput>

      <ContentInput>
        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou declaração de pessoa politicamente exposta (PPE);
          </TextRegular>
          <ContainerInput>
            <input
              id="ppe_true"
              type="radio"
              value="Sim"
              {...register('ppe')}
            />
            <LabelCheck htmlFor="ppe_true">Sim</LabelCheck>

            <input
              id="ppe_false"
              type="radio"
              value="Não"
              {...register('ppe')}
            />
            <LabelCheck htmlFor="ppe_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            o No caso de dissolução ou extinção deverá conter no documento:
            (liquidação, divisão de cotas de sócios, inexistência de ativo e
            passivo, guarda dos livros etc.) (CNCGJ Art. 953)
          </TextRegular>
          <ContainerInput>
            <input
              id="dissolucao_ou_exticao_true"
              type="radio"
              value="Sim"
              {...register('dissolucao_ou_exticao')}
            />
            <LabelCheck htmlFor="dissolucao_ou_exticao_true">Sim</LabelCheck>

            <input
              id="dissolucao_ou_exticao_false"
              type="radio"
              value="Não"
              {...register('dissolucao_ou_exticao')}
            />
            <LabelCheck htmlFor="dissolucao_ou_exticao_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            o Nos atos referentes a fundações, exigir-se-á aprovação prévia do
            Ministério Público; (CNCGJ Art. 941)
          </TextRegular>
          <ContainerInput>
            <input
              id="fundacoes_true"
              type="radio"
              value="Sim"
              {...register('fundacoes')}
            />
            <LabelCheck htmlFor="fundacoes_true">Sim</LabelCheck>

            <input
              id="fundacoes_false"
              type="radio"
              value="Não"
              {...register('fundacoes')}
            />
            <LabelCheck htmlFor="fundacoes_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou reconhecimento de firme no requerimento do DBE;
          </TextRegular>
          <ContainerInput>
            <input
              id="reconhecimento_de_firma_true"
              type="radio"
              value="Sim"
              {...register('reconhecimento_de_firma')}
            />
            <LabelCheck htmlFor="reconhecimento_de_firma_true">Sim</LabelCheck>

            <input
              id="reconhecimento_de_firma_false"
              type="radio"
              value="Não"
              {...register('reconhecimento_de_firma')}
            />
            <LabelCheck htmlFor="reconhecimento_de_firma_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Preencheu todos os campos do formulário/requerimento;
          </TextRegular>
          <ContainerInput>
            <input
              id="preechimento_completo_true"
              type="radio"
              value="Sim"
              {...register('preechimento_completo')}
            />
            <LabelCheck htmlFor="preechimento_completo_true">Sim</LabelCheck>

            <input
              id="preechimento_completo_false"
              type="radio"
              value="Não"
              {...register('preechimento_completo')}
            />
            <LabelCheck htmlFor="preechimento_completo_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou cópia da OAB do representante jurídico do ato
            apresentado;
          </TextRegular>
          <ContainerInput>
            <input
              id="oab_true"
              type="radio"
              value="Sim"
              {...register('oab')}
            />
            <LabelCheck htmlFor="oab_true">Sim</LabelCheck>

            <input
              id="oab_false"
              type="radio"
              value="Não"
              {...register('oab')}
            />
            <LabelCheck htmlFor="oab_false">Não</LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>

        <ContainerCheckInput>
          <TextRegular weight="bold" size="s">
            Apresentou cópia simples do documento de identificação de:
          </TextRegular>
          <ContainerInput>
            <input
              id="documentacao_de_identificacao_true"
              type="radio"
              value="Sim"
              {...register('documentacao_de_identificacao')}
            />
            <LabelCheck htmlFor="documentacao_de_identificacao_true">
              Sim
            </LabelCheck>

            <input
              id="documentacao_de_identificacao_false"
              type="radio"
              value="Não"
              {...register('documentacao_de_identificacao')}
            />
            <LabelCheck htmlFor="documentacao_de_identificacao_false">
              Não
            </LabelCheck>
          </ContainerInput>
        </ContainerCheckInput>
      </ContentInput>
    </ContainerControllerInput>
  )
}
