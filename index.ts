#!/usr/bin/env bun
import { Command } from "commander";
import packageJson from "./package.json" with { type: "json" };
import { addCommand } from "./src/commands/add";
import { listCommand, lsCommand } from "./src/commands/list";
import { switchCommand, handleSwitch } from "./src/commands/switch";

const program = new Command();

program
  .name("agys")
  .description(`${packageJson.description} (v${packageJson.version})`)
  .version(packageJson.version);

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(lsCommand);
program.addCommand(switchCommand);

// Set description for switch command explicitly
switchCommand.description(
  "Switch to a different account (run agys without arguments)",
);

// Set default action if no command is provided
program.action(async () => {
  if (program.args.length === 0) {
    await handleSwitch();
  }
});

program.addHelpText(
  "after",
  `
GitHub Repository: https://github.com/first087/agy-switch

Security & Privacy:
  This is an open-source tool. Your OAuth tokens are stored locally in ~/.agys/
  for account switching. We do not transmit or share your tokens with any servers.
  You are welcome to inspect the source code to verify our privacy practices.
`,
);

program.parse(process.argv);
