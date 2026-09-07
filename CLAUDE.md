# Claude project instructions

Follow [AGENTS.md](AGENTS.md) as the shared working guide. It is also the primary Codex entry point; this file does not maintain a separate architecture or design specification.

Core rules for every task:

- Inspect applicable instructions and git status; preserve unrelated user work.
- Preserve the Nocturne design, content, section order and 3D appearance. Use [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for final tokens, typography, geometry and behavior.
- Keep app responsible for routing/composition; keep feature content in features, reusable primitives in components/ui, and shared identity/URLs in lib/site-config.ts. Follow AGENTS.md's one-way import rules.
- Use customized shadcn Button/Sheet/Avatar and Tailwind v4 tokens. Avoid repeated static inline styles; keep the explicit dark-only theme and actual font assignments.
- Keep static content on the server and isolate interaction in the existing small client boundaries. Preserve accessibility, keyboard behavior, reduced motion and scene resource ownership.
- Correct overflow through flexible layout and wrapping, never page clipping. UI changes require the documented six-width browser matrix and matching visual comparisons.
- Use npm and update its lockfile for dependency changes. Verify with lint, typecheck, build and verify:build as applicable; use test:e2e for browser behavior and matching screenshots for visual changes. Follow AGENTS.md for Playwright setup; HTML smoke tests alone do not establish visual fidelity.
- Completion means implementation, appropriate verification and affected documentation. State unrun/blocked checks explicitly. Do not commit, push or deploy without task authorization.

Update shared details in AGENTS.md to prevent drift. Record what changed and the actual verification results in [docs/REFACTOR_NOTES.md](docs/REFACTOR_NOTES.md), not in these standing instructions.
