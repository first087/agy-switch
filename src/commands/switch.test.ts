import { expect, test, spyOn } from "bun:test";
import * as fileOps from "../utils/fileOperations";
import inquirer from "inquirer";

// Mocking the utility functions and inquirer
spyOn(fileOps, "getAccounts").mockImplementation(() =>
  Promise.resolve(["test", "test2", "test3"]),
);
// @ts-ignore
spyOn(inquirer, "prompt").mockImplementation(() =>
  Promise.resolve({ selectedAccount: "test2" }),
);

test("switch interactive menu returns selected account", async () => {
  const accounts = await fileOps.getAccounts();
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "selectedAccount",
      message: "Select account:",
      choices: accounts,
    },
  ]);

  expect(answers.selectedAccount).toBe("test2");
});
