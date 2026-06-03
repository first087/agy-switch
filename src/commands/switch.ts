import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import os from 'os';

export const switchCommand = new Command("switch")
  .description("Switch to a different account")
  .action(async () => {
    try {
      const accounts = await fileOps.getAccounts();
      const active = await fileOps.getActiveAccount();
      
      if (accounts.length === 0) {
        console.log(chalk.yellow("No accounts found. Use 'add' to create one."));
        return;
      }

      const { selectedAccount } = await inquirer.prompt([{
        type: 'list',
        name: 'selectedAccount',
        message: 'Select account:',
        choices: accounts,
        default: active
      }]);

      if (selectedAccount !== active) {
        const sourcePath = path.join(os.homedir(), '.agys', selectedAccount);
        const destPath = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'antigravity-oauth-token');
        await fileOps.copyTokenToAccount(selectedAccount, sourcePath); // Reuse this function to swap token
        console.log(chalk.green(`Switched to account '${selectedAccount}'`));
      } else {
        console.log(chalk.blue(`Already using account '${selectedAccount}'`));
      }
    } catch (error) {
      console.error(chalk.red("Failed to switch account:"), error);
    }
  });
