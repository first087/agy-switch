# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Delete Account**: Added `delete` command (with aliases `rm`, `del`, `remove`) to securely delete account tokens.
  - Interactive selection menu with multiple choice support.
  - Prevents deletion of the currently active account.
  - Requires confirmation before deletion.
  - Standardized UI (colors, framed header, status indicators) consistent with `switch` command.

### Changed

- **CLI UX**:
  - Updated prompt message in `switch` command for better clarity ("Select account to switch").
  - Standardized interactive menus (`pageSize: 10`, `loop: false`) for `switch` and `delete` commands.
  - Standardized CLI exit codes.

### Fixed

- **Bug Fixes**:
  - Resolved `ReferenceError` issues in `add.ts` and `switch.ts`.
  - Fixed argument handling issues to prevent raw error messages.

## [0.3.0] - 2026-06-03

### Changed

- **Packaging**: Updated `package.json` to publish only build artifacts (`dist/index.js`) instead of full source files, reducing package size.

## [0.2.0] - 2026-06-03

### Added

- **Interactive Switch**: New `switch` command providing an interactive menu for account selection.
- **Persistent State**: Automated active account tracking via `~/.agys/.active` file.
- **UI/UX Enhancements**:
  - Added header frame and colors to the `switch` menu.
  - Added `(active)` status indicator for the currently active account.
- **Documentation**: Added GitHub repository link to the help menu.

### Fixed

- **Bug Fixes**:
  - Resolved file copying path issues and improved `add` command feedback.
  - Standardized CLI exit codes for success and error scenarios.

## [0.1.0] - 2026-06-03

### Added

- **Initial Release**: Project structure with Bun and TypeScript.
- **Account Management**:
  - `add` command for creating new token accounts.
  - `list` and `ls` commands for account listing.
  - Interactive `switch` command for seamless account switching.
- **State Management**: Implemented persistent state tracking via `.active` file.
- **Documentation & Config**: Added `README.md`, `.npmignore`, and publication scripts (`build`, `publish:npm`).
- **Code Quality**: Included linting configurations, type safety improvements, and automated test mocks.
- **Build Process**: Configured build/cleanup scripts in `package.json`.
