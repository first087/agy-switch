import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

const CONFIG_DIR = path.join(os.homedir(), '.agys');
const ACTIVE_FILE = path.join(CONFIG_DIR, '.active');
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
  return files.filter(file => file !== '.active');
}

export async function setActiveAccount(accountName: string) {
  await ensureConfigDir();
  await fs.writeFile(ACTIVE_FILE, accountName, 'utf-8');
}

export async function getActiveAccount() {
  await ensureConfigDir();
  
  if (!fs.existsSync(ACTIVE_FILE)) {
    return null;
  }

  return await fs.readFile(ACTIVE_FILE, 'utf-8');
}
