import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import os from "os";
import path from "path";

export const addCommand = new Command("add")
  .description("Add a new account token")
  .argument("[name]", "account name") // Change <name> to [name] to make it optional
  .action(async (name) => {
    if (!name) {
      addCommand.outputHelp();
      return;
    }
    const sourcePath = path.join(os.homedir(), ".gemini", "antigravity-cli", "antigravity-oauth-token");
    try {
      await fileOps.copyTokenToAccount(name, sourcePath);
      console.log(chalk.green(`Account '${name}' added successfully.`));
    } catch (error) {
      console.error(chalk.red(`Failed to add account '${name}':`), error);
    }
  });
