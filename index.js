const chalk = require('chalk');
const chalkError = chalk.bold.red;
const chalkWarning = chalk.bold.yellow;
const chalkSuccess = chalk.bold.green;

const PatternFinder = require('./patternFinder.js');

const args = process.argv.slice(2)

if (checkArguements(args)) {
    PatternFinder.init(args[0], args[1]).then(PatternFinder => {
        const detectionResult = PatternFinder.detectShapes();
        if (detectionResult) {
            console.log(chalkSuccess('Pattern found!'));
            console.log(`Line: ${detectionResult.line} Character: ${detectionResult.char}`);
            return true;
        } else {
            return console.log(chalkError('No pattern found.'));
        }
    }).catch(err => {
        console.log(err);
        remindSyntax();
    });
} else {
    remindSyntax();
}

function remindSyntax() {
    console.warn(chalkWarning('Syntax "node index.js [IMAGE_PATH] [SHAPE_PATH]"'))
    return console.warn(chalkWarning('Example: "node index.js ./image.txt ./shape.txt"'));
}

function checkArguements(args) {
    if (args.length !== 2) return console.error(chalkError('ERROR: Must supply 2 arguments. Currently supplied %s'), args.length)
    return true;
}