import flatten from 'ramda/es/flatten'
import mergeAll from 'ramda/es/mergeAll'
import React from 'React'
import styled from 'styled-components'
import { spacing, Spacing } from '../themes/spacing'

export const wrapComponentWithPadding = (
  component,
  padding = { top: 2, right: 2, bottom: 2, left: 2 },
) => {
  const { top, right, bottom, left } = padding
  return styled(component)`
    padding: ${spacing[top]}px ${spacing[right]}px ${spacing[bottom]}px
      ${spacing[left]}px;
  `
}

export const wrapComponentWithMargin = (
  component,
  margin = { top: 2, right: 2, bottom: 2, left: 2 },
) => {
  const { top, right, bottom, left } = margin
  return styled(component)`
    margin: ${spacing[top]}px ${spacing[right]}px ${spacing[bottom]}px
      ${spacing[left]}px;
  `
}

export interface IMargin {
  margin?: Spacing
  marginLeft?: Spacing
  marginRight?: Spacing
  marginBottom?: Spacing
  marginTop?: Spacing
}

export interface IPadding {
  padding?: Spacing
  paddingRight?: Spacing
  paddingLeft?: Spacing
  paddingTop?: Spacing
  paddingBottom?: Spacing
}

interface IWithSpacing extends IMargin, IPadding {}

export const withSpacing = <P extends object>(
  Component: React.ComponentType<P>,
) =>
  class WithLoading extends React.Component<P & IWithSpacing> {
    render() {
      // tslint:disable-next-line: one-variable-per-declaration
      let paddingAll,
        paddingRight,
        paddingTop,
        paddingBottom,
        paddingLeft,
        marginAll,
        marginLeft,
        marginRight,
        marginBottom,
        marginTop

      const {
        margin: m,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
      } = this.props
      // @ts-ignore
      marginAll = spacing[m]
      // @ts-ignore
      marginLeft = spacing[ml]
      // @ts-ignore
      marginTop = spacing[mt]
      // @ts-ignore
      marginRight = spacing[mr]
      // @ts-ignore
      marginBottom = spacing[mb]

      const {
        padding: p,
        paddingBottom: pb,
        paddingLeft: pl,
        paddingRight: pr,
        paddingTop: pt,
      } = this.props

      // @ts-ignore
      paddingAll = spacing[p]
      // @ts-ignore
      paddingLeft = spacing[pl]
      // @ts-ignore
      paddingTop = spacing[pt]
      // @ts-ignore
      paddingRight = spacing[pr]
      // @ts-ignore
      paddingBottom = spacing[pb]
      // @ts-ignore
      const { children, style: styleOverride, ...rest } = this.props
      const style = mergeAll(
        flatten([
          {
            padding: paddingAll,
            paddingRight,
            paddingTop,
            paddingBottom,
            paddingLeft,
            margin: marginAll,
            marginLeft,
            marginRight,
            marginBottom,
            marginTop,
          },
          styleOverride,
        ]),
      )
      return (
        <Component style={style} {...rest as P}>
          {children}
        </Component>
      )
    }
  }
