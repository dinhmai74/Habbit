import { icons } from "app/components";

export const en = {
  ok: "OK!",
  cancel: "Cancel",
  back: "Back",
  /** title */
  //  Auth
  titleMainAuth: "Habit",
  titleSubMainAuth: "Make your life better!",
  login: "Login",
  hobbies: "Hobbies",
  // Main
  titleHomeScreen: "Productive",
  titleLifeLog: "Life log",
  titleSetting: "Settings",
  titleAddDetailHabit: "Add habit",
  titleAddSchedule: "Schedule",
  // setting
  titleInstructions: "Instructions",
  titleProfile: "Profile",
  /** text */
  // Main Auth
  textAlreadyHaveAnAccount: "already have an account",
  textDontHaveAnAccount: "don't have an account ",
  // sign up
  textUsername: "User name",
  textEmail: "Email",
  textPassword: "Password",
  textPasswordRepeated: "Password repeat",
  confirmPassword: "Confirm password",
  or: "Or connect with",
  // home
  textNothingHere: "no habits were due on..",
  textPullToAdd: "nothing left here ",
  textRelease: "release",
  textWriteYourOwn: "write your own",
  textOrChooseFromTheseTopic: "or chose from these topic",
  signUp: "Sign up",
  signIn: "Sign In",
  // add habit
  textNameOfHabit: "name of habit",
  textTimeDuration: "time duration",
  textEveryday: "everyday",
  textIWillDoIt: "I will do it",
  textOnceOfAnyTime: "once at any time",
  textIWantRepeat: "I want to repeat this habit",
  textOnTheseDay: "on these days",
  // setting
  textLogout: "logout",
  textProfileSetting: "profile settings",
  textGeneral: "general",
  textHelp: "help",
  textSwipeRightForDone: "swipe right for done",
  textSwipeLeftToSkip: "swipe left to skip",
  textOkIUnderStand: "OK, I understand",
  textPullToRefresh: "Pull down to refresh",
  textTapForDetail: "Tap for details",
  textUpdateSuccess: "Update success!",
  textOldPassword: "Old password",
  // common
  textDone: "done",
  textSkip: "skip",
  textNext: "next",
  textOk: "ok",
  textCancel: "cancel",
  textEditScheduleSuccess: "Edit schedule success!",
  loginSuccess: "Login success, we'll navigate soon!",
  editIconAndNameSuccessful: "Edit icon and name successful",
  /* Error */
  errMessUnmatchedPassword: "Your passwords don’t match",
  errEditScheduleFailed: "Edit schedule failed!",
  errMessYourUserNameIsEmpty: "Your user name is empty",
  errMessYourPasswordIsEmpty: "Your password is empty",
  errMessYourEmailIsEmpty: "Your email is empty",
  errMessYourLoginDetailsWereIncorrect: "Your login details were incorrect",
  errMessYouMustSignIn: "You must sign in",
  errMessInternetProblems: "Internet problems!",
  errMessYourHabitQuestIsEmpty: "Your habit quest is empty!",
  errMessPleaseChoseYourIcon: "Please choose your icon!",
  errGoogleLoginByPlayService:
    "Please make sure your device has Google Play Service",
  errFbLogin: "Please make sure your device has facebook",
  invalidEmail: "Invalid email address.",
  invalidEmailFormat:
    "A valid email can only contain latin letters, numbers, '@' and '.'.",
  emailRequired: "An email address is required.",
  userNameRequired: "A user name is required.",
  passwordRequired: "A password is required.",
  passwordMinLength: "A secure password must be at least 5 characters long.",
  passwordsNotMatch: "Your passwords are not the same!",
  yourFieldsIsEmpty: "You have an empty field!",
  /* Line Log*/
  totalPerfectDays: "Total perfect days",
  yourCurrentSteak: "Your current steak",
  yourBestSteak: "Your best streak",
  totalHabitDone: "Total Habit Done",
  averagePerDay: "Average per day",
  howLifeLogWorks: "How life log works",
  currentStreaks: "Current Streaks",
  inThisWeeks: "In this week",
  today: "Today",
  weekly: "This week",
  monthly: "This month",
  thereAreNoTaskFor: "There are no tasks to view by",
  daily: "Daily",
  /* Edit Task Line*/
  myNotes: "My notes",
  nameIconTimer: "Name, icon",
  schedule: "Schedule",
  resetOrDelete: "Delete",
  undo: "Undo",
  viewDetail: "View detail",
  noneOfThese: "None of these!",
  undoSuccess: "Undo successful!",
  // detail Screen
  allStreaks: "All Streaks",
  thereIsNoStreakYet: "There is no streak yet!",

  lifeLog: {
    today: "Today",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    currentStreaks: "Current streaks",
    thereAreNoTaskFor: "There are no task for",
  },
  detail: {
    allStreaks: "All streaks",
  },

  messages: {
    loginSuccess: "Login...",
  },
  title: {
    hobbies: "Chose hobby",
  },
};

export type TranslateKey = keyof typeof en;
