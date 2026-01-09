/** @type {import('stylelint').Config} */
// biome-ignore lint/style/noDefaultExport: < Stylint need a default here, I think... >
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$|^[a-z0-9]+(-[a-z0-9]+)*$",
      {
        message: "Selectors should use either camelCase or kebab-case naming convention",
      },
    ],
    "custom-property-pattern": [
      "^([a-z][a-zA-Z0-9]*|[a-z0-9]+(-[a-z0-9]+)*)$",
      {
        message:
          "CSS custom properties should use either camelCase or kebab-case naming convention",
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "alpha-value-notation": null,
    "color-function-notation": null,
    "comment-empty-line-before": null,
    "custom-property-empty-line-before": null,
    "value-keyword-case": null,
    "no-empty-source": null,
    "no-descending-specificity": null,
    "media-feature-range-notation": null,
    "comment-whitespace-inside": null,
    "comment-no-empty": null,
    "at-rule-empty-line-before": null,
    "rule-empty-line-before": null,
  },
  overrides: [
    {
      files: ["**/*.module.css"],
      rules: {
        "selector-class-pattern": null,
      },
    },
  ],
};
