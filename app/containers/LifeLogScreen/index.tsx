import { RemainTasksActions } from "app/appRedux/reducers";
import _ from "lodash";
import { View } from "native-base";
import React, { Component } from "react";
import { NavigationInjectedProps } from "react-navigation";
import { connect } from "react-redux";

import moment from "moment";
import { fetchLifeLog } from "app/appRedux/actions";
import { AppLoading } from "../../components";
import { currentMonth, formatDate } from "../../tools";
import RenderLifeLogScreen from "./renderLifeLog";
import { Images } from "themes";
import colors from "app/themes/Colors";
import { bindActionCreators } from "redux";

interface IProps extends NavigationInjectedProps {
  fetchLifeLog: typeof fetchLifeLog;
  data: any;
  fetching: boolean;
  minDate: string;
  updateAllTasksRemain: typeof RemainTasksActions.updateAllTasksRemain;
}

class LifeLogScreen extends Component<IProps> {
  hadLoadingFirstTime: boolean = false;

  componentDidMount() {
    this.handleRefresh(currentMonth);
  }

  handleRefresh = month => {
    this.props.fetchLifeLog(month);
    this.props.updateAllTasksRemain();
  };

  render() {
    const { data, fetching, minDate } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <RenderLifeLogScreen
          lifeLog={data}
          handleRefresh={this.handleRefresh}
          fetching={fetching}
          minDate={minDate}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { lifeLog } = state;
  const createdDates = _.map(state.tasks.data, e => {
    if (e) {
      return e.createdDate;
    }
  });

  const moments = createdDates.map(d => moment(d));
  // @ts-ignore
  const minDate = formatDate(moment.min(moments));

  return {
    data: lifeLog.data,
    error: lifeLog.error,
    fetching: lifeLog.fetching,
    minDate,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchLifeLog, ...RemainTasksActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LifeLogScreen);
