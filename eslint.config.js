import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import storybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Global ignores
    ignores: ["dist", "node_modules", "*.env", "*.d.ts", "stylelint.config.mjs", "*.config.mjs"],
  },

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  ...storybook.configs["flat/recommended"],

  {
    files: ["src/**/*.{ts,tsx}", "vite.config.ts", "eslint.config.js"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
      import: importPlugin,
    },

    rules: {
      // TypeScript refinements
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-deprecated": "warn",

      // React Compiler compatible ESLint rules (recommended-latest preset)
      ...reactHooks.configs["recommended-latest"].rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // Sorting (native ESLint)
      "sort-imports": [
        "warn",
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Prettier
      "prettier/prettier": "warn",
    },
  },

  eslintConfigPrettier,
];
