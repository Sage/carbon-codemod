jest.autoMockOff();
const path = require("path");
const fs = require("fs");
const runInlineTest = require("jscodeshift/dist/testUtils").runInlineTest;
export default function defineTest(
  dirName,
  transformName,
  options,
  testFilePrefix,
  testOptions = {}
) {
  testFilePrefix = Array.isArray(testFilePrefix)
    ? path.join(...testFilePrefix)
    : testFilePrefix;
  const fixtureDir = path.join(dirName, "..", "__testfixtures__");
  const fileExtension = testOptions.parser || "js";
  const inputPath = path.join(
    fixtureDir,
    testFilePrefix + `.input.` + fileExtension
  );
  const outputPath = path.join(
    fixtureDir,
    testFilePrefix + `.output.` + fileExtension
  );
  const source = fs.readFileSync(inputPath, "utf8");
  const expectedOutput = fs.readFileSync(outputPath, "utf8");
  const transform = require(path.join(dirName, "..", transformName));

  describe(transformName, () => {
    describe(testFilePrefix, () => {
      it("transforms correctly", () => {
        runInlineTest(
          transform,
          options,
          {
            path: inputPath,
            source,
          },
          expectedOutput,
          testOptions
        );
      });

      it("is idempotent", () => {
        runInlineTest(
          transform,
          options,
          {
            path: outputPath,
            source: expectedOutput,
          },
          "",
          testOptions
        );
      });
    });
  });
}
