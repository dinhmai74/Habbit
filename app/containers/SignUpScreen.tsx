import { en } from "app/localization/languages";
import { Colors, spacing } from "app/themes";
import { Formik, FormikActions, FormikProps } from "formik";
import {
  Body,
  Content as NContent,
  Form,
  Input,
  Item as NBItem,
  Label,
} from "native-base";
import { Divider } from "react-native-elements";
import { Sae } from "react-native-textinput-effects";
import MaterialsIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import React, { Component } from "react";

import * as Yup from "yup";
import {
  AppButton,
  AppText,
  AppInput,
  AppIcon,
  SizedBox,
  ToastService,
  withSpacing,
  Text,
} from "../components";
import AppI18n from "../localization";
import { AppBackground } from "../components/app-background";
import metrics from "../themes/Metrics";
import FirebaseWorker from "../api/firebase";
import NavigateService from "../tools/NavigateService";

const StyledAppText = withSpacing(Text);
const Content = withSpacing(NContent);

const Item = withSpacing(NBItem);

export interface ISignUpScreenProps {}

interface IState {}

type FormTypes = "email" | "password";

interface FormValues {
  email: string;
  password: string;
  userName: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalidEmailFormat")
    .required("emailRequired"),
  password: Yup.string()
    .min(5, "passwordMinLength")
    .required("passwordRequired"),
  userName: Yup.string().required("userNameRequired"),
  confirmPassword: Yup.string()
    .required("passwordRequired")
    .test("passwords-match", "passwordsNotMatch", function(value) {
      // @ts-ignore
      return this.parent.password === value;
    }),
});

export class SignUp extends Component<ISignUpScreenProps, IState> {
  refPassword: any;

  refConfirmPass: any;

  refUserName: any;

  constructor(props: ISignUpScreenProps) {
    super(props);
  }

  handleChangeInput = (stateName: FormTypes, text: string) => {
    this.setState({
      [stateName]: text,
    });
  };

  handleSubmit = async (
    values: FormValues,
    formikBag: FormikActions<FormValues>
  ) => {
    formikBag.setSubmitting(true);
    const result = await FirebaseWorker.createUser(
      values.email,
      values.password,
      values.userName
    );

    if (result && result.error) {
      ToastService.showToast(result.message, "danger");
    }

    formikBag.setSubmitting(false);
  };

  onSubmit = (values: FormValues, formikBag: FormikActions<FormValues>) => {
    this.handleSubmit(values, formikBag);
  };

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
    const showEmailError = !!(touched.email && errors.email);
    const showUserNameError = !!(touched.userName && errors.userName);
    const showPasswordError = !!(touched.password && errors.password);
    const showPasswordRequiredError = !!(
      touched.confirmPassword && errors.confirmPassword
    );

    const buttonSidePadding = spacing[2];

    return (
      <Form style={{ paddingHorizontal: spacing[4] }}>
        <AppInput
          label={"textEmail"}
          iconColor={errors.email && Colors.error}
          value={values.email}
          onChangeText={value => setFieldValue("email", value)}
          onFocus={() => setFieldTouched("email")}
          onBlur={() => setFieldTouched("email", false)}
        />
        {!touched.email&& !values.email && (
          <Divider style={{ marginTop: spacing[3] }} />
        )}
        {showEmailError && this.renderErrorText(errors.email || "")}

        <AppInput
          label={"textUsername"}
          iconColor={errors.userName && Colors.error}
          value={values.userName}
          onChangeText={value => setFieldValue("userName", value)}
          onFocus={() => setFieldTouched("userName")}
          onBlur={() => setFieldTouched("userName", false)}
        />
        {!touched.userName && !values.userName && (
          <Divider style={{ marginTop: spacing[3] }} />
        )}
        {showUserNameError && this.renderErrorText(errors.userName)}

        <AppInput
          label={"textPassword"}
          iconColor={errors.password && Colors.error}
          value={values.password}
          secureTextEntry
          onChangeText={value => setFieldValue("password", value)}
          onFocus={() => setFieldTouched("password")}
          onBlur={() => setFieldTouched("password", false)}
        />
        {!touched.password && !values.password && (
          <Divider style={{ marginTop: spacing[3] }} />
        )}
        {showPasswordError && this.renderErrorText(errors.password || "")}

        <AppInput
          label={"confirmPassword"}
          iconColor={errors.confirmPassword && Colors.error}
          value={values.confirmPassword}
          secureTextEntry
          onChangeText={value => setFieldValue("confirmPassword", value)}
          onFocus={() => setFieldTouched("confirmPassword")}
          onBlur={() => setFieldTouched("confirmPassword", false)}
        />
        {!touched.confirmPassword && !values.confirmPassword && (
          <Divider style={{ marginTop: spacing[3] }} />
        )}
        {showPasswordRequiredError &&
          this.renderErrorText(errors.confirmPassword)}

        <SizedBox height={8} />

        <AppButton
          tx="signUp"
          // @ts-ignore
          onPress={handleSubmit}
          preset="authTrans"
          disabled={isSubmitting}
          loading={isSubmitting}
          buttonStyle={{ marginHorizontal: buttonSidePadding }}
          style={{ marginHorizontal: buttonSidePadding }}
          loadingProps={{ size: "small", color: "white" }}
        />
        <SizedBox height={4} />

        <AppButton
          tx="login"
          // @ts-ignore
          onPress={() => NavigateService.navigate("login")}
          disabled={isSubmitting}
          loading={isSubmitting}
          linear
          buttonStyle={{ marginHorizontal: buttonSidePadding }}
          style={{ marginHorizontal: buttonSidePadding }}
        />
      </Form>
    );
  }

  render() {
    return (
      <AppBackground>
        <Content style={{ paddingHorizontal: spacing[5] }}>
          <Body>
            <SizedBox height={3} />
            <AppIcon icon="logo" size={metrics.logo.small} />
          </Body>
          <Formik
            initialValues={{
              confirmPassword: "",
              email: "",
              password: "",
              userName: "",
            }}
            validationSchema={validationSchema}
            onSubmit={this.onSubmit}
            render={(formikBag: FormikProps<FormValues>) =>
              this.renderForm(formikBag)
            }
          />
        </Content>
      </AppBackground>
    );
  }

  private renderErrorText(text?: string): React.ReactNode {
    return (
      <StyledAppText
        // @ts-ignore
        tx={text}
        preset="error"
        padding={3}
        paddingBottom={0}
        marginBottom={0}
      />
    );
  }
}

export default SignUp;
