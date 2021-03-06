module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
    // "prettier/@typescript-eslint",
    // "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "prefer-const": "off",
    "no-var": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
