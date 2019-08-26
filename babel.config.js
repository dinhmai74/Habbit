module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
      [
          "module-resolver",
          {
              root: ["./app"],
              extensions: [".tsx",".ts"],
              alias: {
                  "app": "./app",
                  "actions": "./app/actions",
                  "api": "./app/api",
                  "components": "./app/components",
                  "containers": "./app/containers",
                  "images": "./app/images",
                  "localization": "./app/localization",
                  "model": "./app/model",
                  "sagas": "./app/sagas",
                  "reducers": "./app/reducers",
                  "route": "./app/route",
                  "store": "./app/store",
                  "themes": "./app/themes",
                  "@tools": "./app/tools",
              }
          }
      ]
  ]
};
