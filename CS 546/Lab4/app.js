//Donald Tang
//I pledge my honor I have abided by the Stevens Honor System.

const fd = require("./fileData");
const metrics = require("./textMetrics");
const path = require("path");
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

function fileExists(file){
    const res = fs.existsSync(file) 
    return res;
    
}

async function operation(path) {
    if (!path) {
        throw "You must provide a file to perform the operation on";
    }

    try {
        //build path string
        let tmpStr = path;
        let index = tmpStr.search(".txt");
        let newStr = tmpStr.substring(0, index);
        let file = newStr + ".result.json";
        //check if file exists
        let result = await fileExists(file);
        //if yes, read from file and print result, else, simplify text, save, get metrics, save, and print metrics
        if (result == true) {
            const jsonData = await fs.readFileAsync(file, "utf-8");
            const jsonDataS = JSON.stringify(jsonData);
            const data = JSON.parse(jsonDataS);
            return data;
        } else {
            const fStr = await fd.getFileAsString(path);
            let simpText = metrics.simplify(fStr);
            fd.saveStringToFile(newStr + ".debug.txt", simpText);
            let stats = metrics.createMetrics(simpText);
            fd.saveJSONToFile(newStr + ".result.json", stats);
            return stats;
        }
        
    }
    catch (error) {
        console.error(error);
    }
}

async function main() {
    try {
        const chap1 = await operation("chapter1.txt");
        console.log(chap1);
    }
    catch(error) {
        console.error(error);
    }

    try {
        const chap2 = await operation("chapter2.txt");
        console.log(chap2);
    }
    catch(error) {
        console.error(error);
    }

    try {
        const chap3 = await operation("chapter3.txt");
        console.log(chap3);
    }
    catch(error) {
        console.error(error);
    }
}

main();