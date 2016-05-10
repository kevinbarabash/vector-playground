const fs = require('fs');
const PEG = require("pegjs");


const code = fs.readFileSync('./grammar.peg', { encoding: 'utf-8' });

const parser = PEG.buildParser(code);

const tree = parser.parse('1 + 2 * (3.002^-2 - a^-(b*c)) - -.9');

console.log(JSON.stringify(tree, null, 4));
