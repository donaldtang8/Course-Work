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
    
    simplify: function(text) {
        let convertedString;
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        let whiteSpace = [' ', '\t', '\n'];
        let strBuilder = [];
        let strArray = [];
        let tmpStr = "";
        let j = 0;

        if (text.length <= 0) 
            throw "You must provide text";
        
        convertedString = text.toLowerCase();
        //convert to array, easier to remove
        for (let i = 0; i < convertedString.length; i++) {
            strArray.push(convertedString.charAt(i));
        }
        
        //remove non letter or non white space
        for (let i = 0; i < strArray.length; i++) {
            //it is not a letter
            if ((letters.indexOf(strArray[i]) == -1) && (strArray[i].indexOf("\n") == -1) && (strArray[i].indexOf("\t") == -1) && (strArray[i].indexOf(" ") == -1)) {
                continue;
            } else {
                strBuilder.push(strArray[i]);
            }
        }
         //trim whitespace off front/back of text
        for(let a = 0; a < strBuilder.length; a++) {
            tmpStr = tmpStr + strBuilder[a];
        }
        tmpStr = tmpStr.trim();
        //check for duplicate spaces
        let tmpArr1 = [];
        let tmpArr2 = [];
        //replace newline and tab characters with spaces
        for (let i = 0; i < tmpStr.length; i++) {
            if (tmpStr[i] == '\n' || tmpStr[i] == '\t') {
                tmpArr1.push(" ");
            } else {
                tmpArr1.push(tmpStr.charAt(i));
            }
        }
        for (let i = 0; i < tmpArr1.length; i++) {
            if ((tmpArr1[i] == ' ') && tmpArr1[i+1] == ' ') {
                continue;
            }
            tmpArr2.push(tmpArr1[i]);
        }
        //clean up final string
        let tmpResult = tmpArr2.join();
        let result = "";
        for (let i = 0; i < tmpResult.length; i++) {
            if (tmpResult.charAt(i) == ',') {
                continue;
            }
            result = result + tmpResult.charAt(i);
        }
        return result;
    },

    createMetrics: function(text) {
        let totalLetters = 0;
        let totalWords = 1;
        let uniqueWords = 0;
        let longWords = 0;
        let averageWordLength = 0;
        let wordOccurrences = {};
        let letters = "abcdefghijklmnopqrstuvwxyz";
        let newStr = module.exports.simplify(text);
        let words = [];

        //check number of letters
        for (let i = 0; i < newStr.length; i++) {
            if(letters.indexOf(newStr.charAt(i)) > 0) {
                totalLetters++;
            }
        }
        //check number of words
        let index = 0;
        for (let j = 0; j < newStr.length; j++) {
            if (newStr.charAt(j) == ' ') {
                totalWords++;
                words.push(newStr.substring(index, j));
                index = j+1;
            }
        }
        words.push(newStr.substring(index, newStr.length));

        //check number of uniquewords
        for (let k = 0; k < words.length; k++) {
            let checkWord = words[k];
            for (let l = 0; l < words.length; l++) {
                //if words are the same, do nothing and continue
                if (checkWord === words[l]) {
                    continue;
                }
            }
            //if there are no words of equal value, increase counter of unique words
            uniqueWords++;
        }
        //check number of longwWords
        for (let m = 0; m < words.length; m++) {
            if (words[m].length >= 6) {
                longWords++;
            }
        }
        //calculate average length of words
        averageWordLength = totalLetters / totalWords;
        //calculate number of word occurrences
        let tempStr;
        let strCount = 0;
        for (let n = 0; n < words.length; n++) {
            for (let p = 0; p < words.length; p++) {
                tempStr = words[n];
                if (tempStr === words[p]) {
                    strCount++;
                }
            }
            wordOccurrences[tempStr] = strCount;
            strCount = 0;
        }
        //let dict = JSON.stringify(wordOccurrences);
        //print results
        let result = ["totalLetters:" +  totalLetters, "totalWords: " + totalWords, "uniqueWords: " + uniqueWords, "longWords: " + longWords, 
                    "averageWordLength: " + averageWordLength, "wordOccurrences: " + Object.entries(wordOccurrences)];
        return result;
    }
}