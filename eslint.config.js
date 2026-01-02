import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Global ignores
    ignores: ["dist", "node_modules", "*.env", "*.d.ts", "stylelint.config.mjs", "*.config.mjs"],
  },

  // Base TypeScript configs (these return arrays, so we spread them)
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ["src/**/*.{ts,tsx}", "vite.config.ts", "eslint.config.js"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        // Modern replacement for new URL(...).pathname
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "react-compiler": reactCompiler,
      prettier: prettierPlugin,
    },
    rules: {
      // TypeScript refinements
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // React Hooks & Compiler
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "react-compiler/react-compiler": "error",

      // Sorting
      "simple-import-sort/imports": "off",
      "simple-import-sort/exports": "off",

      // Prettier
      "prettier/prettier": "warn",
    },
  },
  // Must be the last object to override previous stylistic rules
  eslintConfigPrettier,
];
