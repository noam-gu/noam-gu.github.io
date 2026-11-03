---
inclusion: auto
name: token-saver
description: Token and credit saving practices — context compaction, minimal diff edits, and selective file reading. Activated when working with large files, long sessions, or when efficiency matters.
---

# Token & Credit Saving Guidelines

Apply these practices to reduce token usage and credit consumption **without sacrificing correctness or safety**.

## Context Compaction
- Summarize multi-turn history when a session is long; do not re-read files already seen this session unless they have changed.
- Avoid pasting entire file contents into chat — reference files by path or quote only the relevant lines.
- Prefer `read_code` (signatures/AST) over reading full large files when you only need structure.
- After context compaction, re-confirm your position in multi-step tasks by checking recent file states or command outputs rather than relying on memory.

## Diff-only Modifications
- Never rewrite an entire file when a small change suffices — use `str_replace` / search-and-replace for targeted edits.
- Use `fs_write` only to create new files or for a full rewrite of a file you have already read.
- Keep responses focused; do not restate large unchanged code blocks.

## Selective File Reading
- Do not index or read heavy/irrelevant asset files (binaries, images, large generated files, `node_modules`, build output) unless the task requires them.
- Use `grep_search` / `file_search` to locate relevant code before reading, rather than reading whole directories.
- For large files, read only the line ranges you need (use `offset`/`limit`).

## Do Not Trade Safety for Tokens
- Never skip required build/test/verification steps, the commit/push workflow, or safety guardrails to save tokens.
- Correctness and verification always take priority over token savings.
