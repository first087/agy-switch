import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import os from 'os';
import fs from 'fs-extra';

export async function handleSwitch() {
  try {
    const accounts = await fileOps.getAccounts();
    const active = await fileOps.getActiveAccount();
    
    if (accounts.length === 0) {
      console.log(chalk.yellow("No accounts found. Use 'add' to create one."));
      return;
    }

    const { selectedAccount } = await inquirer.prompt([{
        type: 'select',
        name: 'selectedAccount',
        message: 'Select account (Press Ctrl+C to cancel):',
        choices: accounts,
        default: active
      }]).catch(() => {
        console.log(chalk.yellow("\nSwitching cancelled."));
        process.exit(0);
      });

    if (selectedAccount !== active) {
      const sourcePath = path.join(os.homedir(), '.agys', selectedAccount);
      const destPath = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'antigravity-oauth-token');
      
      // Use fs.copy to copy from source to dest (token file)
      await fs.copy(sourcePath, destPath);
      console.log(chalk.green(`Switched to account '${selectedAccount}'`));
    } else {
      console.log(chalk.blue(`Already using account '${selectedAccount}'`));
    }
  } catch (error) {
    console.error(chalk.red("Failed to switch account:"), error);
  }
}

export const switchCommand = new Command("switch")
  .description("Switch to a different account")
  .action(handleSwitch);
