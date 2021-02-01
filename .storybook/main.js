const path = require("path");

module.exports = {
  stories: ["../components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-apollo-client",
  ],
  presets: [path.resolve(__dirname, "./next-preset.js")],
};
