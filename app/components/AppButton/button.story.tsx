import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Alert, TextStyle, ViewStyle } from "react-native"
import { AppButton } from "."
import { Story, StoryScreen, UseCase } from "../../../storybook/views"

declare var module

const buttonStyleArray: ViewStyle[] = [{ paddingVertical: 100 }, { borderRadius: 0 }]

const buttonTextStyleArray: TextStyle[] = [{ fontSize: 20 }, { color: "#a511dc" }]

storiesOf("Button", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <AppButton text="Click It" preset="primary" onPress={() => Alert.alert("pressed")} />
      </UseCase>
      <UseCase text="Disabled" usage="The disabled behaviour of the primary button.">
        <AppButton
          text="Click It"
          preset="primary"
          onPress={() => Alert.alert("pressed")}
          disabled
        />
      </UseCase>
      <UseCase text="Array Style" usage="Button with array style">
        <AppButton
          text="Click It"
          preset="primary"
          onPress={() => Alert.alert("pressed")}
          style={buttonStyleArray}
          textStyle={buttonTextStyleArray}
        />
      </UseCase>
    </Story>
  ))
