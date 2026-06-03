import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.agys');
const TOKEN_PATH = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'antigravity-oauth-token');

export async function ensureConfigDir() {
  await fs.ensureDir(CONFIG_DIR);
}

export async function copyTokenToAccount(accountName: string, sourcePath: string) {
  const destPath = path.join(CONFIG_DIR, accountName);
  await fs.ensureDir(CONFIG_DIR);
  await fs.copy(sourcePath, destPath);
  return destPath;
}

export async function getAccounts() {
  await ensureConfigDir();
  const files = await fs.readdir(CONFIG_DIR);
  return files;
}

export async function getActiveAccount() {
  // Logic to determine active account based on token content match
  // For now, this is a placeholder implementation
  return 'test';
}
