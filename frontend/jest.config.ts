import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["<rootDir>/__tests__/unit/**/*.test.{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
    "^.+\\.mjs$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  transformIgnorePatterns: ["/node_modules/(?!(uuid)/)"],
};

export default config;
