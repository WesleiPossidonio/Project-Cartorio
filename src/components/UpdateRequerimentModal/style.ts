import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { styled } from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  z-index: 10;
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;

  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  z-index: 12;
  width: 90%;
  height: 90vh;
  border-radius: 6px;
  padding: 2.5rem 1.5rem;
  background: #f2f3ee;

  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  button[type='submit'] {
    height: 58px;
    border: 0;
    background-color: #2b3d63;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    padding: 0 1.25rem;

    border-radius: 6px;
    margin-top: 1.5rem;

    cursor: pointer;
    box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      transition: background-color 0.2s;
      background-color: #2b3d55;
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  color: #2b3d63;
`

export const CreateUserType = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
  }

  > p {
    align-self: flex-start;
    margin-bottom: 0%.5rem;
  }
`

interface CreateButtonTypes {
  variant: 'true' | 'false'
}

export const CreateUserTypeButton = styled(RadioGroup.Item)<CreateButtonTypes>`
  background: #fff;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: -5px 0px 31px 0px rgba(0, 0, 0, 0.1);

  color: ${(props) => props.theme['gray-300']};

  svg {
    color: ${({ variant }) => (variant === 'true' ? '#2b3d63' : 'red')};
  }

  &[data-state='unchecked']:hover {
    transition: background-color 2s;
    background: #2b3d63;
  }

  &[data-state='checked'] {
    color: #fff;
    background: ${({ variant }) => (variant === 'true' ? '#265A63' : 'red')};
  }

  svg {
    color: #d6d6d6;
  }
`

export const ContentRequeriment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  padding: 2.5rem 1.5rem;

  form {
    width: 100%;
  }
`
export const ContainerAddRequeriment = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.8rem;

  margin-top: 2rem;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`
