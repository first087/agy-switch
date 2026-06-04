import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import inquirer from 'inquirer';
import chalk from "chalk";
import os from "os";
import path from "path";
import fs from "fs-extra";

export const addCommand = new Command("add")
  .description("Add a new account token. Ensure you have run 'agy' to login first.")
  .argument("[name]", "account name")
  .allowExcessArguments(false)
  .showHelpAfterError()
  .action(async (name) => {
    if (!name) {
      addCommand.outputHelp();
      return;
    }
    const sourcePath = path.join(
      os.homedir(),
      ".gemini",
      "antigravity-cli",
      "antigravity-oauth-token",
    );

    if (!fs.existsSync(sourcePath)) {
      console.error(chalk.red("Error: Source token file not found."));
      console.error(
        chalk.yellow(
          `Please ensure you have opened Antigravity CLI (command 'agy') to generate the token file at: ${sourcePath}`,
        ),
      );
      return;
    }

    const accounts = await fileOps.getAccounts();
    if (accounts.includes(name)) {
      const { override } = await inquirer.prompt([{
        type: 'confirm',
        name: 'override',
        message: `Account '${name}' already exists. Do you want to override it?`,
        default: false
      }]);

      if (!override) {
        console.log(chalk.yellow("Add cancelled."));
        return;
      }
    }

    try {
      await fileOps.copyTokenToAccount(name, sourcePath);
      await fileOps.setActiveAccount(name);
      console.log(chalk.green(`Account '${name}' added and set as active.`));
    } catch (error) {
      console.error(chalk.red(`Failed to add account '${name}':`), error);
    }
  });
