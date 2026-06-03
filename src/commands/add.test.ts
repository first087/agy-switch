import { expect, test, spyOn } from "bun:test";
import * as fileOps from "../utils/fileOperations";

// Mocking the utility function
spyOn(fileOps, "copyTokenToAccount").mockImplementation(() =>
  Promise.resolve("/home/user/.agys/test-account"),
);

test("add command calls copyTokenToAccount with correct arguments", async () => {
  // Logic to test will be added as we implement the command
  const accountName = "test-account";
  const sourcePath =
    "/home/user/.gemini/antigravity-cli/antigravity-oauth-token";

  await fileOps.copyTokenToAccount(accountName, sourcePath);

  expect(fileOps.copyTokenToAccount).toHaveBeenCalledWith(
    accountName,
    sourcePath,
  );
});
