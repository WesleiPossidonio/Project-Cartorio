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
  min-width: 90%;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: #f2f3ee;

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

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
