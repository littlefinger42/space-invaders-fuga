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
                return resolve(map.split(/\r?\n/))
            });
        })
    }
    detectShapes(shape) {
        var heightSearchLimit = this.map.length - shape.length + 1;

        for (var i = 0; i < heightSearchLimit; i++) {
            var j = 0;
            var regexp = new RegExp(shape[j])
            var match = this.map[i + j].match(regexp);
            var initialIndex = match ? match.index : undefined;

            
            while (match && initialIndex === match.index) {
                if (j + 1 === shape.length) return {
                    line: i,
                    char: match.index
                };
                j++
                regexp = new RegExp(shape[j]);
                match = this.map[i + j].match(regexp);
            }
        }
        return null;
    }
}