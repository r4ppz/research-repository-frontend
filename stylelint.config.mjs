export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    "color-function-notation": "modern",
    "alpha-value-notation": "percentage",
    "media-feature-range-notation": "context",
    "no-descending-specificity": true,
    "value-keyword-case": "lower",

    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9-]*$",
      {
        message: (selector) =>
          `Expected class selector "${selector}" to be camelCase or kebab-case`,
      },
    ],

    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "local"],
      },
    ],

    "property-no-unknown": [
      true,
      {
        ignoreProperties: [":export"],
      },
    ],

    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["value"],
      },
    ],

    "custom-property-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-custom-property", "after-comment"],
      },
    ],

    "declaration-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-declaration", "after-comment"],
      },
    ],
  },
};
