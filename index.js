const chalk = require('chalk');
const chalkError = chalk.bold.red;
const chalkWarning = chalk.bold.yellow;

const PatternFinder = require('./patternFinder.js');

const args = process.argv.slice(2)

if (checkArguements(args)) {
    PatternFinder.init(args).then(PatternFinder => console.log(PatternFinder));
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