#!/usr/bin/env bun
import { Command } from 'commander';
import packageJson from './package.json' with { type: 'json' };
import { addCommand } from './src/commands/add';
import { listCommand } from './src/commands/list';

const program = new Command();

program
  .name('agys')
  .description('A CLI tool for managing antigravity-cli oauth tokens')
  .version(packageJson.version);

program.addCommand(addCommand);
program.addCommand(listCommand);

program.parse(process.argv);
