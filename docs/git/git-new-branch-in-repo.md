# Git Branch Creation and Push Guide

## Prerequisites

- Git installed
- Repository already cloned
- Remote repository access

## Steps

### 1. Create New Branch

1. Ensure you're in the correct repository:

   ```bash
   pwd
   ```

2. Check current branch and status:

   ```bash
   git status
   git branch
   ```

3. Create and switch to new branch:

   ```bash
   git checkout -b <YOUR-BRANCH-NAME>
   ```

4. Verify branch creation:
   ```bash
   git branch
   # Should show * nati
   ```

### 2. Stage and Commit

1. Check files to be committed:

   ```bash
   git status
   ```

2. Stage all changes:

   ```bash
   git add .
   ```

3. Commit changes:

   ```bash
   git commit -m "Initial commit for nati branch"
   ```

4. Verify commit:
   ```bash
   git log --oneline -n 1
   ```

### 3. Push to Remote

1. Push new branch to remote:

   ```bash
   git push -u origin nati
   ```

2. Verify remote push:
   ```bash
   git branch -a
   ```

## Verification

1. Check branch status:

   ```bash
   git status
   ```

2. Confirm remote branch exists:
   ```bash
   git fetch --all
   git branch -r
   ```

## Troubleshooting

If push fails:

1. Check remote connection:

   ```bash
   git remote -v
   ```

2. Ensure you have correct permissions
3. Try forcing push if necessary:
   ```bash
   git push -f origin nati
   ```

Remember to follow your team's branching conventions and ensure you have the necessary permissions for pushing to the remote repository.
