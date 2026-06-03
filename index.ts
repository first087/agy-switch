#!/usr/bin/env bun
import { Command } from 'commander';
import packageJson from './package.json' with { type: 'json' };
import { addCommand } from './src/commands/add';
import { listCommand } from './src/commands/list';
import { switchCommand } from './src/commands/switch';

const program = new Command();

program
  .name('agys')
  .description('A CLI tool for managing antigravity-cli oauth tokens')
  .version(packageJson.version);

program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(switchCommand);

// Set default action if no command is provided
program.action(async () => {
  if (program.args.length === 0) {
    await switchCommand.parseAsync(['node', 'agys', 'switch']);
  }
});

program.parse(process.argv);
