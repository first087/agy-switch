#!/usr/bin/env bun
import { Command } from 'commander';
import packageJson from './package.json' with { type: 'json' };

const program = new Command();

program
  .name('agys')
  .description('A CLI tool for managing antigravity-cli oauth tokens')
  .version(packageJson.version);

program.parse(process.argv);
