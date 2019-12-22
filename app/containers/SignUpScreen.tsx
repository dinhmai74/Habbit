import { Colors, spacing } from "app/themes";
import { Formik, FormikActions, FormikProps } from "formik";
import { Body, Content as NContent, Form } from "native-base";
import React, { Component } from "react";
import {
  createAnimatableComponent,
  View as AnimationView,
} from "react-native-animatable";
import { Divider } from "react-native-elements";
import { NavigationInjectedProps } from "react-navigation";
import * as Yup from "yup";
import FirebaseWorker from "../api/firebase";
import {
  AppButton,
  AppIcon,
  AppInput as Input,
  SizedBox,
  Text,
  ToastService,
  withSpacing,
} from "../components";
import { AppBackground } from "../components/app-background";
import metrics from "../themes/Metrics";
import NavigateService from "../tools/NavigateService";
const StyledAppText = withSpacing(Text);
const Content = withSpacing(NContent);
// @ts-ignore
const AppInput = createAnimatableComponent(Input);

export interface ISignUpScreenProps extends NavigationInjectedProps {}

interface IState {
  [rest: string]: any;
}

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

const DEFAULT_DURATION = 500;
const DELAY_TIME = 150;
export class SignUp extends Component<ISignUpScreenProps, IState> {
  refPassword: any;

  refConfirmPass: any;

  refUserName: any;

  willFocusListener: any;

  refAnims: any = {};

  constructor(props: ISignUpScreenProps) {
    super(props);

    this.state = {
      animDuration: {
        emailDelay: 0,
        usernameDelay: DELAY_TIME,
        passwordDelay: DELAY_TIME * 1.5,
        confirmPasswordDelay: DELAY_TIME * 2,
        btnSignInDelay: DELAY_TIME * 3,
        btnSignUpDelay: DELAY_TIME * 2.5,
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.willFocusListener = navigation.addListener("willFocus", () => {
      this.refresh();
    });
  }

  componentWillUnmount() {
    this.willFocusListener.remove();
  }

  refresh = () => {
    this.doAnimate();
  };

  doAnimate = () => {
    const {
      emailDelay,
      usernameDelay,
      passwordDelay,
      confirmPasswordDelay,
      btnSignUpDelay,
      btnSignInDelay,
    } = this.state.animDuration;
    const {
      btnSignUp,
      btnSignIn,
      password,
      email,
      userName,
      confirmPassword,
    } = this.refAnims;
    email && email.animate("fadeInLeft", DEFAULT_DURATION, emailDelay);
    userName && userName.animate("fadeInLeft", DEFAULT_DURATION, usernameDelay);
    confirmPassword &&
      confirmPassword.animate(
        "fadeInLeft",
        DEFAULT_DURATION,
        confirmPasswordDelay
      );
    password && password.animate("fadeInLeft", DEFAULT_DURATION, passwordDelay);
    btnSignUp && btnSignUp.animate("zoomIn", DEFAULT_DURATION, btnSignUpDelay);
    btnSignIn && btnSignIn.animate("zoomIn", DEFAULT_DURATION, btnSignInDelay);
  };

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
          ref={c => (this.refAnims.email = c)}
          iconColor={errors.email && Colors.error}
          value={values.email}
          onChangeText={value => setFieldValue("email", value)}
          onFocus={() => setFieldTouched("email")}
          onBlur={() => setFieldTouched("email", false)}
        />
        {!touched.email && !values.email && (
          <Divider style={{ marginTop: spacing[3] }} />
        )}
        {showEmailError && this.renderErrorText(errors.email || "")}

        <AppInput
          label={"textUsername"}
          ref={c => (this.refAnims.userName = c)}
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
          ref={c => (this.refAnims.password = c)}
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
          ref={c => (this.refAnims.confirmPassword = c)}
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

        <AnimationView ref={c => (this.refAnims.btnSignUp = c)}>
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
        </AnimationView>
        <SizedBox height={4} />
        <AnimationView ref={c => (this.refAnims.btnSignIn = c)}>
          <AppButton
            tx="login"
            // @ts-ignore
            onPress={() => NavigateService.navigate("login")}
            disabled={isSubmitting}
            linear
            buttonStyle={{ marginHorizontal: buttonSidePadding }}
            style={{ marginHorizontal: buttonSidePadding }}
          />
        </AnimationView>
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
