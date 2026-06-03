import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import packageJson from '../../package.json' with { type: 'json' };

export async function handleSwitch() {
  console.clear();
  try {
    const accounts = await fileOps.getAccounts();
    const active = await fileOps.getActiveAccount();
    
    if (accounts.length === 0) {
      console.log(chalk.yellow("No accounts found. Use 'agys add' to create one."));
      return;
    }

      const message = `[agys v${packageJson.version}] Select account (Press Ctrl+C to cancel)`;
      const header = `
${chalk.green('╭' + '─'.repeat(message.length + 2) + '╮')}
${chalk.green('│')} ${chalk.bold(message)} ${chalk.green('│')}
${chalk.green('╰' + '─'.repeat(message.length + 2) + '╯')}`;
      console.log(header);

    const { selectedAccount } = await inquirer.prompt([{
      type: 'select',
      name: 'selectedAccount',
      message: 'Account:',
      choices: accounts.map((account: string) => ({
        name: account === active ? `${account} (active)` : account,
        value: account
      })),
      default: active,
      theme: {
        icon: { cursor: '👉' },
        style: {
          highlight: chalk.green
        }
      }
    }]).catch(() => {
      console.log(chalk.yellow("\nSwitching cancelled."));
      process.exit(0);
    });


    if (selectedAccount !== active) {
      const sourcePath = path.join(os.homedir(), '.agys', selectedAccount);
      const destPath = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'antigravity-oauth-token');
      
      // Use fs.copy to copy from source to dest (token file)
      await fs.copy(sourcePath, destPath);
      await fileOps.setActiveAccount(selectedAccount);
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
