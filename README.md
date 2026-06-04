# agys

Manage multiple antigravity-cli oauth token accounts with ease.

## Prerequisites
Before using `agys`, ensure you have generated your OAuth token:
1. Open Antigravity CLI by running the command `agy` and complete the setup/login process.
2. This ensures the token file is generated at `~/.gemini/antigravity-cli/antigravity-oauth-token`.

## Features

- **Add Accounts**: Easily add and name new OAuth token accounts.
- **List Accounts**: View all managed accounts and see which one is currently active.
- **Interactive Switch**: Switch between accounts using an interactive CLI menu.
- **Persistent State**: Keeps track of the active account automatically.

## Installation

```bash
npm install -g @first087/agys
# or
bun install -g @first087/agys
```

## Usage

### Add a new account

```bash
agys add <name>
```

### List all accounts

```bash
agys list
# or
agys ls
```

### Switch account

Run `agys` without any arguments to open the interactive selection menu:

```bash
agys
# or explicitly
agys switch
```

## Security & Privacy

`agys` is an open-source tool. Your OAuth tokens are stored locally on your machine within the `~/.agys/` directory for account switching purposes. We do not transmit, store, or share your tokens with any external servers. You are welcome to inspect the source code to verify our privacy practices.
