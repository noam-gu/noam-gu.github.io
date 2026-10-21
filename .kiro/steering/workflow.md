# Workflow Instructions

## Working Directory
- Always work from the `~/git/noam-gu.github.io` repository (`c:\Users\danab\git\noam-gu.github.io`).
- All new files and directories should be created inside this folder unless explicitly told otherwise.

## Git Workflow — Fully Managed by Kiro
The user is not familiar with git and wants the git workflow to be as simple as possible.
- Kiro is fully responsible for the entire git process: staging, commit message, and pushing.
- After completing any requested change, automatically commit and push the changes to the repository WITHOUT asking the user.
- Kiro decides and writes the commit message. Make it clear, concise, and descriptive of the actual change.
- Stage only the relevant files (avoid `git add -A` / `git add .`); prefer adding specific files by name.
- Push to the current branch. If on `main`/`master`, push there directly unless the user asks for a separate branch.
- The user only asks for the task/action; Kiro handles all git operations automatically and transparently.
- Do NOT auto-commit/push ONLY when the user explicitly asks to skip it, or when working on a sensitive change that requires confirmation (e.g. touching secrets, force operations, production configs).
