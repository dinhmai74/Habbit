import React, { Component } from "react";
import {
  FlatList,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  InlineDecorationText,
  AppBackground,
  AppHeader,
  AppIcon as AppIcon,
} from "../../components";
import TextWithIcon from "../../components/TextWithIcon";
import I18n from "../../localization";
import { Colors, Images, strings } from "../../themes";
import styles from "./styles";
import { Content } from "native-base";
import NavigateService from "../../tools/NavigateService";

const starIcon = <FontAwesome name="star" size={30} color={Colors.yellow} />;
const rightArrowIcon = (
  <FontAwesome name="chevron-right" size={30} color={Colors.ember} />
);

const SWIPE_THRESHOLD = 100;

interface IProps {
  goBack?: () => void;
  goToAddDetailScreen?: () => void;
  goToHobbiesScreen?: () => void;
}

const data = [
  {
    name: "Heath",
    icon: "queue",
    color: "red",
  },
  {
    name: "Fitness",
    icon: "fitness-center",
    color: "#9A58C4",
  },
  {
    name: "Home",
    icon: "home",
    color: "#4A73DD",
  },
  {
    name: "Hobbies",
    icon: "star",
    color: "#f1c40f",
  },
  {
    name: "Social",
    icon: "comment",
    color: "orange",
  },
  {
    name: "Efficiency",
    icon: "alarm",
    color: "green",
  },
];

export default class RenderHabitScreen extends Component<IProps> {
  static defaultProps: any;
  panResponder: any;

  constructor(props: IProps) {
    super(props);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderRelease: (event, gesture) => {
        if (gesture.vy < 0 && gesture.dy < -SWIPE_THRESHOLD) {
          if (this.props.goBack) {
            this.props.goBack();
          }
        }
      },
    });
  }

  onWriteYourOwnPress = () => {
    if (this.props.goToAddDetailScreen) {
      this.props.goToAddDetailScreen();
    }
  };

  renderFlatListTopicItem = () => {
    return <View />;
  };

  renderListIcon = ({
    item,
  }: {
    item: { icon: string; color: string; name: string };
  }) => {
    return (
      <TouchableOpacity onPress={this.props.goToHobbiesScreen}>
        <View style={{ paddingLeft: 40, paddingRight: 40 }}>
          <View style={{ width: 70 }}>
            <Icon
              containerStyle={{
                paddingBottom: 10,
                paddingTop: 10,
              }}
              type="MaterialCommunityIcons"
              name={item.icon}
              color={item.color}
              size={50}
            />
            <Text style={{ textAlign: "center" }}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderLeftIcon = () => (
    <TouchableOpacity onPress={this.props.goBack}>
      <AppIcon icon={"close"} color={Colors.white} />
    </TouchableOpacity>
  );

  render() {
    const leftIcon = this.renderLeftIcon();
    return (
      <AppBackground {...this.panResponder.panHandlers} isLinear>
        <AppHeader
          style={styles.appHeader}
          leftIcon={leftIcon}
          type={"transparent"}
        />
        <Content scrollEnabled={false}>
          <View style={styles.contentContainer}>
            <TextWithIcon
              leftIcon={Images.iconEdit}
              text={I18n.t(strings.textWriteYourOwn)}
              onPress={this.onWriteYourOwnPress}
            />
            <InlineDecorationText
              text={I18n.t(strings.textOrChooseFromTheseTopic)}
            />
            <FlatList
              style={{ alignSelf: "center", paddingBottom: 50, marginTop: 10 }}
              data={data}
              renderItem={this.renderListIcon}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            />
          </View>
        </Content>
      </AppBackground>
    );
  }
}

RenderHabitScreen.defaultProps = {
  goBack: () => {},
  goToAddDetailScreen: () => {},
  goToHobbiesScreen: () => {},
};
