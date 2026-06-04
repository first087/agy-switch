# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-06-04

### Added

- **Delete Account**: Added `delete` command (with aliases `rm`, `del`, `remove`) to securely delete account tokens.
  - Interactive multiple-choice menu (`checkbox` prompt).
  - Active account protection (prevents selecting the active account).
  - Deletion confirmation prompt.
- **UX Improvements**:
  - Standardized interactive menus (`pageSize: 10`, `loop: false`) for `switch` and `delete` commands.
  - Improved `switch` menu prompt message for better clarity.
- **Security & Privacy**: Added "Security & Privacy" documentation to `README.md` and CLI help menu.
- **Onboarding**: Added "Prerequisites" section to `README.md` and added source token file validation in `add` command.
- **Testing**: Added comprehensive E2E test suite (`src/e2e.spec.ts`) and `test:e2e` script.

### Changed

- **TypeScript**: Upgraded TypeScript to 6 and updated `tsconfig.json` (`types`, `noEmit`).
- **CLI UX**: Standardized CLI exit codes and error handling for invalid commands.

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
