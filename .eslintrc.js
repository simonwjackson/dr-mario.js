module.exports = {
  extends: "eslint-config-simonwjackson",
  "plugins": [
    "fp",
    "promise",
    "standard",
    // 'prettier',
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
  rules: {
    // "prettier/prettier": "error",
    "fp/no-arguments": 2,
    "fp/no-class": 2,
    "fp/no-delete": 2,
    "fp/no-events": 2,
    "fp/no-get-set": 2,
    "fp/no-let": 2,
    "fp/no-loops": 2,
    "fp/no-mutating-assign": 2,
    "fp/no-mutating-methods": 2,
    "fp/no-mutation": 2,
    "fp/no-nil": 2,
    "fp/no-proxy": 2,
    "fp/no-rest-parameters": 2,
    "fp/no-this": 2,
    "fp/no-throw": 2,
    "fp/no-unused-expression": 2,
    "fp/no-valueof-field": 2,
    "no-var": 2,
    "prefer-spread": 2
  },
  "env": {
    "browser": true,
    "node": true
  }
}