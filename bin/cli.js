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
      stdio: ["ignore", "pipe", "ignore"]
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
const runTransform = (program, transformer, target) => {
  try {
    const { force, dry } = program.opts();
    if (!dry) {
      checkGitStatus(force);
    }
    let args = ["--verbose=2", "--ignore-pattern=**/node_modules/**"];

    if (dry) {
      args.push("--dry");
    }
    args.push(
      "--transform",
      path.join(transformsDir, transformer, `${transformer}.js`)
    );

    args.push(path.resolve(process.cwd(), target));

    console.log(`jscodeshift ${args.join(" ")}`);
    const result = execa.sync(jsCodeShiftBin, args, {
      stdio: "inherit",
      stripEof: false
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
    .command("button-destructive <target>")
    .description(
      "Convert destructive buttons to primary buttons with a destructive prop"
    )
    .action(runTransform.bind(undefined, program, "button-destructive"));

  program.on("command:*", function() {
    console.error(
      "Invalid command: %s\nSee --help for a list of available commands.",
      program.args.join(" ")
    );
    process.exit(1);
  });
  this.__program = program;
}

Cli.prototype.run = function() {
  if (process.argv.length === 2) {
    this.__program.help();
  } else {
    this.__program.parse(process.argv);
  }
};

Cli.__jsCodeShiftBin = jsCodeShiftBin;
Cli.__transformsDir = transformsDir;

module.exports = Cli;
