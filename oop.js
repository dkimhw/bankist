'use strict';

// Arrow function will not work for constructor - it does not have its own `this` keyword
// Only function declaration and expressions
const Person = function(firstName, birthYear) {
  // Instance properties - available for all objects that use Person to create new object
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Don't create methods in constructor functions - every object will have this function - could impact performance
  // Instead - use prototypes
  this.calcAge = function() {
    console.log(2023 - this.birthYear);
  }
}

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {} from step 1
const person1 = new Person('David', '1990');
console.log(person1);

const person2 = new Person('Matilda', '1991');
console.log(person2);

console.log("returns true person1 is an instance of Person: ", person1 instanceof Person);
