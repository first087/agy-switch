import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import chalk from "chalk";

export const listCommand = new Command("list")
  .alias("ls")
  .description("List all accounts")
  .action(async () => {
    try {
      const accounts = await fileOps.getAccounts();
      const active = await fileOps.getActiveAccount();
      
      if (accounts.length === 0) {
        console.log(chalk.yellow("No accounts found."));
        return;
      }

      console.log(chalk.blue("Accounts:"));
      accounts.forEach((account) => {
        if (account === active) {
          console.log(chalk.green(`* ${account} (active)`));
        } else {
          console.log(`  ${account}`);
        }
      });
    } catch (error) {
      console.error(chalk.red("Failed to list accounts:"), error);
    }
  });
