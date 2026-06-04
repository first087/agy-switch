import { expect, test, spyOn, describe } from "bun:test";
import * as fileOps from "../utils/fileOperations";

spyOn(fileOps, "getAccounts").mockImplementation(() => Promise.resolve(['test', 'test2']));
spyOn(fileOps, "getActiveAccount").mockImplementation(() => Promise.resolve('test'));
spyOn(fileOps, "deleteAccount").mockImplementation(async (name: string) => {
  if (name === 'test') throw new Error(`Cannot delete the active account: ${name}`);
  return Promise.resolve();
});

describe("deleteAccount logic", () => {
  test("deletes account successfully if not active", async () => {
    await expect(fileOps.deleteAccount('test2')).resolves.toBeUndefined();
  });

  test("throws error when trying to delete active account", async () => {
    await expect(fileOps.deleteAccount('test')).rejects.toThrow("Cannot delete the active account: test");
  });
});
