const fs = require('fs');

module.exports = class PatternFinder {
    constructor(mapArray, shapeArray) {
        if (typeof mapArray === 'undefined') throw new Error('Cannot call PatternFinder directly. Must use init()');
        this.map = mapArray;
        this.shape = shapeArray;
    }
    static async init(mapPath, shapePath) {
        const mapArray = await this.getArrayFromTxt(mapPath);
        const shapeArray = await this.getArrayFromTxt(shapePath);
        return new PatternFinder(mapArray, shapeArray)
    }
    static getArrayFromTxt(mapPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(mapPath, 'utf8', (err, map) => {
                if (err) {
                    return reject(err);
                }
                return resolve(map.split(/\r?\n/))
            });
        })
    }
    detectShapes() {
        var heightSearchLimit = this.map.length - this.shape.length + 1;

        for (var i = 0; i < heightSearchLimit; i++) {
            var j = 0;
            var regexp = new RegExp(this.shape[j])
            var match = this.map[i + j].match(regexp);
            var initialIndex = match ? match.index : undefined;

            
            while (match && initialIndex === match.index) {
                if (j + 1 === this.shape.length) return {
                    line: i,
                    char: match.index
                };
                j++
                regexp = new RegExp(this.shape[j]);
                match = this.map[i + j].match(regexp);
            }
        }
        return null;
    }
}