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
  await ensureConfigDir();
  
  if (!fs.existsSync(TOKEN_PATH)) {
    return null;
  }

  const activeTokenContent = await fs.readFile(TOKEN_PATH, 'utf-8');
  const accounts = await getAccounts();

  for (const account of accounts) {
    const accountTokenPath = path.join(CONFIG_DIR, account);
    const accountTokenContent = await fs.readFile(accountTokenPath, 'utf-8');
    
    if (activeTokenContent === accountTokenContent) {
      return account;
    }
  }

  return null;
}
