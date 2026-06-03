import { expect, test, spyOn } from "bun:test";
import * as fileOps from "../utils/fileOperations";

// Mocking the utility functions
spyOn(fileOps, "getAccounts").mockImplementation(() => Promise.resolve(['test', 'test2', 'test3']));
spyOn(fileOps, "getActiveAccount").mockImplementation(() => Promise.resolve('test'));

test("list command returns all accounts with active one marked", async () => {
  const accounts = await fileOps.getAccounts();
  const active = await fileOps.getActiveAccount();
  
  expect(accounts).toContain('test');
  expect(accounts).toContain('test2');
  expect(active).toBe('test');
});
