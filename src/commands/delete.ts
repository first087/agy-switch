import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import inquirer from "inquirer";
import chalk from "chalk";
import packageJson from "../../package.json" with { type: "json" };

async function deleteAction() {
  try {
    const accounts = await fileOps.getAccounts();
    const active = await fileOps.getActiveAccount();

    if (accounts.length === 0) {
      console.log(chalk.yellow("No accounts found."));
      return;
    }

    console.clear();
    const message = `[agys v${packageJson.version}] Select account to delete (Press Ctrl+C to cancel)`;
    const header = `
${chalk.red("╭" + "─".repeat(message.length + 2) + "╮")}
${chalk.red("│")} ${chalk.bold(message)} ${chalk.red("│")}
${chalk.red("╰" + "─".repeat(message.length + 2) + "╯")}`;
    console.log(header);

    const { selectedAccount } = await inquirer.prompt([
      {
        type: "select",
        name: "selectedAccount",
        message: "Account:",
        choices: accounts.map((account: string) => ({
          name:
            account === active
              ? `${account} (active - cannot delete)`
              : account,
          value: account,
          disabled: account === active,
        })),
        pageSize: 10,
        loop: false,
        theme: {
          icon: { cursor: "👉" },
          style: {
            highlight: chalk.red,
          },
        },
      },
    ]);

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `Are you sure you want to delete '${selectedAccount}'?`,
        default: false,
      },
    ]);

    if (confirm) {
      await fileOps.deleteAccount(selectedAccount);
      console.log(chalk.green(`Account '${selectedAccount}' deleted.`));
    } else {
      console.log(chalk.yellow("Delete cancelled."));
    }
  } catch (error: any) {
    console.error(chalk.red("Failed to delete account:"), error.message);
  }
}

export const deleteCommand = new Command("delete")
  .description("Delete an account token")
  .allowExcessArguments(false)
  .showHelpAfterError()
  .action(deleteAction);

export const removeCommand = new Command("remove")
  .description("Alias for delete")
  .allowExcessArguments(false)
  .showHelpAfterError()
  .action(deleteAction);

export const delCommand = new Command("del")
  .description("Alias for delete")
  .allowExcessArguments(false)
  .showHelpAfterError()
  .action(deleteAction);

export const rmCommand = new Command("rm")
  .description("Alias for delete")
  .allowExcessArguments(false)
  .showHelpAfterError()
  .action(deleteAction);
