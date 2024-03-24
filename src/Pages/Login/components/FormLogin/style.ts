import styled from 'styled-components'

export const ContentInputLogin = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1.2rem;
  padding: 2rem;

  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: center;
    margin: 0 auto;
  }

  p {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors['base-blue']};
    }
  }
`

export const ImageLogo = styled.img`
  width: min(15rem, 28vw);
  justify-self: center;
  margin-bottom: 0.5rem;
`

export const Label = styled.label`
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 1.009725rem;
  line-height: 1.5rem;
`

export const Button = styled.button`
  width: 100%;
  height: 3.155625rem;

  margin-top: 1rem;
  margin-bottom: 3rem;

  border: 1.00973px solid ${({ theme }) => theme.colors['base-button']};
  border-radius: 0.504863125rem;

  font-style: normal;
  font-weight: 600;
  font-size: 1.009725rem;
  line-height: 3.155625rem;
  text-align: center;
  color: ${({ theme }) => theme.colors['base-button']};

  background: transparent;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors['base-button']};
    color: #fff;
    transition: 0.5s ease-in-out;
  }
`

export const ImageMainLogin = styled.img`
  display: none;

  @media (max-width: 950px) {
    display: block;
    width: min(35rem, 45vw);
    align-self: flex-end;

    margin-top: -5rem;
    margin-right: 3rem;
  }

  @media (max-width: 598px) {
    display: none;
  }
`
