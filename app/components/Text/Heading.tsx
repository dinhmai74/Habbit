import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { getStyleFromProps } from '../../tools'
import AppText from './AppText'
import { number } from 'prop-types';

interface Props {
  element: 'h1' | 'h2' | 'h3' | 'h4',
  color?: string,
  letterSpacing?: number,
  textAlign?: string,
  marginTop?: number,
  marginBottom?: number,
  margin?: number,
}

export default class Heading extends Component<Props> {
  static defaultProps: { element: string; letterSpacing: number; };

  render() {
    const style = {
      ...headingStyle[this.props.element],
      ...getStyleFromProps(
        [
          'color',
          'textAlign',
          'marginTop',
          'letterSpacing',
          'margin',
          'marginBottom',
        ],
        // @ts-ignore
        this.props,
      ),
    }
    return (
      <AppText {...this.props} style={style}>
        {this.props.children}
      </AppText>
    )
  }
}

Heading.defaultProps = {
  element: 'h1',
  letterSpacing: 2,
}

const headingStyle = {
  h1: {
    fontSize: 30,
  },
  h2: {
    fontSize: 25,
  },
  h3: {
    fontSize: 20,
  },
  h4: {
    fontSize: 18,
  },
}
