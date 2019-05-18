//Donald Tang
//I pledge my honor I have abided by the Stevens Honor System.

const questionOne = function questionOne(arr) {
    //Return the sum of the squares of all numbers in the arrayn numbers
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += (arr[i] * arr[i]);
    }
    return sum;
}

const questionTwo = function questionTwo(num) {
    //Return the fibonnaci value of num 
    if (num <= 1) {
        return num;
    } 
    return questionTwo(num - 1) + questionTwo(num - 2);
}

const questionThree = function questionThree(text) {
    //Return the number of vowels in the string 'text'
    var numVowel = 0;
    var vowels = "aeiouAEIOU";
    
    for (var i = 0; i < text.length; i++) {
        if (vowels.indexOf(text[i]) !== -1) {
            numVowel += 1;
        } 
    }
    return numVowel;
}

const questionFour = function questionFour(num) {
    //Return the factorial of num
    if (num === 0) {
        return 1;
    }
    
    return num * questionFour(num - 1);
}

module.exports = {
    firstName: "Donald", 
    lastName: "Tang", 
    studentId: "10410463",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};