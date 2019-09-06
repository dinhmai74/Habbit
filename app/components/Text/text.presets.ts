import style from "app/components/PullToRefreshView/style";
import { TextStyle } from "react-native";
import { Colors, Fonts } from "../../themes";

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  color: Colors.text.text,
  ...Fonts.style.normal,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   * font size 15, primary text color
   */
  default: BASE,

  /**
   * A bold version of the default text.
   * font size 15,black bold text
   */
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,

  /**
   * Large headers.
   * font size 24, dim color
   */
  header: { ...BASE, fontSize: 24, fontWeight: "bold" } as TextStyle,

  title: {
    ...BASE,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  } as TextStyle,

  subtitle: { ...BASE, fontSize: 14, textAlign: "center" } as TextStyle,

  cardTitle: { ...BASE, fontSize: 18, color: Colors.dim } as TextStyle,

  bigContent: { ...BASE, fontSize: 40, color: Colors.primary } as TextStyle,

  /**
   * Field labels that appear on forms above the inputs.
   * font size 13, dim color
   */
  fieldLabel: {
    ...BASE,
    fontSize: 13,
    color: Colors.dim,
    fontWeight: "normal",
  } as TextStyle,

  error: { ...BASE, fontSize: 13, color: Colors.error } as TextStyle,

  /**
   * A smaller piece of secondard information.
   * font size 9 ,black bold text
   */
  secondary: { ...BASE, fontSize: 9, color: Colors.dim } as TextStyle,

  ...Fonts.style,
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
