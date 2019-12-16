import { Colors, spacing } from "app/themes";
import { Formik, FormikActions, FormikProps } from "formik";
import {
  Body,
  Content as NContent,
  Form,
  Input,
  Item,
  Label,
} from "native-base";
import React, { Component } from "react";
import { Divider } from "react-native-elements";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import * as Yup from "yup";
import {
  AppButton,
  AppText,
  SizedBox,
  ToastService,
  AppIcon,
  withSpacing,
  Text,
  AppHeader,
  AppInput,
} from "../../components";
import I18n from "../../localization";
import { AppBackground } from "../../components/app-background";
import metrics from "../../themes/Metrics";
import FirebaseWorker from "../../api/firebase";
import colors from "../../themes/Colors";
import NavigateService from "../../tools/NavigateService";

const StyledAppText = withSpacing(Text);
const Content = withSpacing(NContent);

export interface ILoginScreenProps {}

interface IState {
  value: string;
  email: string;
  password: string;

  [rest: string]: any;
}

type FormTypes = "email" | "password";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalidEmailFormat")
    .required("emailRequired"),
  password: Yup.string()
    .min(5, "passwordMinLength")
    .required("passwordRequired"),
});

export class LoginScreen extends Component<ILoginScreenProps, IState> {
  refPassword: any;

  constructor(props: ILoginScreenProps) {
    super(props);
    this.state = {
      value: "",
      email: "",
      password: "",
    };
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
    const result = await FirebaseWorker.signIn(values.email, values.password);

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
    let errorEmail = false;
    if (errors.email) {
      errorEmail = true;
    }

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
          // active border height
        />
        {!touched.email && !values.email && (
          <Divider
            style={{ marginTop: spacing[3], backgroundColor: Colors.dim }}
          />
        )}
        {touched.email && errors.email && (
          <StyledAppText
            // @ts-ignore
            tx={errors.email}
            preset="error"
            padding={3}
            paddingBottom={0}
            marginBottom={0}
          />
        )}

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
        {touched.password && errors.password && (
          <StyledAppText
            // @ts-ignore
            tx={errors.password}
            preset="error"
            padding={3}
            paddingBottom={0}
            marginBottom={0}
          />
        )}
        <SizedBox height={8} />
        <AppButton
          // @ts-ignore
          tx="signIn"
          onPress={handleSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
          disabledStyle={{ backgroundColor: colors.white }}
          preset="authTrans"
          buttonStyle={{ marginHorizontal: buttonSidePadding }}
          style={{ marginHorizontal: buttonSidePadding }}
          loadingProps={{ size: "small", color: colors.primary }}
        />
        <SizedBox height={4} />

        <AppButton
          tx="signUp"
          // @ts-ignore
          onPress={() => NavigateService.navigate("signUp")}
          disabled={isSubmitting}
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
            <SizedBox height={8} />
            <AppIcon icon="logoColored" size={metrics.logo.small2} />
          </Body>
          <Formik
            initialValues={{ email: "dinhmai@gmail.com", password: "password" }}
            //initialValues={{ email: "", password: "" }}
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
}

export default LoginScreen;
