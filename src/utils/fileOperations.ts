import fs from "fs-extra";
import path from "path";
import os from "os";

const CONFIG_DIR = path.join(os.homedir(), ".agys");
const ACTIVE_FILE = path.join(CONFIG_DIR, ".active");

export async function ensureConfigDir() {
  await fs.ensureDir(CONFIG_DIR);
}

export async function copyTokenToAccount(
  accountName: string,
  sourcePath: string,
) {
  const destPath = path.join(CONFIG_DIR, accountName);
  await fs.ensureDir(CONFIG_DIR);
  await fs.copy(sourcePath, destPath);
  return destPath;
}

export async function deleteAccount(accountName: string) {
  const active = await getActiveAccount();
  if (accountName === active) {
    throw new Error(`Cannot delete the active account: ${accountName}`);
  }
  const accountPath = path.join(CONFIG_DIR, accountName);
  if (await fs.pathExists(accountPath)) {
    await fs.remove(accountPath);
  }
}

export async function getAccounts() {
  await ensureConfigDir();
  const files = await fs.readdir(CONFIG_DIR);
  return files.filter((file: string) => file !== ".active");
}

export async function setActiveAccount(accountName: string) {
  await ensureConfigDir();
  await fs.writeFile(ACTIVE_FILE, accountName, "utf-8");
}

export async function getActiveAccount() {
  await ensureConfigDir();

  if (!fs.existsSync(ACTIVE_FILE)) {
    return null;
  }

  return await fs.readFile(ACTIVE_FILE, "utf-8");
}
