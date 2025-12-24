import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["dist", "node_modules", "*.env", "*.d.ts", "eslint.config.js", "vite.config.ts"],
  },

  // Type-aware TypeScript rules
  ...tseslint.configs.strictTypeChecked,

  {
    files: ["src/**/*.{ts,tsx}"],

    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: new URL(".", import.meta.url).pathname,
      },
      globals: globals.browser,
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".ts", ".tsx"],
        },
      },
    },

    rules: {
      // TypeScript / base
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-var": "warn",
      "prefer-const": "warn",
      "prefer-arrow-callback": "warn",
      "no-debugger": "warn",

      // React Hooks + Fast Refresh
      ...reactHooks.configs["recommended-latest"].rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["sibling", "parent"], "index"],
          "newlines-between": "never",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      "prettier/prettier": "warn",
    },
  },
];
