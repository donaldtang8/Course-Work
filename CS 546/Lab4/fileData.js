//Donald Tang
//I pledge my honor I have abided by the Stevens Honor System.

const bluebird = require("bluebird");
const Promise = bluebird.Promise;

// We use bluebird to make a copy of fs
// that has all its normal methods, and
// {methodName}Async method versions that return
// promises as well; ie, you will have a copy
// of fs with fs.stat(path, callback) and
// fs.statAsync(path), which returns a promise
// thus allowing us to await it.
const fs = bluebird.promisifyAll(require("fs"));

module.exports = {

    getFileAsString: async function(path) {
        if (!path)
            throw "You must provide a path";
        
        const data = await fs.readFileAsync(path, "utf-8");
        return data;
    },

    getFileAsJson: async function(path) {
        if (!path) 
            throw "You must provide a path";
        
        const jsonData = await fs.readFileAsync(path, "utf-8");
        const jsonDataS = JSON.stringify(jsonData);
        const data = JSON.parse(jsonDataS);
        return data;
    },

    saveStringToFile: async function(path, text) {
        if (!path) 
            throw "You must provide a path";

        if (text.length <= 0) 
            throw "You must provide text";
        
        const writeData = await fs.writeFileAsync(path, text);
        return true;
    },

    saveJSONToFile: async function(path, obj) {
        if (!path)
            throw "You must provide a path";
        
        if (obj === null) 
            throw "You must provide an object";
        
        const jsonData = JSON.stringify(obj);
        const writeData = await fs.writeFileAsync(path, jsonData);
        return true;
    }
}
