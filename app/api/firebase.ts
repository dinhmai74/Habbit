import apisauce, { ApisauceInstance } from "apisauce";
import _ from "lodash";
import { AsyncStorage } from "react-native";
import firebase from "react-native-firebase";
import { IIconHabit, ISchedule, ITask } from "../model";
import { strings } from "../themes";
import { fillTask, formatDate, logReactotron, today } from "../tools";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import I18n from "../localization";
import moment from "moment";

export const BASE_URL = "https://us-central1-habit-74198.cloudfunctions.net";
// export const BASE_URL = 'http://localhost:5000/habit-74198/us-central1'

export const getTokenString = (token: string): string => `Bearer ${token}`;

export let ApiFactory = (() => {
  let instance;

  function createInstance() {
    return apisauce.create({
      baseURL: BASE_URL,
      headers: {
        "Cache-Control": "no-cache",
      },
      timeout: 5000,
    });
  }

  return {
    getInstance(): ApisauceInstance {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const api = apisauce.create({
  baseURL: BASE_URL,
  headers: {
    "Cache-Control": "no-cache",
  },
  timeout: 5000,
});

// let's return back our create method as the default.

export const FirebaseWorker = {
  updateProfile: async (
    userName: string,
    oldPassword: string,
    password: string,
    email: string
  ) => {
    try {
      const signInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(email, oldPassword);
      const user = await firebase.auth().currentUser;

      if (userName) {
        // @ts-ignore
        await user.updateProfile({
          displayName: userName,
        });
      }

      if (password) {
        // @ts-ignore
        await user.updatePassword(password);
      }

      return {
        error: false,
        message: "Update success!",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
  updateIconAndQuest: async (
    taskId: string,
    icon: IIconHabit,
    name: string
  ) => {
    try {
      if (!taskId) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: "Unexpected error!",
        };
      }
      const uid = await AsyncStorage.getItem(strings.uid);

      const updates = {};
      updates[`/tasks/uid=${uid}/${taskId}/icon`] = icon;
      const result = await firebase
        .database()
        .ref()
        .update(updates);

      const updateName = {};
      updateName[`/tasks/uid=${uid}/${taskId}/quest`] = name;
      await firebase
        .database()
        .ref()
        .update(updateName);

      return {
        error: false,
        message: "Update successful!",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },

  updateSchedule: async (taskId: string, schedule: ISchedule) => {
    try {
      if (!taskId) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: "Unexpected error!",
        };
      }
      const uid = await AsyncStorage.getItem(strings.uid);

      const updates = {};
      updates[`/tasks/uid=${uid}/${taskId}/schedule`] = schedule;
      const result = await firebase
        .database()
        .ref()
        .update(updates);

      return {
        error: false,
        message: "Update successful!",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
  updateArchived: async (
    taskId: string,
    status: string = "spending",
    date: string = new Date().toString()
  ) => {
    try {
      if (!taskId) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: "Unexpected error!",
        };
      }
      const uid = await AsyncStorage.getItem(strings.uid);
      // @ts-ignore
      date = formatDate(date);
      console.log("uid", uid);

      const updates = {};
      updates[`/tasks/uid=${uid}/${taskId}/archived/${date}`] = {
        date,
        status,
      };
      const result = await firebase
        .database()
        .ref()
        .update(updates);

      return {
        error: false,
        message: "Update successful!",
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
  createUser: async (email: string, password: string, userName: string) => {
    try {
      if (!email || !password) {
        return { error: true, message: "Bad input!" };
      }

      const createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = firebase.auth().currentUser;
      // @ts-ignore
      user.updateProfile({
        displayName: userName,
      });
      // @ts-ignore
      const token = await user.getIdToken();
      await AsyncStorage.setItem(strings.uid, createUser.user.uid);
      await AsyncStorage.setItem(strings.userToken, JSON.stringify(token));
      // @ts-ignore
      await AsyncStorage.setItem(strings.email, createUser.user.email);
      // @ts-ignore
      await AsyncStorage.setItem(strings.userName, createUser.user.displayName);

      return {
        error: false,
        message: "Create user successful",
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
      };
    }
  },
  signIn: async (email: string, password: string) => {
    try {
      const accountSignIn = await firebase
        .auth()
        .signInWithEmailAndPassword(
          _.trimStart(_.trimEnd(email)),
          _.trimStart(_.trimEnd(password))
        );
      const user = await firebase.auth().currentUser;
      // @ts-ignore
      const token = await user.getIdToken();

      await AsyncStorage.setItem(strings.uid, accountSignIn.user.uid);
      await AsyncStorage.setItem(strings.userToken, JSON.stringify(token));
      await AsyncStorage.setItem(strings.email, accountSignIn.user.email || "");
      await AsyncStorage.setItem(
        strings.userName,
        accountSignIn.user.displayName || ""
      );

      return {
        error: false,
        message: "Login successful",
      };
    } catch (err) {
      return {
        error: true,
        message: err.message,
      };
    }
  },
  getTasks: async () => {
    try {
      const result: any = await ApiFactory.getInstance().get("/getTasks");
      // const result = await firebase.database().ref(`/tasks/uid=${uid}`)
      if (result.data && result.data.data) {
        // @ts-ignore
        const { data } = result.data;
        data.forEach(e => {
          const { archived, createdDate, id, schedule } = e;
          if (schedule) {
            const { type } = schedule;
            e.archived = fillTask(
              type,
              archived,
              schedule.times,
              createdDate,
              id
            );
          }
        });
        return result.data;
      }
    } catch (err) {
      return err;
    }
  },
  createTask: async (task: ITask) => {
    try {
      const result = await ApiFactory.getInstance().post(`/createTask`, {
        task,
      });
      return result.data;
    } catch (err) {
      return err;
    }
  },
  getTask: async (taskId: string) => {
    try {
      const uid = await AsyncStorage.getItem(strings.uid);
      let data = null;
      await firebase
        .database()
        .ref(`/tasks/uid=${uid}/${taskId}`)
        .once("value")
        .then(snapshot => {
          data = snapshot.val();
        });

      return data;
    } catch (err) {
      return err;
    }
  },
  deleteTask: async (taskId: string) => {
    try {
      const uid = await AsyncStorage.getItem(strings.uid);
      const result = await ApiFactory.getInstance().post(
        `/deleteTask?uid=${uid}`,
        { id: taskId }
      );

      return result.data;
    } catch (err) {
      return err;
    }
  },
  updateLifelog: async (month: string = today) => {
    try {
      const formatedMonth = moment(month).format(strings.format.month);
      console.log(`%c month`, `color: blue; font-weight: 600`, formatedMonth);
      const postResult = await ApiFactory.getInstance().post(`/updateLifeLog`, {
        month: formatedMonth,
      });
      console.log(
        `%c update life log result`,
        `color: blue; font-weight: 600`,
        postResult
      );
      return postResult;
    } catch (error) {
      console.warn("error update lifelog", error);
      return error;
    }
  },

  getLifeLogStat: async (month: string = today) => {
    try {
      await FirebaseWorker.updateLifelog(month);
      const result = await ApiFactory.getInstance().post(`/getLifeLogStat`, {
        month: moment(month).format("YYYY-MM"),
      });

      console.log("result", result);

      return result;
    } catch (error) {
      console.warn("error get life log stat", error);
      return error;
    }
  },

  googleLogin: async () => {
    try {
      await GoogleSignin.configure({
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      });

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        // @ts-ignore
        data.accessToken
      );
      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);
      const user = await firebaseUserCredential.user;
      // @ts-ignore
      const token = await user.getIdToken();
      await AsyncStorage.setItem(strings.typeSignIn, strings.googleSignIn);
      await AsyncStorage.setItem(strings.uid, user.uid);
      await AsyncStorage.setItem(strings.userToken, JSON.stringify(token));
      console.log("token: ", token);
      await AsyncStorage.setItem(strings.email, user.email || "");
      await AsyncStorage.setItem(strings.userName, user.displayName || "");
      console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
      return {
        error: false,
        message: "Login successful by google account",
      };
    } catch (err) {
      console.log("googleLogin - error: ", err.message);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        return {
          error: true,
          message: "", // we needn't notify anything
        };
      }
      if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        return {
          error: true,
          message: I18n.t(strings.errGoogleLoginByPlayService),
        };
      }
      return {
        error: true,
        message: I18n.t(strings.errGoogleLogin),
      };
    }
  },

  loginByFacebook: async () => {
    const CANCELED = "canceled";
    const ACCESS_TOKEN_ERROR = "access_token_error";
    logReactotron("loginByFacebook worker: start");
    try {
      const result = await LoginManager.logInWithReadPermissions([
        "public_profile",
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw { code: CANCELED, message: "User cancelled request" };
      }

      console.log(
        `Login success with permissions: ${result.grantedPermissions.toString()}`
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        // handle this however suites the flow of your app
        throw {
          code: ACCESS_TOKEN_ERROR,
          message: "Something went wrong obtaining the users access token",
        };
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credential);

      const user = await firebaseUserCredential.user;
      // @ts-ignore
      const token = await user.getIdToken();
      await AsyncStorage.setItem(strings.typeSignIn, strings.facebookSignIn);
      await AsyncStorage.setItem(strings.uid, user.uid);
      await AsyncStorage.setItem(strings.userToken, JSON.stringify(token));
      console.log("token: ", token);
      await AsyncStorage.setItem(strings.email, user.email || "");
      await AsyncStorage.setItem(strings.userName, user.displayName || "");

      logReactotron("facebook - firebaseUserCredential:", JSON.stringify(user));

      return {
        error: false,
        message: "Login successful by facebook account",
      };
    } catch (e) {
      logReactotron("loginByFacebook - error: ", e.message);
      if (e.code === CANCELED) {
        return {
          error: true,
          message: "",
        };
      }
      return {
        error: true,
        message: I18n.t(strings.errGoogleLogin),
      };
    }
  },
};

export default FirebaseWorker;
