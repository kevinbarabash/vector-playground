const fs = require('fs');
const PEG = require("pegjs");


const code = fs.readFileSync('./grammar.peg', { encoding: 'utf-8' });

const parser = PEG.buildParser(code);

const tree = parser.parse('1 + 2 * (3.002^-2 - a^-(b*c)) - -.9/d + a/b*c/d');

console.log(JSON.stringify(tree, null, 4));

const tree2 = parser.parse('A = (a, b) - (-1, 0.3 * b)');

console.log(JSON.stringify(tree2, null, 4));

const tree3 = parser.parse('2x - 3xy = 7z - pq');

console.log(JSON.stringify(tree3, null, 4));
