const chalk = require('chalk');
const chalkError = chalk.bold.red;
const chalkWarning = chalk.bold.yellow;

const PatternFinder = require('./patternFinder.js');

const args = process.argv.slice(2)

const shape = [
    "---oo---",
    "--oooo--",
    "-oooooo-",
    "oo-oo-oo",
    "oooooooo",
    "--o--o--",
    "-o-oo-o-",
    "o-o--o-o"
]

const shape2 = [
    "--o-----o--",
    "---o---o---",
    "--ooooooo--",
    "-oo-ooo-oo-",
    "ooooooooooo",
    "o-ooooooo-o",
    "o-o-----o-o",
    "---oo-oo---"
]

if (checkArguements(args)) {
    PatternFinder.init(args).then(PatternFinder => PatternFinder.detectShapes(shape2));
} else {
    return remindSyntax();
}

function remindSyntax() {
    console.warn(chalkWarning('Syntax "node index.js [BG_CHAR] [FG_CHAR] [PATH]"'))
    console.warn(chalkWarning('Example: "node index.js - 0 ./image.txt"'))
}

function checkArguements(args) {
    if (args.length !== 3) return console.error(chalkError('ERROR: Must supply 3 arguments. Currently supplied %s'), args.length)
    if (args[0].length !== 1) return console.error(chalkError('Error: First arguement must be 1 character. Currently supplied %s'), args[0])
    if (args[1].length !== 1) return console.error(chalkError('Error: Second arguement must be 1 character. Currently supplied %s'), args[1])
    return true;
}