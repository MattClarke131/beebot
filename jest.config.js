module.exports = {
  "roots": [
    "./src"
  ],
  "testMatch": [
    "**/*.spec.{js,ts}",
    //"**/?(*.)+(spec.+(ts|js)"
  ],
  "transform": {
    "^.+\\.ts$": "ts-jest"
  },
  preset: "ts-jest",
  testEnvironment: "node",
};
