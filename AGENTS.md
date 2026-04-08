### Workflow

- Do not attempt to scan, run or write unit/integration tests.
- Follow existing conventions used in the project.
- Or suggest a modern alternative if deprecated or bad code is encountered.
- When styling a component always read the global css like `global.css`, `reset.css`, `variables.css`
- Post-change, you MUST run:

```bash
pnpm lint:fix && pnpm check && pnpm lint:css:fix
```
