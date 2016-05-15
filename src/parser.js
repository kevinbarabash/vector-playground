const PEG = require('pegjs');
const grammar = require('raw!./grammar.peg');
const plugin = require('babel-plugin-operator-overloading');
const operator = require('define-operator').operator;

const parser = PEG.buildParser(grammar);

const tree = parser.parse('1 + 2 * (3.002^-2 - a^-(b*c)) - -.9/d + a/b*c/d');

console.log(JSON.stringify(tree, null, 4));

const tree2 = parser.parse('A = (a, b) - (-1, 0.3 * b)');

console.log(JSON.stringify(tree2, null, 4));

const tree3 = parser.parse('2x - 3xy = 7z - pq');

console.log(JSON.stringify(tree3, null, 4));


const canvas = document.createElement('canvas');
canvas.width = 1024;
canvas.height = 768;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const lines = [
    parser.parse('a = (1,2)'),
    parser.parse('b = (5,8)'),
    parser.parse('c = b + a')
];

console.log(lines);

const objects = {};

// TODO create a tuples object with overloaded operators
class Tuple {
    constructor(...values) {
        this.values = values;
    }

    @operator('+')
    plus(other) {
        const values = [];

        if (other.values.length > this.values.length) {
            let i = 0;

            for ( ; i < this.values.length; i++) {
                values[i] = this.values[i] + other.values[i];
            }

            for ( ; i < other.values.length; i++) {
                values[i] = other.values.length;
            }
        } else {
            let i = 0;

            for ( ; i < other.values.length; i++) {
                values[i] = this.values[i] + other.values[i];
            }

            for ( ; i < this.values.length; i++) {
                values[i] = this.values.length;
            }
        }

        return new Tuple(...values);
    }

    toString() {
        return `(${this.values.join(', ')})`;
    }
}

const codegen = (node) => {
    if (node.type === 'TUPLE') {
        return `new Tuple(${node.values.map(codegen).join(', ')})`;
    } else if (node.type === 'NUMBER') {
        return node.value;
    } else if (node.type === 'OPERATOR') {
        return node.operator;
    } else if (node.type === 'IDENTIFIER') {
        return `context.${node.name}`;
    } else if (node.type === 'EQUATION') {
        return `${codegen(node.left)} = ${codegen(node.right)}`;
    } else if (node.type === 'EXPRESSION') {
        return node.children.map(codegen).join(' ');
    }
};

// TODO: generate JavaScript code from the math and just run that

const code = lines.reduce((code, line) => {
    return code + codegen(line) + '\n';
}, '');

const context = {};

console.log(code);

const transformedCode = babel.transform('"use overloading";\n' + code, {
    plugins: [plugin.default],
    sourceMaps: false,
}).code;

console.log(transformedCode);

// TODO: use 'require' pattern
const fn = Function('context', 'Tuple', transformedCode);

fn(context, Tuple);

console.log(context);
