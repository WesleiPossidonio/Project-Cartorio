import * as Dialog from '@radix-ui/react-dialog'
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
  height: 68vh;
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
