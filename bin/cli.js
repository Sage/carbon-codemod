const path = require("path");
const chalk = require("chalk");
const commander = require("commander");
const execa = require("execa");
const jsCodeShiftBin = require.resolve(".bin/jscodeshift");
const packageJSON = require("../package.json");

const checkGitStatus = (force = false) => {
  let clean;
  try {
    let { stdout } = execa.sync("git", ["status", "--porcelain"], {
      stdio: ["ignore", "pipe", "ignore"],
    });
    clean = stdout.toString().trim() === "";
  } catch (e) {
    clean = true;
  }

  if (clean) {
    return;
  }

  if (force) {
    console.log(
      chalk.yellow(
        "WARNING: There are uncommitted changes that may be overwritten"
      )
    );
    return;
  }
  throw new Error(
    `${chalk.red(
      "Please stash or commit your changes before running a codemod"
    )}\n\nYou can use --force to skip this check.`
  );
};

const transformsDir = path.resolve(__dirname, "../", "transforms");

const runTransform = (target, command, program, options = {}) => {
  try {
    const { force, dry, typescript } = program.opts();
    const name = command.name();

    if (!dry) {
      checkGitStatus(force);
    }
    let args = ["--verbose=2", "--ignore-pattern=**/node_modules/**"];

    if (dry) {
      args.push("--dry");
    }

    if (typescript) {
      args.push("--parser=tsx");
      args.push("--extensions=tsx,ts,jsx,js");
    } else {
      args.push("--extensions=jsx,js");
    }


    args.push("--transform", path.join(transformsDir, name, `${name}.js`));

    args.push(path.resolve(process.cwd(), target));

    Object.keys(options).forEach((key) => {
      const type = typeof options[key];
      if (type === "string") {
        args.push(`--${key}=${options[key]}`);
      } else if (type !== "undefined") {
        console.error(
          `Unable to use argument ${key}, ${type} arguments are not supported yet.`
        );
        process.exit(1);
      }
    });

    console.log(`jscodeshift ${args.join(" ")}`);
    const result = execa.sync(jsCodeShiftBin, args, {
      stdio: "inherit",
      stripEof: false,
    });

    if (result.error) {
      throw result.error;
    }
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

function Cli() {
  const program = new commander.Command();


  program
    .version(packageJSON.version)
    .option("--force", "skip safety checks")
    .option("--dry", "dry run (no changes are made to files)")
    .option("-ts, --typescript", "convert TypeScript code");

  program
    .command("button-destructive <target>")
    .description(
      "Convert destructive buttons to primary buttons with a destructive prop"
    )
    .description("TypeScript conversion not yet supported")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("move-experimental-components <target>")
    .description("Replace experimental component paths with new ones")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("deprecate-create <target>")
    .description("Convert create to dashed fullwidth button")
    .description("TypeScript conversion not yet supported")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("dialog-full-screen-app-wrapper <target>")
    .description("Wrap children of DialogFullScreen in AppWrapper")
    .description("TypeScript conversion not yet supported")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("message-remove-classic-theme <target>")
    .description("Remove classic theme props from the message component")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("replace-flash-with-toast <target>")
    .description("Replaces deprecated Flash component with Toast component")
    .description("TypeScript conversion not yet supported")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("replace-row-column-with-grid <target>")
    .description("Replaces deprecated Row and Column components with Grid component")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("tile-update-padding-prop <target>")
    .description(
      "Replace padding prop with p prop and change values on tile component"
    )
    .description("TypeScript conversion not yet supported")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("add-prop <target> <import-path> <prop> <value>")
    .option("-i, --import-name <import-name>", "component named import name")
    .description("adds a new prop and value to the specified component")
    .description(
      `
Codemod used for adding a new prop
Usage
  npx carbon-codemod add-prop <target> <import-path> <prop> <value>

  target       Files or directory to transform
  import-path  Import path of component
  prop         Prop name
  value        Prop value

Options
  --import-name:  Component named import name

Example
  default import:  npx carbon-codemod add-prop src carbon-react/lib/component propName propValue
  named import:    npx carbon-codemod add-prop src carbon-react/lib/component propName propValue -i Component
    `
    )
    .description("TypeScript conversion not yet supported")
    .action((target, importPath, prop, value, command) => {
      const { importName } = command;
      runTransform(target, command, program, {
        importPath,
        prop,
        value,
        importName,
      });
    });

  program
    .command("rename-prop <target> <import-path> <old> <replacement>")
    .option("-i, --import-name <import-name>", "component named import name")
    .description(
      `
Codemod used for prop renaming
Usage
  npx carbon-codemod rename-prop <target> <import-path> <old> <replacement>

  target       Files or directory to transform
  import-path  Import path of component which prop should be renamed
  old          Old prop name
  replacement  New prop name

Options
  --import-name:  Component named import name

Example
  default import:  npx carbon-codemod rename-prop src carbon-react/lib/component oldProp newProp
  named import:    npx carbon-codemod rename-prop src carbon-react/lib/component oldProp newProp -i Component
    `
    )
    .action((target, importPath, old, replacement, command) => {
      const { importName } = command;
      runTransform(target, command, program, {
        importPath,
        old,
        replacement,
        importName,
      });
    });

  program
    .command("remove-prop <target> <import-path> <prop>")
    .option("-i, --import-name <import-name>", "component named import name")
    .description(
      `
Codemod used for prop removal
Usage
  npx carbon-codemod remove-prop <target> <import-path> <prop>

  target       Files or directory to transform
  import-path  Import path of component which prop should be removed
  prop         Prop to be removed

Options
  --import-name:  Component named import name

Example
  default import:  npx carbon-codemod remove-prop src carbon-react/lib/component prop
  named import:    npx carbon-codemod remove-prop src carbon-react/lib/component prop -i Component
    `
    )
    .action((target, importPath, prop, command) => {
      const { importName } = command;
      runTransform(target, command, program, { importPath, prop, importName });
    });

  program
    .command(
      "replace-prop-value <target> <import-path> <prop> <oldValue> <newValue>"
    )
    .option("-i, --import-name <import-name>", "component named import name")
    .description(
      `
Codemod used for prop value changing
Usage
  npx carbon-codemod replace-prop-value <target> <import-path> <prop> <oldValue> <newValue>

  target       Files or directory to transform
  import-path  Import path of component which prop should be renamed
  prop         Prop name
  oldValue     Prop value to change
  newValue     Value to change prop to

Options
  --import-name:  Component named import name

Example
  default import:  npx carbon-codemod replace-prop-value src carbon-react/lib/component prop oldValue newValue
  named import:    npx carbon-codemod replace-prop-value src carbon-react/lib/component prop oldValue newValue -i Component
    `
    )
    .description("TypeScript conversion not yet supported")
    .action((target, importPath, attribute, oldValue, newValue, command) => {
      const { importName } = command;

      runTransform(target, command, program, {
        importPath,
        attribute,
        oldValue,
        newValue,
        importName,
      });
    });

  program
    .command("replace-collapsible-pod-with-accordion <target>")
    .description(
      "replaces deprecated collapse Pod prop with the Accordion Component"
    )
    .description("TypeScript conversion not yet supported")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("move-pod-description-to-content <target>")
    .description(
      "removes deprecated description Pod prop and places it's value as part of the Pod content"
    )
    .description("TypeScript conversion not yet supported")
    .action((target, command) => runTransform(target, command, program));

  program.on("command:*", function () {
    console.error(
      "Invalid command: %s\nSee --help for a list of available commands.",
      program.args.join(" ")
    );
    process.exit(1);
  });
  this.__program = program;
}

Cli.prototype.run = function () {
  if (process.argv.length === 2) {
    this.__program.help();
  } else {
    this.__program.parse(process.argv);
  }
};

Cli.__jsCodeShiftBin = jsCodeShiftBin;
Cli.__transformsDir = transformsDir;

module.exports = Cli;
