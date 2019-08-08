module.exports = {
  "setupFilesAfterEnv": ["./jestsetup.js"],
  "setupFiles": ["./__setups__/date.js"],
  "moduleNameMapper": {
    "\\.css$": "identity-obj-proxy"
  }
}
