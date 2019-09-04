import { Formik, FormikActions, FormikProps } from "formik";
import {
  Body,
  Content as NContent,
  Form,
  Input,
  Item as NBItem,
  Label,
} from "native-base";
import React, { Component } from "react";
import * as Yup from "yup";
import {
  AppButton,
  AppText,
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
    .email("errors.invalidEmailFormat")
    .required("errors.emailRequired"),
  password: Yup.string()
    .min(5, "errors.passwordMinLength")
    .required("errors.passwordRequired"),
  userName: Yup.string().required("errors.userNameRequired"),
  confirmPassword: Yup.string()
    .required("errors.passwordRequired")
    .test("passwords-match", "errors.passwordsNotMatch", function(value) {
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
    const showEmailError = !!(touched.userName && errors.email);
    const showUserNameError = !!(touched.userName && errors.userName);
    const showPasswordError = !!(touched.password && errors.password);
    const showPasswordRequiredError = !!(
      touched.confirmPassword && errors.confirmPassword
    );

    return (
      <Form style={{ margin: 0 }}>
        <Item margin={0} floatingLabel error={!!errors.email}>
          <Label>{AppI18n.t("auth.email")}</Label>
          <Input
            autoCapitalize="none"
            value={values.email}
            onChangeText={value => setFieldValue("email", value)}
            onBlur={() => setFieldTouched("email")}
            editable={!isSubmitting}
            onSubmitEditing={() => this.refUserName.focus()}
          />
        </Item>
        {showEmailError && this.renderErrorText(errors.email || "")}

        <Item margin={0} floatingLabel error={!!errors.userName}>
          <Label>{AppI18n.t("auth.userName")}</Label>
          <Input
            autoCapitalize="none"
            getRef={ref => {
              // @ts-ignore
              this.refUserName = ref.wrappedInstance; // <-- notice
            }}
            value={values.userName}
            onChangeText={value => setFieldValue("userName", value)}
            onBlur={() => setFieldTouched("userName")}
            editable={!isSubmitting}
            onSubmitEditing={() => this.refPassword.focus()}
          />
        </Item>
        {showUserNameError && this.renderErrorText(errors.userName)}

        <Item margin={0} floatingLabel error={!!errors.password}>
          <Label>{AppI18n.t("auth.password")}</Label>
          <Input
            autoCapitalize="none"
            secureTextEntry
            value={values.password}
            onChangeText={value => setFieldValue("password", value)}
            onBlur={() => setFieldTouched("password")}
            editable={!isSubmitting}
            getRef={ref => {
              // @ts-ignore
              this.refPassword = ref.wrappedInstance; // <-- notice
            }}
            onSubmitEditing={() => this.refConfirmPass.focus()}
          />
        </Item>
        {showPasswordError && this.renderErrorText(errors.password || "")}

        <Item margin={0} floatingLabel error={!!errors.confirmPassword}>
          <Label>{AppI18n.t("auth.confirmPassword")}</Label>
          <Input
            autoCapitalize="none"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={value => setFieldValue("confirmPassword", value)}
            onBlur={() => setFieldTouched("confirmPassword")}
            editable={!isSubmitting}
            getRef={ref => {
              // @ts-ignore
              this.refConfirmPass = ref.wrappedInstance; // <-- notice
            }}
          />
        </Item>
        {showPasswordRequiredError &&
          this.renderErrorText(errors.confirmPassword)}

        <SizedBox height={6} />

        <AppButton
          tx="title.signUp"
          // @ts-ignore
          onPress={handleSubmit}
          preset="authTrans"
          disabled={isSubmitting}
          loading={isSubmitting}
          marginLeft={5}
          marginRight={5}
          loadingProps={{ size: "small", color: "white" }}
        />
        <SizedBox height={4} />

        <AppButton
          tx="title.login"
          // @ts-ignore
          onPress={() => NavigateService.navigate("login")}
          disabled={isSubmitting}
          loading={isSubmitting}
          linear
          marginLeft={5}
          marginRight={5}
        />
      </Form>
    );
  }

  render() {
    return (
      <AppBackground>
        <Content padding={5}>
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
