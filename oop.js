'use strict';

// Arrow function will not work for constructor - it does not have its own `this` keyword
// Only function declaration and expressions
const Person = function(firstName, birthYear) {
  // Instance properties - available for all objects that use Person to create new object
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Don't create methods in constructor functions - every object will have this function - could impact performance
  // Instead - use prototypes
  this.calcAgeTest = function() {
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

// Prototypes

// All the objects that are created through the Person constructor
// will inherit all the methods and properties that are defined on the prototype property
Person.prototype.calcAge = function() {
  // this is set to the object that is calling the function
  console.log(2023 - this.birthYear);
}

person1.calcAge();
person2.calcAge();

console.log(person1.__proto__); // prototype of person1
// The person1 object's prototype property is the same as the prototype property of the Person constructor function
console.log(person1.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(person1));
console.log(Person.prototype.isPrototypeOf(Person)); // false

/*
The `new` keyowrd sets the proto property on the object to the prototype property
of the constructor function. And so this is how JavaScript knows internally
that the Jonas object is connected to `Person.prototype`


*/
