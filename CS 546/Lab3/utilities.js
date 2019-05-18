//Donald Tang
//Pledge: I pledge my honor I have abided by the Stevens Honor System.

module.exports = {

    deepEquality: function (obj1, obj2) {
    //This method check each field (at every level deep) in obj1 and obj2 for equality. It will return true if each field is equal, and false if not.
        if (typeof obj1 !== typeof obj2) {
            return false;
        }

        if (obj1 !== obj2) {
            return false;
        }

        return true;
    },

    uniqueElements: function (arr) {
    //This method will iterate throughout the array provided in arr and return how many unique elements are in the array.
        let count = 0;
        let uniq = 0;
        let charChecked = [];
        if (arr === undefined) {
            throw "Argument is not an array";
        }

        if (arr.length <= 0) {
            throw "Array is not of valid length";
        }

        for (let i = 0; i < arr.length; i++) {
            if (charChecked.indexOf(arr[i]) !== -1) {
                continue;
            } else {
                charChecked.push(arr[i]);
                count++;
            }
        }

        return count;
    },

    countOfEachCharacterInString: function (str) {
    //This method will traverse the string provided, str, and return an object. Each unique character in the array will be a key in the object, and the value will be how many times it appears in the string provided.
        let charArray = [];
        let strChecked = [];
        let count = 0;

        if (str === undefined || typeof str !== "string") {
            throw "Argument is not a string";
        }

        if (str.length <= 0) {
            throw "String is not of valid length";
        }

        for (let i = 0; i < str.length; i++) {
            if (strChecked.indexOf(str[i]) !== -1) {
                continue;
            } 
            for (let j = 0; j < str.length; j++) {
                if (str[i] == str[j]) {
                    count++;
                }
            }
            strChecked.push(str[i]);
            charArray.push(str[i] + ":" + count);
            count = 0;
        }

        return charArray;
    }
}