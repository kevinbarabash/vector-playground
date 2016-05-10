const fs = require('fs');
const sweet = require('sweet.js');


const code = fs.readFileSync('test.sjs', { encoding: 'utf-8' });

const transformedCode = sweet.compile(code).code;

console.log(transformedCode);
