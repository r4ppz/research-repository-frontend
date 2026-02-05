/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    // Strict camelCase (Optimized regex)
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$",
      {
        message: (selector) => `Expected class selector "${selector}" to be camelCase`,
      },
    ],

    // Modern CSS Features
    "color-function-notation": "modern",
    "alpha-value-notation": "percentage",
    "media-feature-range-notation": "context",

    // CSS Modules Specific Support
    "selector-pseudo-class-no-unknown": [
      true,
      {
        // Added 'local' and 'global'
        ignorePseudoClasses: ["global", "local"],
      },
    ],

    // Allow :export blocks for passing values to JS
    "property-no-unknown": [
      true,
      {
        ignoreProperties: [":export"],
      },
    ],

    // Practicality
    "no-descending-specificity": true,
    "value-keyword-case": "lower",

    // Disable this to allow standard CSS module imports and @value if used
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["value"],
      },
    ],
  },
}; /** @type {import('stylelint').Config} */
