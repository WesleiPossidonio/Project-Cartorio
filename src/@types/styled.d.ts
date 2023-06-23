import 'styled-components'
import { defaultThemes } from '../styles/theme/default'

type ThemeType = typeof defaultThemes

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
