module.exports = {
  testEnvironment: "node",

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  testMatch: [
    "<rootDir>/src/**/*.spec.(js|ts)",
    "<rootDir>/test/**/*.spec.(js|ts)",
    "<rootDir>/src/**/*.spec.*.(js|ts)",
    "<rootDir>/test/**/*.spec.*.(js|ts)",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: ["js", "json", "ts"],
  modulePaths: ["<rootDir>/libs"],
  moduleNameMapper: {
    "#test/(.*)": "<rootDir>/test/$1",
    "#app/(.*)": "<rootDir>/src/app/$1",
  },
  preset: "ts-jest",
}
