import { spacing, strings } from "app/themes";
import colors from "app/themes/Colors";
import React, { Component } from "react";
import { SizedBox, Text } from "components";
import { Row } from "react-native-easy-grid";
import styled from "styled-components/native";
import { Moment } from "moment";

const ShowStreakRow = styled(Row)`
  background: ${colors.primary};
  justify-content: center;
  flex: 1;
`;

const StyledRow = styled(Row)`
  padding: ${spacing[4]}px ${spacing[5]}px;
  align-items: center;
`;

interface Props {
  startDate: Moment;
  endDate: Moment;
  streak: number;
}

export class StreakRow extends React.PureComponent<Props> {
  render() {
    const { streak, startDate, endDate } = this.props;
    return (
      <StyledRow>
        <Text
          p3
          text={startDate.format(strings.format.dayAndMonth)}
          color={colors.text.third}
        />
        <SizedBox width={4} />
        <ShowStreakRow>
          <Text text={streak} color={colors.white} />
        </ShowStreakRow>
        <SizedBox width={4} />
        <Text
          p3
          text={endDate.format(strings.format.dayAndMonth)}
          color={colors.text.third}
        />
      </StyledRow>
    );
  }
}

export default StreakRow;
