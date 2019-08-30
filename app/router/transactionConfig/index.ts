import { Animated, Easing } from "react-native";
import { strings } from "../../themes";

export const slideInFromBottom = (scene, layout, position) => {
  const thisSceneIndex = scene.index;
  const height = layout.initHeight;

  const translateY = position.interpolate({
    inputRange: [thisSceneIndex, thisSceneIndex + 1],
    outputRange: [0, height],
  });
  return { transform: [{ translateY }] };
};

export const slideInFromTop = (scene, layout, position) => {
  const thisSceneIndex = scene.index;
  const height = layout.initHeight;
  const translateY = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex],
    outputRange: [-height, 0],
  });
  return { transform: [{ translateY }] };
};

export const slideInFromRight = (scene, layout, position) => {
  const { index } = scene;
  const width = layout.initWidth;

  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0],
  });
  const slideFromRight = { transform: [{ translateX }] };
  return slideFromRight;
};

export const slideInFromLeft = (scene, layout, position) => {
  const { index } = scene;
  const width = layout.initWidth;

  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-width, 0, width],
  });
  const slideFromLeft = { transform: [{ translateX }] };
  return slideFromLeft;
};

export const fadeInFromTop = (scene, layout, position) => {
  const thisSceneIndex = scene.index;
  const height = layout.initHeight;
  const translateY = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex],
    outputRange: [-height, 0],
  });
  return { transform: [{ translateY }] };
};

export const scaleWithOpacity = (scene, layout, position) => {
  const thisSceneIndex = scene.index;
  const opacity = getOpacity(scene, layout, position);

  const scale = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    outputRange: [4, 1, 1],
  });

  return { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] };
};

export const getOpacity = (scene, layout, position) => {
  const thisSceneIndex = scene.index;
  const opacity = position.interpolate({
    inputRange: [thisSceneIndex - 1, thisSceneIndex],
    outputRange: [0, 1],
  });
  return opacity;
};

export const transitionSpec = {
  duration: 350,
  easing: Easing.linear,
  useNativeDriver: true,
};

export const getScreenInterpolator = sceneProps => {
  const { position, layout, scene, index, scenes } = sceneProps;
  const opacity = getOpacity(scene, layout, position);
  let transform = slideInFromRight(scene, layout, position);

  if (scene.route.params) {
    const { transition } = scene.route.params;
    if (transition === strings.transitionFromLeft) {
      transform = slideInFromLeft(scene, layout, position);
    } else if (transition === strings.transitionFromTop) {
      // @ts-ignore
      transform = slideInFromTop(scene, layout, position);
    } else if (transition === strings.transitionFromBottom) {
      // @ts-ignore
      transform = slideInFromBottom(scene, layout, position);
    }
  }

  return { ...transform, opacity };
};
