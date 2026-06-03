# agys

Manage multiple antigravity-cli oauth token accounts with ease.

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

## License

MIT
