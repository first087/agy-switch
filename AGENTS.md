# AI Agent Guidelines (AGENTS.md)

This file contains behavioral rules, coding standards, and cooperation protocols for all AI agents working on this project. These guidelines are designed to minimize errors, maintain codebase simplicity, and ensure consistent code style.

---

## 🧠 1. Think Before Coding
**Do not assume. Do not hide confusion. Surface tradeoffs.**
*   **State Assumptions:** Before implementing any feature or change, explicitly list your assumptions. If something is unclear or ambiguous, ask the user for clarification.
*   **Present Alternatives:** If there are multiple ways to solve a problem, present them along with their tradeoffs instead of choosing one silently.
*   **Keep it Simple:** Always suggest the simplest possible path first. Push back against over-engineering or unnecessary complexity.

## 🧼 2. Simplicity & Minimalist Code
**Write the minimum amount of code that solves the problem. No speculative engineering.**
*   **No Unrequested Features:** Implement only what is explicitly requested. Do not add speculative "future-proofing" features.
*   **Minimize Abstractions:** Avoid creating abstractions (interfaces, base classes, helper modules) for single-use code.
*   **Refactor for Conciseness:** If a block of code can be written in 50 lines instead of 200, rewrite it. Keep components focused, small, and readable.

## 🪚 3. Surgical Changes
**Touch only what is necessary. Respect existing patterns.**
*   **No Unrelated Edits:** Do not modify, "clean up," or refactor adjacent code, comments, or formatting that is not related to the current task.
*   **Respect Existing Styles:** Match the code formatting, style, naming conventions, and architecture of the files you are modifying.
*   **Preserve Documentation:** Maintain existing comments and docstrings unless they are directly invalidated by your changes.

## 🌿 4. Version Control (Git Flow & Conventional Commits)
AI agents must follow strict version control hygiene:
*   **Git Flow Branches:** Work only on `develop` or task-specific `feature/*` branches. Direct commits to `main` are strictly prohibited.
*   **Conventional Commits:** All commit messages must follow the Conventional Commits specification:
    *   `feat: ...` (new feature/layout)
    *   `fix: ...` (bug fix)
    *   `docs: ...` (documentation change)
    *   `chore: ...` (build setup, dependency update, house-keeping)
*   **Ask Before Committing/Pushing:** Always ask the user for confirmation before committing, pushing, or running any git branch command.

## 🤝 5. Communication & Interaction Protocol
*   **Concise Responses:** Keep responses brief, high-signal, and focus on technical takeaways.
*   **File Modifications & Terminal Commands Protocol:**
    1. Explain the planned changes and list the files to be modified/created first without showing diffs.
    2. **DO NOT** run modifying tools (e.g., `replace_file_content`, `write_to_file`, `run_command` for edits) in the same turn.
    3. Explicitly ask for approval and wait for the user to greenlight the execution in the next turn.

## 📂 6. Project-Specific Directives
This `AGENTS.md` file defines the core behavioral framework. However, every project has unique setup details:
*   Always check and read the root [README.md](README.md) to understand the technology stack, local run commands, and architecture.
*   Always check the project-specific protocol file under `docs/` (or equivalent location) for local environment quirks (e.g. WSL2, Docker configurations), custom commands, and persona requirements.
