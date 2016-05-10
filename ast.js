// TODO:
// - create a written version of this like asciimath so that it can be easily entered
// - 

const tuple = {
    type: 'TUPLE',
    values: [],
};

const vector = {
    type: 'VECTOR',
    values: [],
    orientation: one_of('row', 'column'),
};


// func def vs. func call
// f(5)
// f(x) = expr
// a = (1, 2, -3) = 1i + 2j - 3k

const func_def = {
    type: 'FUNC_DEF',
    parameters: [],     // array of identifiers
};

const func_call = {
    type: 'FUNC_CALL',
    arguments: [],      // array of expressions
};

const power = {
    type: 'POWER',
    base: null,         // expr
    exponent: null,     // expr
};



