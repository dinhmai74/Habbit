import { string } from "prop-types";
import { Platform } from "react-native";

export * from "./stringHelper";
export * from "./DateHelper";
export * from "./getPlatFormElevation";
export * from "./taskHelper";
export * from "./Logger";
export * from "./SagaHelper";

export function getStyleFromProps(
  // @ts-ignore
  propStyleKeys: string[],
  props: { style?: object } = {}
) {
  let style = {};
  propStyleKeys.map((propStyleKey: string | number) => {
    // @ts-ignore
    const propStyleValue = props[propStyleKey];

    if (propStyleKeys) {
      style = {
        ...style,
        [propStyleKey]: propStyleValue,
      };
    }
    return propStyleKey;
  });
  if (props.style) {
    style = {
      ...style,
      ...props.style,
    };
  }

  return style;
}

export function getPlatformValue(os: string, value: any, valueDefault: any) {
  if (Platform.OS === os) {
    return value;
  }
  return valueDefault;
}
