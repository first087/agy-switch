import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const CONFIG_DIR = path.join(os.homedir(), '.agys');

export async function ensureConfigDir() {
  await fs.ensureDir(CONFIG_DIR);
}

export async function copyTokenToAccount(accountName: string, sourcePath: string) {
  const destPath = path.join(CONFIG_DIR, accountName);
  await fs.ensureDir(CONFIG_DIR);
  await fs.copy(sourcePath, destPath);
  return destPath;
}
