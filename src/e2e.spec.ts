import { expect, test, describe } from "bun:test";
import packageJson from "../package.json" with { type: "json" };

async function runCli(args: string[]) {
  const proc = Bun.spawn(["bun", "run", "index.ts", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });

  await proc.exited;

  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  return { stdout, stderr, exitCode: proc.exitCode };
}

describe("Global functionality", () => {
  test("shows help on --help", async () => {
    const { exitCode } = await runCli(["--help"]);
    expect(exitCode).toBe(0);
  });

  test("shows help on -h", async () => {
    const { exitCode } = await runCli(["-h"]);
    expect(exitCode).toBe(0);
  });

  test("shows version on --version", async () => {
    const { stdout, exitCode } = await runCli(["--version"]);
    expect(stdout.trim()).toBe(packageJson.version);
    expect(exitCode).toBe(0);
  });

  test("shows version on -v", async () => {
    const { stdout, exitCode } = await runCli(["-v"]);
    expect(stdout.trim()).toBe(packageJson.version);
    expect(exitCode).toBe(0);
  });

  test("shows help on unknown command", async () => {
    const { exitCode, stdout, stderr } = await runCli(["x"]);
    expect(exitCode).toBe(1);
    expect(stdout + stderr).toContain("Usage:");
  });

  test("shows help on unknown option", async () => {
    const { exitCode, stdout, stderr } = await runCli(["-x"]);
    expect(exitCode).toBe(1);
    expect(stdout + stderr).toContain("Usage:");
  });
});

describe("add command", () => {
  test("shows help when no argument provided", async () => {
    const { exitCode, stdout, stderr } = await runCli(["add"]);
    expect(exitCode).toBe(0);
    expect(stdout + stderr).toContain("Usage:");
  });

  test("adds account successfully", async () => {
    const { exitCode } = await runCli(["add", "test"]);
    expect(exitCode).toBe(0);
  });

  test("shows help on too many arguments", async () => {
    const { exitCode, stdout, stderr } = await runCli(["add", "test", "x"]);
    expect(exitCode).toBe(1);
    expect(stdout + stderr).toContain("Usage:");
  });
});

describe("list command", () => {
  test("lists accounts successfully using list command", async () => {
    const { exitCode } = await runCli(["list"]);
    expect(exitCode).toBe(0);
  });

  test("lists accounts successfully using ls alias", async () => {
    const { exitCode } = await runCli(["ls"]);
    expect(exitCode).toBe(0);
  });

  test("shows help on too many arguments for list", async () => {
    const { exitCode, stdout, stderr } = await runCli(["list", "x"]);
    expect(exitCode).toBe(1);
    expect(stdout + stderr).toContain("Usage:");
  });

  test("shows help on too many arguments for ls", async () => {
    const { exitCode, stdout, stderr } = await runCli(["ls", "x"]);
    expect(exitCode).toBe(1);
    expect(stdout + stderr).toContain("Usage:");
  });
});

describe("switch command", () => {
  test("shows help on too many arguments", async () => {
    const { exitCode, stdout, stderr } = await runCli(["switch", "x"]);
    expect(exitCode).toBe(1);
    expect(stdout + stderr).toContain("Usage:");
  });
});
