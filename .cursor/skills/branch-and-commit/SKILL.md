---
name: branch-and-commit
description: Creates a new branch from master, stages changes, and optionally commits. Requires current branch to be master; aborts otherwise. Use when the user wants to start a new branch, commit changes to a new branch, add-only (stage without commit), or says "new branch", "branch and commit", "add only", etc.
---

# Branch and Commit

Workflow for creating a new branch from master, staging changes, and optionally committing. Follow the steps in order; abort when conditions are not met.

## Pre-check: Must be on master

1. Run `git branch --show-current` (or `git rev-parse --abbrev-ref HEAD`).
2. If the result is **not** `master`, **stop**. Tell the user: "This workflow requires the current branch to be master. You're on `<branch>`. Switch to master first, then run this again."
3. Do not create a branch, stage, or commit. End the workflow.

## Parse the user's request

From the user's message, determine:

| Input | How to detect | Default if missing |
|-------|----------------|--------------------|
| **Branch name** | Explicit name given (e.g. "branch name: feature/login") | Generate one (see below) |
| **Add only** | Phrases like "add only", "don't commit", "stage only", "no commit", "add but don't commit" | Commit after staging |
| **Commit message** | Explicit message in quotes or after "message:" | Generate from staged diff (see below) |

## Step 1: Branch name

- **User provided a name**: Use it as-is (normalize to a valid branch name: lowercase, hyphens for spaces, no special chars).
- **No name provided**: Generate a logical branch name before creating the branch:
  1. Run `git status` and `git diff --stat` (unstaged) to see what changed.
  2. Infer a short slug from the changes (e.g. "add login form", "fix header layout").
  3. Use format `feature/<slug>` for new behavior or content, `fix/<slug>` for fixes or corrections. Use lowercase and hyphens (e.g. `feature/add-login-form`, `fix/header-layout`).

## Step 2: Create the branch

Run:

```bash
git checkout -b <branch-name>
```

Use the branch name from Step 1.

## Step 3: Stage changes

- If the user specified files or paths, run `git add <paths>`.
- Otherwise run `git add .` to stage all changes.

## Step 4: Commit (unless add-only)

If the user asked for **add only** (don't commit), stop after Step 3. Confirm what you did: "Created branch `<branch-name>` and staged changes. No commit (add-only)."

If committing:

- **User provided a message**: Use it as the commit message.
- **No message**: Generate one from the staged diff:
  1. Run `git diff --staged` (or `git diff --cached`).
  2. Summarize the change in one line, then an optional second line with detail. Prefer conventional style: `type(scope): summary` (e.g. `feat(auth): add login form`, `fix(header): correct layout on mobile`).

Then run:

```bash
git commit -m "<message>"
```

## Workflow summary

```
1. Check current branch is master → if not, abort.
2. Determine: branch name (or plan to generate), add-only?, commit message (or plan to generate).
3. git checkout -b <branch-name>
4. git add . (or user-specified paths)
5. If add-only: stop. Otherwise: commit with given or generated message.
```

## Examples

**User**: "New branch for the dashboard, add only"
- Pre-check: on master.
- Branch name: user said "dashboard" → e.g. `feature/dashboard`.
- Add only: yes. Create branch, stage all, do not commit.

**User**: "Branch and commit" (no name, no message)
- Pre-check: on master.
- Branch name: generate from staged diff after adding (e.g. `feature/add-widget`).
- Add only: no. Stage, then generate commit message from diff and commit.

**User**: "New branch fix/typo, commit with message: Fix typo in README"
- Pre-check: on master.
- Branch name: `fix/typo`.
- Commit message: "Fix typo in README". Create branch, stage, commit with that message.
