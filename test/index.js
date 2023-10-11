const stickyModule = require('../cjs');

const myName = '@namespace/module';
const myModule = () => ({ value: Math.random() });

let [{ value }, known] = stickyModule(myName, myModule());
console.assert(known === false, 'it was not known');

let anotherOne = stickyModule(myName, myModule());

console.assert(anotherOne[0].value === value, 'it returned the previous module');
console.assert(anotherOne[1] === true, 'it was known');

const myGlobal = {};

[{ value }, known] = stickyModule(myName, myModule(), myGlobal);
console.assert(known === false, 'it was not known in a custom global');

anotherOne = stickyModule(myName, myModule(), myGlobal);

console.assert(anotherOne[0].value === value, 'it returned the previous module in a custom global');
console.assert(anotherOne[1] === true, 'it was known in a custom global');
