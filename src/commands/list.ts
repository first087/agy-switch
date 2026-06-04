import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import chalk from "chalk";

async function listAction() {
  try {
    const accounts = await fileOps.getAccounts();
    const active = await fileOps.getActiveAccount();

    if (accounts.length === 0) {
      console.log(chalk.yellow("No accounts found. Use 'add' to create one."));
      return;
    }

    console.log(chalk.blue("Accounts:"));
    accounts.forEach((account: string) => {
      if (account === active) {
        console.log(chalk.green(`* ${account} (active)`));
      } else {
        console.log(`  ${account}`);
      }
    });
  } catch (error) {
    console.error(chalk.red("Failed to list accounts:"), error);
  }
}

export const listCommand = new Command("list")
  .description("List all accounts")
  .allowExcessArguments(false)
  .showHelpAfterError()
  .action(async () => {
    await listAction();
  });

export const lsCommand = new Command("ls")
  .description("Alias for list")
  .allowExcessArguments(false)
  .showHelpAfterError()
  .action(async () => {
    await listAction();
  });
