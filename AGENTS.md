### Document Verification

Scan the docs before coding. (Skip docs only if its not related to a feature implementation (e.g. just asking general question))
Use local copy of the doc if available (`~/Project/research-repo-docs`)
else use web ([r4ppz.github.io](https://r4ppz.github.io/research-repo-docs/)).

If no documentation is found, stop and ask the user. Do not guess API structures or logic.

### Implementation Check

Compare requested changes against `api_contract.md` and `specification.md`.
If a request deviates from the spec (e.g., error formats, auth flow, RBAC), you must notify the user before proceeding.

### Workflow

- Do not attempt to scan, run or write unit tests yet.
- Follow existing conventions used in the project. Or suggest a modern alternative if deprecated or bad code is encountered.
- When styling always read the global css like global.css, reset.css, variables.css
- Post-change, you **must** run:

```bash
pnpm lint:fix && pnpm check && pnpm lint:css:fix
```
