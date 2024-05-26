import { styled } from 'styled-components'

export const SectionCreateRequirement = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .PdfContainer {
      align-self: flex-start;
      margin-top: 1rem;
    }
  }

  a {
    text-decoration: none;
  }
`

export const ButtonHome = styled.button`
  width: 8rem;

  padding: 0.6rem;
  border: 0;
  border-radius: 6px;

  margin-top: 1rem;

  font-size: 1rem;
  font-weight: 700;

  background: #2b3d63;
  color: #fff;
`
