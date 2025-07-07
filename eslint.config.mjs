import typescript from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  prettier,
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["**/*.gen.ts"],
    languageOptions: {
      parser: typescript,
    },
  },
];
