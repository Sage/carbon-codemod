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
    const { force, dry } = program.opts();
    const name = command.name();

    if (!dry) {
      checkGitStatus(force);
    }
    let args = ["--verbose=2", "--ignore-pattern=**/node_modules/**"];

    if (dry) {
      args.push("--dry");
    }
    args.push("--transform", path.join(transformsDir, name, `${name}.js`));

    args.push(path.resolve(process.cwd(), target));

    Object.keys(options).forEach((key) => {
      const type = typeof options[key];

      if (type === "string") {
        args.push(`--${key}=${options[key]}`);
      } else {
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
    .option("--dry", "dry run (no changes are made to files)");

  program
    .command("button-destructive <target>")
    .description(
      "Convert destructive buttons to primary buttons with a destructive prop"
    )
    .action((target, command) => runTransform(target, command, program));

  program
    .command("deprecate-create <target>")
    .description("Convert create to dashed fullwidth button")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("dialog-full-screen-app-wrapper <target>")
    .description("Wrap children of DialogFullScreen in AppWrapper")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("message-remove-classic-theme <target>")
    .description("Remove classic theme props from the message component")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("replace-flash-with-toast <target>")
    .description("Replaces deprecated Flash component with Toast component")
    .action((target, command) => runTransform(target, command, program));

  program
    .command("tile-update-padding-prop <target>")
    .description(
      "Replace padding prop with p prop and change values on tile component"
    )
    .action((target, command) => runTransform(target, command, program));

  program
    .command("add-prop <target> <component> <prop> <value>")
    .description("adds a new prop and value to the specified component")
    .action((target, component, prop, value, command) =>
      runTransform(target, command, program, { component, prop, value })
    );

  program
    .command("rename-prop <target> <component> <old> <replacement>")
    .description(
      `
Codemod used for prop renaming
Usage
  npx carbon-codemod rename-prop <target> <component> <old> <replacement>

  target       Files or directory to transform
  component    Import path of component which prop should be renamed
  old          Old prop name
  replacement  New prop name

Example
  npx carbon-codemod rename-prop src carbon-react/lib/components/component oldProp newProp
    `
    )
    .action((target, component, old, replacement, command) =>
      runTransform(target, command, program, { component, old, replacement })
    );

  program
    .command("remove-prop <target> <component> <prop>")
    .description(
      `
Codemod used for prop removal
Usage
  npx carbon-codemod remove-prop <target> <component> <prop>

  target       Files or directory to transform
  component    Import path of component which prop should be removed
  prop         Prop to be removed

Example
  npx carbon-codemod remove-prop src carbon-react/lib/components/component prop
    `
    )
    .action((target, component, prop, command) =>
      runTransform(target, command, program, { component, prop })
    );

  program
    .command(
      "replace-prop-value <target> <component> <prop> <oldValue> <newValue>"
    )
    .description(
      `
Codemod used for prop value changing
Usage
  npx carbon-codemod replace-prop-value <target> <component> <prop> <oldValue> <newValue>

  target       Files or directory to transform
  component    Import path of component which prop should be renamed
  prop         Prop name
  oldValue     Prop value to change
  newValue     Value to change prop to

Example
  npx carbon-codemod replace-prop-value src carbon-react/lib/components/component prop oldValue newValue
    `
    )
    .action((target, component, attribute, oldValue, newValue, command) =>
      runTransform(target, command, program, {
        component,
        attribute,
        oldValue,
        newValue,
      })
    );

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
