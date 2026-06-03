import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const CONFIG_DIR = path.join(os.homedir(), '.agys');
const TOKEN_PATH = path.join(os.homedir(), '.gemini', 'antigravity-cli', 'antigravity-oauth-token');

async function getFileHash(filePath: string): Promise<string> {
  if (!fs.existsSync(filePath)) return '';
  const fileContent = await fs.readFile(filePath);
  return crypto.createHash('sha256').update(fileContent).digest('hex');
}

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

  const activeTokenHash = await getFileHash(TOKEN_PATH);
  const accounts = await getAccounts();

  for (const account of accounts) {
    const accountTokenPath = path.join(CONFIG_DIR, account);
    const accountTokenHash = await getFileHash(accountTokenPath);
    
    if (activeTokenHash === accountTokenHash) {
      return account;
    }
  }

  return null;
}
