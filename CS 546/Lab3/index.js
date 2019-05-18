//Donald Tang
//Pledge: I pledge my honor I have abided by the Stevens Honor System.

const geometry = require("./geometry"),
    utilities = require("./utilities");

//geometry test cases

console.log("-----------------geometry test cases-----------------");

const g1test1 = geometry.volumeOfRectangularPrism(1,2,3);
console.log(g1test1);
const g1test2 = geometry.volumeOfRectangularPrism(2,3,4);
console.log(g1test2);
const g1test3 = geometry.volumeOfRectangularPrism(3,4,5);
console.log(g1test3);
const g1test4 = geometry.volumeOfRectangularPrism(8,2,3);
console.log(g1test4);
const g1test5 = geometry.volumeOfRectangularPrism(2,3,8);
console.log(g1test5);

console.log("-----------------");

const g2test1 = geometry.surfaceAreaOfRectangularPrism(8,1,2);
console.log(g2test1);
const g2test2 = geometry.surfaceAreaOfRectangularPrism(2,4,6);
console.log(g2test2);
const g2test3 = geometry.surfaceAreaOfRectangularPrism(1,2,3);
console.log(g2test3);
const g2test4 = geometry.surfaceAreaOfRectangularPrism(1,3,5);
console.log(g2test4);
const g2test5 = geometry.surfaceAreaOfRectangularPrism(2,5,8);
console.log(g2test5);

console.log("-----------------");

const g3test1 = geometry.volumeOfSphere(1);
console.log(g3test1);
const g3test2 = geometry.volumeOfSphere(2);
console.log(g3test2);
const g3test3 = geometry.volumeOfSphere(3);
console.log(g3test3);
const g3test4 = geometry.volumeOfSphere(5);
console.log(g3test4);
const g3test5 = geometry.volumeOfSphere(8);
console.log(g3test5);

console.log("-----------------");

const g4test1 = geometry.surfaceAreaOfSphere(3);
console.log(g4test1);
const g4test2 = geometry.surfaceAreaOfSphere(5);
console.log(g4test2);
const g4test3 = geometry.surfaceAreaOfSphere(7);
console.log(g4test3);
const g4test4 = geometry.surfaceAreaOfSphere(8);
console.log(g4test4);
const g4test5 = geometry.surfaceAreaOfSphere(88);
console.log(g4test5);

//utilities test cases
console.log("-----------------utilities test cases-----------------");

const u1test1 = utilities.deepEquality(1, 2);
console.log(u1test1);
const u1test2 = utilities.deepEquality(true, true);
console.log(u1test2);
const u1test3 = utilities.deepEquality(["h"], 'b');
console.log(u1test3);
const u1test4 = utilities.deepEquality(["D"], 8);
console.log(u1test4);
const u1test5 = utilities.deepEquality(888, 888);
console.log(u1test5);

console.log("-----------------");

const testArr1 = ["a", "a", "b", "a", "b", "c"];
console.log(utilities.uniqueElements(testArr1));
const testArr2 = ["1", "2", "2", "8", "3", "5"];
console.log(utilities.uniqueElements(testArr2));
const testArr3 = ["a", "b", "c", "d", "e", "j"];
console.log(utilities.uniqueElements(testArr3));
const testArr4 = ["8", "8", "8", "8", "8", "8"];
console.log(utilities.uniqueElements(testArr4));
const testArr5 = ["a", "1", "b", "2", "b", "3"];
console.log(utilities.uniqueElements(testArr5));

console.log("-----------------");

const testuniq1 = "Hello, the pie is in the oven";
const charMap1 = utilities.countOfEachCharacterInString(testuniq1); 
console.log(charMap1); 
const testuniq2 = "Hello";
const charMap2 = utilities.countOfEachCharacterInString(testuniq2); 
console.log(charMap2);
const testuniq3 = "I like to play basketball";
const charMap3 = utilities.countOfEachCharacterInString(testuniq3); 
console.log(charMap3);
const testuniq4 = "Technology is the way of the future";
const charMap4 = utilities.countOfEachCharacterInString(testuniq4); 
console.log(charMap4);
const testuniq5 = "Photography is fun";
const charMap5 = utilities.countOfEachCharacterInString(testuniq5); 
console.log(charMap5);

