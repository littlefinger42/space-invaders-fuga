
const fs = require('fs');

module.exports = class PatternFinder {
    constructor(args, mapArray) {
        if (typeof mapArray === 'undefined') throw new Error('Cannot call PatternFinder directly. Must use init()');
        this.bgChar = args[0];
        this.bgChar = args[1];
        this.map = mapArray;
    }
    static async init(args) {
        const mapArray = await this.getMapArray(args[2]);
        return new PatternFinder(args, mapArray)
    }
    static getMapArray(mapPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(mapPath, 'utf8', (err, map) => {
                if (err) {
                    remindSyntax();
                    return reject(err);
                }

                const mapCharacters = map.split(/\r?\n/).map(line => {
                    return line.split('');
                })

                return resolve(mapCharacters)
            });
        })
    }
}