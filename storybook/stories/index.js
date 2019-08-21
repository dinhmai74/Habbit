import React from 'react'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import Button from './Button'
import CenterView from './CenterView'
import Welcome from './Welcome'
import AnimationExample from './AnimationExample'
import { BorderCard, Text, SizedBox } from '../../app/components'

// storiesOf('pullTR', module)
//   .add('default', () => <PullRN/>);

storiesOf('card', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('border card', () =>
    <BorderCard style={{ alignItems: 'center' }}>
      <Text tx={'lifeLog.currentStreaks'} preset={'cardTitle'}/>
      <SizedBox height={2}/>
      <Text text={'3'} preset={'bigContent'}/>
    </BorderCard>,
  )
storiesOf('Animation example', module).add('layout anim', () => <AnimationExample/>)
storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>)

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
