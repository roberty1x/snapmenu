#!/bin/bash

# Push SnapMenu to GitHub using GitHub CLI
# Make sure GitHub CLI is properly installed and in your PATH

# Set repository name
REPO_NAME="snapmenu"
REPO_DESCRIPTION="A mobile app for scanning restaurant menus and viewing dish images"

# Change to the project directory
cd /Users/robertgutierrez/snapmenu/snapmenu

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
  echo "Initializing git repository..."
  git init
fi

# Add all files to staging
echo "Adding files to git..."
git add .

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit of SnapMenu app"

# Create GitHub repository and push (GitHub CLI will handle authentication)
echo "Creating repository on GitHub and pushing code..."
gh repo create $REPO_NAME --public --description "$REPO_DESCRIPTION" --source=. --push

echo ""
echo "If you encounter any errors:"
echo "1. Make sure GitHub CLI is installed correctly: brew install gh"
echo "2. Make sure you're logged in: gh auth login"
echo "3. Try running the push manually: gh repo create $REPO_NAME --public --source=. --push"
echo "" 