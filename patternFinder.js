const fs = require('fs');

module.exports = class PatternFinder {
    constructor(mapArray, shapeArray) {
        if (typeof mapArray === 'undefined') throw new Error('Cannot call PatternFinder directly. Must use init()');
        this.map = mapArray;
        this.shape = shapeArray;
    }
    /**
     * Builds the pattern finder aftr waiting for async operations
     * @param {string} mapPath 
     * @param {string} shapePath 
     * @returns {PatternFinder}
     */
    static async init(mapPath, shapePath) {
        const mapArray = await this.getArrayFromTxt(mapPath);
        const shapeArray = await this.getArrayFromTxt(shapePath);
        return new PatternFinder(mapArray, shapeArray)
    }
    /**
     * Helper function which retrieves array from 
     * @param {string} mapPath 
     * @returns {Array.<string>|Object}
     */
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
    /**
     * @returns {Object.<string>}
     */
    detectShapes() {
        const heightSearchLimit = this.map.length - this.shape.length + 1;

        for (let i = 0; i < heightSearchLimit; i++) {
            let j = 0;
            let regexp = new RegExp(this.shape[j])
            let match = this.map[i + j].match(regexp);
            const initialIndex = match ? match.index : undefined;

            
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