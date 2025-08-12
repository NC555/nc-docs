---
title: "Starting a New Project and Syncing to GitHub"
description: "A step-by-step guide on how to initialize a new local project and push it to a new GitHub repository for the first time."
tags: ["github", "git", "version-control"]
author: "Default Author"
date: 2025-08-11
---

# Starting a New Project and Syncing to GitHub

This manual provides a step-by-step guide on how to initialize a new local project and push it to a new GitHub repository for the first time.

## Prerequisites

- Git installed on your system.
- A GitHub account.

## Steps

### 1. Create a New Project Directory

First, create a new directory for your project and navigate into it.

```bash
mkdir my-new-project
cd my-new-project
```

### 2. Initialize a Git Repository

Initialize a new Git repository in your project directory.

```bash
git init
```

### 3. Create Initial Project Files

Add your project files to this directory. For example, create a `README.md` file.

```bash
# Example: Create a README.md file
echo "# My New Project" > README.md
```

### 4. Stage Your Files

Stage all the files you want to include in your first commit. The `.` stages all files in the current directory and its subdirectories.

```bash
git add .
```

### 5. Configure Git User Information (if not already set)

If you haven't configured your Git user name and email globally, you'll need to do so. Replace `"Your Name"` and `"you@example.com"` with your actual name and email.

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 6. Make Your First Commit

Commit the staged files with an initial message.

```bash
git commit -m "Initial commit of new project"
```

### 7. Create a New Repository on GitHub

Go to GitHub.com and create a **new, empty repository**. Do **not** initialize it with a README, .gitignore, or license, as you are pushing an existing local project. After creation, GitHub will provide you with the repository's URL (e.g., `https://github.com/your-username/your-repo.git` or `git@github.com:your-username/your-repo.git`). Copy this URL.

### 8. Add the Remote Repository

Link your local Git repository to the remote GitHub repository using the URL you copied. `origin` is the conventional name for the primary remote.

```bash
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
```

### 9. Push Your Local Codebase to GitHub

Finally, push your local `master` (or `main`) branch to the remote `origin`. The `-u` flag sets the upstream branch, meaning future `git push` commands will automatically push to this remote.

```bash
git push -u origin master
# Or if your default branch is 'main':
# git push -u origin main
```

Your new project is now synced with GitHub!
