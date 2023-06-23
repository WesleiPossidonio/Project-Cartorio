import styled from 'styled-components'

interface RegularTextProps {
  size?: 'l' | 'm' | 's'
  color?: 'title' | 'subtitle' | 'text' | 'error'
  weight?: string | number
}

interface TitleTextProps {
  size?: 'l' | 'm' | 's'
  color?: 'title' | 'subtitle' | 'text'
  weight?: string | number
}

export const TextRegular = styled.p<RegularTextProps>`
  color: ${({ theme, color }) => theme.colors[`base-${color ?? 'title'}`]};
  font-size: ${({ theme, size }) =>
    theme.fontSizes[`text-regular-${size ?? 's'}`]};
  line-height: 130%;
  font-weight: ${({ weight }) => weight ?? 400};
`
export const TitleText = styled.h1<TitleTextProps>`
  color: ${({ theme, color }) => theme.colors[`base-${color ?? 'text'}`]};
  font-size: ${({ theme, size }) =>
    theme.fontSizes[`title-regular-${size ?? 's'}`]};
  line-height: 130%;
  font-weight: ${({ weight }) => weight ?? 400};
`
