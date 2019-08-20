import React from 'react';
import { Animated, Easing } from 'react-native';
import LottieView from 'lottie-react-native';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.animation.play()
  }

  render() {
    return (
      <LottieView  ref={animation => {
        this.animation = animation;
      }} source={require('./add.json')}  loop style={{flex: 1, backgroundColor: '#1BAF21'}}/>
    )
  }
}