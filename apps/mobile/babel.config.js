// babel.config.js
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    // other plugins can go here
    "react-native-reanimated/plugin", // 👈 must be last
  ],
};
