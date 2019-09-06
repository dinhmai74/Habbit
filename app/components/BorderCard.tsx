import React, { Component } from "react";
import { NativeBase, View } from "native-base";
import styled from "styled-components";
import { Colors } from "../themes";
import { spacing } from "app/themes";
import { flatten, mergeAll } from "ramda";

export interface IBorderCardProps extends NativeBase.View {}

interface IState {}

const StyledCard = styled(View)`
  border: 1px ${Colors.border};
  padding: ${spacing[3]}px ${spacing[1]}px;
  background: ${Colors.white};
`;

class BorderCard extends Component<IBorderCardProps, IState> {
  static defaultProps = {
    style: null,
  };

  render() {
    const { style: styleOverride, ...rest } = this.props;
    const style = mergeAll(flatten([styleOverride]));
    return (
      <StyledCard {...rest} style={style}>
        {this.props.children}
      </StyledCard>
    );
  }
}

export default BorderCard;
