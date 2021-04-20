let isGitCleanResult = true;
const execaSync = jest.fn((bin) => {
  if (bin === "git") {
    if (isGitCleanResult instanceof Error) {
      throw isGitCleanResult;
    }
    return { stdout: isGitCleanResult ? "" : "?? README.md" };
  } else {
    return {};
  }
});

jest.setMock("execa", {
  sync: execaSync,
});
const noop = () => {};
jest.spyOn(console, "log").mockImplementation(noop);
jest.spyOn(process, "exit").mockImplementation(noop);

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const Cli = require("../cli");
const packageJSON = require("../../package.json");

describe("run", () => {
  beforeAll(() => {
    isGitCleanResult = true;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays the version", () => {
    let spy = jest.spyOn(process.stdout, "write");
    spy.mockImplementation(noop);
    process.argv = [
      "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
      "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
      "--version",
    ];

    new Cli().run();

    expect(execaSync).not.toBeCalled();
    expect(process.stdout.write).toBeCalledWith(`${packageJSON.version}\n`);
    spy.mockRestore();
  });

  it("displays help if no arguments are passed", () => {
    process.argv = [
      "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
      "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
    ];

    const cli = new Cli();
    const program = cli.__program;
    jest.spyOn(program, "help").mockImplementation(noop);
    cli.run();

    expect(execaSync).not.toBeCalled();
    expect(program.help).toBeCalled();
  });

  it("forwards the --dry flag", () => {
    process.argv = [
      "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
      "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
      "button-destructive",
      "src",
      "--dry",
    ];

    new Cli().run();

    expect(console.log.mock.calls[0][0]).toContain("--dry");
    expect(execaSync.mock.calls[0][1]).toContain("--dry");
  });

  describe("git", () => {
    beforeEach(() => {
      process.argv = [
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
        "button-destructive",
        "src",
      ];
    });

    it("runs when git is clean", () => {
      isGitCleanResult = true;

      new Cli().run();

      expect(execaSync).toBeCalledTimes(2);
      expect(process.exit).not.toBeCalled();
    });

    it("runs when not a git repo", () => {
      isGitCleanResult = new Error("fake error");

      new Cli().run();

      expect(execaSync).toBeCalledTimes(2);
      expect(process.exit).not.toBeCalled();
    });

    it("exits when repo is dirty", () => {
      isGitCleanResult = false;

      new Cli().run();

      expect(console.log).toBeCalledWith(
        `${chalk.red(
          "Please stash or commit your changes before running a codemod"
        )}\n\nYou can use --force to skip this check.`
      );
      expect(process.exit).toBeCalled();
    });

    it("runs when git repo is dirty and forced", () => {
      process.argv = [
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
        "button-destructive",
        "src",
        "--force",
      ];
      isGitCleanResult = false;

      new Cli().run();

      expect(console.log).toBeCalledWith(
        chalk.yellow(
          "WARNING: There are uncommitted changes that may be overwritten"
        )
      );
      expect(execaSync).toHaveBeenCalledTimes(2);
      expect(process.exit).not.toBeCalled();
    });
  });

  describe("transforms", () => {
    beforeAll(() => {
      isGitCleanResult = true;
    });

    it("finds the transforms directory", () => {
      fs.lstatSync(Cli.__transformsDir);
    });

    it("finds the jscodeshift binary", () => {
      fs.lstatSync(Cli.__jsCodeShiftBin);
    });

    it("runs button-destructive", () => {
      process.argv = [
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
        "button-destructive",
        "src",
      ];

      new Cli().run();
      const args = [
        "--verbose=2",
        "--ignore-pattern=**/node_modules/**",
        "--transform",
        path.join(
          Cli.__transformsDir,
          "button-destructive",
          "button-destructive.js"
        ),
        path.join(process.cwd(), "src"),
      ];
      expect(console.log).toBeCalledWith(`jscodeshift ${args.join(" ")}`);
      expect(execaSync.mock.calls[1][0]).toEqual(Cli.__jsCodeShiftBin);
      expect(execaSync.mock.calls[1][1]).toEqual(args);
    });

    it("runs deprecate-create", () => {
      process.argv = [
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
        "deprecate-create",
        "src",
      ];

      new Cli().run();
      const args = [
        "--verbose=2",
        "--ignore-pattern=**/node_modules/**",
        "--transform",
        path.join(
          Cli.__transformsDir,
          "deprecate-create",
          "deprecate-create.js"
        ),
        path.join(process.cwd(), "src"),
      ];
      expect(console.log).toBeCalledWith(`jscodeshift ${args.join(" ")}`);
      expect(execaSync.mock.calls[1][0]).toEqual(Cli.__jsCodeShiftBin);
      expect(execaSync.mock.calls[1][1]).toEqual(args);
    });

    it("runs message-remove-classic-theme", () => {
      process.argv = [
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
        "message-remove-classic-theme",
        "src",
      ];

      new Cli().run();
      const args = [
        "--verbose=2",
        "--ignore-pattern=**/node_modules/**",
        "--transform",
        path.join(
          Cli.__transformsDir,
          "message-remove-classic-theme",
          "message-remove-classic-theme.js"
        ),
        path.join(process.cwd(), "src"),
      ];
      expect(console.log).toBeCalledWith(`jscodeshift ${args.join(" ")}`);
      expect(execaSync.mock.calls[1][0]).toEqual(Cli.__jsCodeShiftBin);
      expect(execaSync.mock.calls[1][1]).toEqual(args);
    });

    it("runs rename-prop", () => {
      process.argv = [
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
        "rename-prop",
        "src",
        "carbon-react/lib/components/button",
        "buttonType",
        "variant",
      ];

      new Cli().run();
      const args = [
        "--verbose=2",
        "--ignore-pattern=**/node_modules/**",
        "--transform",
        path.join(Cli.__transformsDir, "rename-prop", "rename-prop.js"),
        path.join(process.cwd(), "src"),
        "--importPath=carbon-react/lib/components/button",
        "--old=buttonType",
        "--replacement=variant",
      ];
      expect(console.log).toBeCalledWith(`jscodeshift ${args.join(" ")}`);
      expect(execaSync.mock.calls[1][0]).toEqual(Cli.__jsCodeShiftBin);
      expect(execaSync.mock.calls[1][1]).toEqual(args);
    });

    it("runs remove-prop", () => {
      process.argv = [
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/node",
        "/Users/guest/.nvm/versions/node/v10.16.3/bin/carbon-codemod",
        "remove-prop",
        "src",
        "carbon-react/lib/components/button",
        "buttonType",
      ];

      new Cli().run();
      const args = [
        "--verbose=2",
        "--ignore-pattern=**/node_modules/**",
        "--transform",
        path.join(Cli.__transformsDir, "remove-prop", "remove-prop.js"),
        path.join(process.cwd(), "src"),
        "--importPath=carbon-react/lib/components/button",
        "--prop=buttonType",
      ];
      expect(console.log).toBeCalledWith(`jscodeshift ${args.join(" ")}`);
      expect(execaSync.mock.calls[1][0]).toEqual(Cli.__jsCodeShiftBin);
      expect(execaSync.mock.calls[1][1]).toEqual(args);
    });
  });
});
