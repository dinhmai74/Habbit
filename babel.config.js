module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        cwd: "babelrc",
        root: ["."],
        extensions: [".tsx", ".ts", ".ios.js", ".android.js", ".js", ".json"],
        alias: {
          app: "./app",
          actions: "./app/appRedux/actions",
          "actions/*": "./app/appRedux/actions/*",
          api: "./app/api",
          components: "./app/components",
          containers: "./app/containers",
          images: "./app/images",
          localization: "./app/localization",
          model: "./app/model",
          sagas: "./app/appRedux/sagas",
          "sagas/*": "./app/appRedux/sagas/*",
          reducers: "./app/appRedux/reducers",
          route: "./app/route",
          store: "./app/store",
          themes: "./app/themes",
          appRedux: "./app/appRedux",
          "appRedux/*": "./app/appRedux/*",
          "@tools": "app/tools",
        },
      },
    ],
  ],
};
