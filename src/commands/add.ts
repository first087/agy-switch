import { Command } from "commander";
import * as fileOps from "../utils/fileOperations";
import os from "os";
import path from "path";

export const addCommand = new Command("add")
  .description("Add a new account token")
  .argument("<name>", "account name")
  .action(async (name) => {
    const sourcePath = path.join(os.homedir(), ".gemini", "antigravity-cli", "antigravity-oauth-token");
    try {
      await fileOps.copyTokenToAccount(name, sourcePath);
      console.log(`Account '${name}' added successfully.`);
    } catch (error) {
      console.error(`Failed to add account '${name}':`, error);
    }
  });
