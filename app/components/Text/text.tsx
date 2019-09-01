import { flatten, mergeAll } from "ramda";
import * as React from "react";
import { normalize, Text as ElementText } from "react-native-elements";
import { Text as NBText } from "native-base";
import I18n from "../../localization";
import { Fonts } from "themes";
import { presets } from "./text.presets";
import { TextProps } from "./text.props";

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    tx,
    txOptions,
    text,
    children,
    color,
    style: styleOverride,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    s1,
    s2,
    c1,
    c2,
    label,
    p1,
    p2,
    p3,
    p4,
    size,
    bold,
    fontType,
    ...rest
  } = props;

  // figure out which content to use
  const i18nText = tx && I18n.t(tx);
  const content = i18nText || text || children;

  const style = mergeAll(
    flatten([
      presets[preset] || presets.default,
      h1 && { fontSize: Fonts.size.h1 },
      h2 && { fontSize: Fonts.size.h2 },
      h3 && { fontSize: Fonts.size.h3 },
      h4 && { fontSize: Fonts.size.h4 },
      h5 && { fontSize: Fonts.size.h5 },
      h6 && { fontSize: Fonts.size.h6 },
      s1 && { fontSize: Fonts.size.s1 },
      s2 && { fontSize: Fonts.size.s2 },
      c1 && { fontSize: Fonts.size.c1 },
      c2 && { fontSize: Fonts.size.c2 },
      label && { fontSize: Fonts.size.label },
      p1 && { fontSize: Fonts.size.p1 },
      p2 && { fontSize: Fonts.size.p2 },
      p3 && { fontSize: Fonts.size.p3 },
      p4 && { fontSize: Fonts.size.p4 },
      bold && presets.bold,
      fontType && { fontFamily: Fonts.type[fontType] },
      size && { fontSize: size },
      color && { color },
      styleOverride,
    ])
  );

  return (
    // @ts-ignore
    <NBText {...rest} style={style}>
      {content}
    </NBText>
  );
}
