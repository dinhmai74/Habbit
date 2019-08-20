import { View } from 'native-base'
import styled from 'styled-components'
import { Spacing, spacing } from '../themes/spacing'

export interface ISizeBoxProps {
  width?: Spacing
  height?: Spacing
  color?: string
}

// make a center space view from 2 elements
export const SizedBox = styled(View)`
  color: ${({ color }: ISizeBoxProps) => color || 'transparent'};

  padding: ${({ height }: ISizeBoxProps) => spacing[height || 0] / 2}px
    ${({ width }: ISizeBoxProps) => spacing[width || 0] / 2}px;
`
