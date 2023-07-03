import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    font-family: 'Poppins', sans-serif;
  }

 html {
  @media (max-width: 1260px){
      font-size: 87.5%;
    }
 }

 body {
   background: ${({ theme }) => theme.colors['base-cinza-100']}
 }
`
