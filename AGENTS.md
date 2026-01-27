### Document Verification

**Always scan the docs before coding.** - **Source Priority:** Local (`~/Project/research-repo-docs`) > Web ([r4ppz.github.io](https://r4ppz.github.io/research-repo-docs/)).

- **Fallback:** If no documentation is found, **stop and ask the user.** Do not guess API structures or logic.

### Implementation Check

- Compare requested changes against `api_contract.md` and `specification.md`.
- **Conflict Warning:** If a request deviates from the spec (e.g., error formats, auth flow, RBAC), you **must** notify the user before proceeding.

### Workflow

- **No Tests:** Do not attempt to scan, run or write unit tests yet.
- **Patterns:** Follow existing conventions used in the project. Or suggest a modern alternative if deprecated or bad code is encountered.
- Post-change, you **must** run:

```bash
npm run lint:fix && npm run check && npm run lint:css:fix
```
