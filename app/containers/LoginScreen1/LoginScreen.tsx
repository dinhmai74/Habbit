import { Formik, FormikActions, FormikProps } from 'formik'
import {
  Body,
  Content as NContent,
  Form,
  Input,
  Item,
  Label,
} from 'native-base'
import React, { Component } from 'react'
import * as Yup from 'yup'
import {
  AppButton,
  AppText,
  SizedBox,
  ToastService,
  Icon,
  withSpacing,
  Text,
} from '../../components'
import I18n from '../../localization'
import { AppBackground } from '../../components/app-background'
import metrics from '../../themes/Metrics'
import FirebaseWorker from '../../api/firebase';

const StyledAppText = withSpacing(Text)
const Content = withSpacing(NContent)

export interface ILoginScreenProps {}
interface IState {
  value: string
  email: string
  password: string
  [rest: string]: any
}

type FormTypes = 'email' | 'password'

interface FormValues {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('errors.invalidEmailFormat')
    .required('errors.emailRequired'),
  password: Yup.string()
    .min(5, 'errors.passwordMinLength')
    .required('errors.passwordRequired'),
})

export class LoginScreen extends Component<ILoginScreenProps, IState> {
  refPassword: any

  constructor(props: ILoginScreenProps) {
    super(props)
    this.state = {
      value: '',
      email: '',
      password: '',
    }
  }

  handleChangeInput = (stateName: FormTypes, text: string) => {
    this.setState({
      [stateName]: text,
    })
  }

  handleSubmit = async (
    values: FormValues,
    formikBag: FormikActions<FormValues>
  ) => {
    formikBag.setSubmitting(true)
    const result = await FirebaseWorker.signIn(values.email, values.password)

    if (result && result.error) {
      ToastService.showToast(result.message, 'danger')
    }

    formikBag.setSubmitting(false)
  }

  onSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) => {
    this.handleSubmit(values, formikBag)
  }

  /**
   * render part
   */

  renderForm({
    values,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
    setFieldTouched,
    isSubmitting,
  }: FormikProps<FormValues>) {
    let errorEmail = false
    if (errors.email) {
      errorEmail = true
    }

    const buttonSidePadding = 2

    return (
      <Form>
        <Item floatingLabel error={errorEmail}>
          <Label>{I18n.t('auth.email')}</Label>
          <Input
            autoCapitalize='none'
            value={values.email}
            onChangeText={(value) => setFieldValue('email', value)}
            onBlur={() => setFieldTouched('email')}
            editable={!isSubmitting}
            onSubmitEditing={() => this.refPassword.focus()}
          />
        </Item>
        {touched.email && errors.email && (
          <StyledAppText
            tx={errors.email}
            preset='error'
            padding={3}
            paddingBottom={0}
            marginBottom={0}
          />
        )}

        <Item floatingLabel last>
          <Label>{I18n.t('auth.password')}</Label>
          <Input
            autoCapitalize='none'
            secureTextEntry
            value={values.password}
            onChangeText={(value) => setFieldValue('password', value)}
            onBlur={() => setFieldTouched('password')}
            editable={!isSubmitting}
            getRef={(ref) => {
              // @ts-ignore
              this.refPassword = ref.wrappedInstance // <-- notice
            }}
          />
        </Item>
        {touched.password && errors.password && (
          <StyledAppText
            tx={errors.password}
            preset='error'
            padding={3}
            paddingBottom={0}
            marginBottom={0}
          />
        )}
        <SizedBox height={6} />
        <AppButton
          tx='title.login'
          // @ts-ignore
          onPress={handleSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
          preset='authTrans'
          marginLeft={buttonSidePadding}
          marginRight={buttonSidePadding}
          loadingProps={{ size: 'small', color: 'white' }}
        />
        <SizedBox height={4} />

        <AppButton
          tx='title.signUp'
          // @ts-ignore
          onPress={() => NavigateService.navigate('signUp')}
          disabled={isSubmitting}
          linear
          marginLeft={buttonSidePadding}
          marginRight={buttonSidePadding}
        />
      </Form>
    )
  }

  render() {
    return (
      <AppBackground>
        <Content padding={5}>
          <Body>
            <SizedBox height={8} />
            <Icon icon='logoColored' size={metrics.logo.normal} />
          </Body>
          <Formik
            initialValues={{ email: 'dinhmai@gmail.com', password: 'password' }}
            validationSchema={validationSchema}
            onSubmit={this.onSubmit}
            render={(formikBag: FormikProps<FormValues>) =>
              this.renderForm(formikBag)
            }
          />
        </Content>
      </AppBackground>
    )
  }
}

export default LoginScreen
