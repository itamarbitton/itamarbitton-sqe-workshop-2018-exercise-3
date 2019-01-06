import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {generateGraph} from '../src/js/graphGen.js';
import {visualizeGraph} from '../src/js/CFG-Painter';
import * as esgraph from 'esgraph/lib';

function fromCodeToGraph(codeStr, argumentsInStrArr){
    let parsedCode = parseCode(codeStr);
    let controlFlowGraph = esgraph(parsedCode['body'][0]['body']);
    visualizeGraph(controlFlowGraph, argumentsInStrArr);
    return generateGraph(controlFlowGraph);
}


let test1 = 'function minValue(x,y){\n' +
    'if(x>y)\n' +
    'return -1;\n' +
    'if(y>x)\n' +
    'return 1;\n' +
    'else\n' +
    'return 0;\n' +
    '}';
let test1ArgumentsStrArray = ['let x = 2;','let y = 10;'];
let test1Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x > y", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="return -1", xlabel=1, shape=rectangle]\n' +
    ' n2 [label="y > x", xlabel=2, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n3 [label="return 1", xlabel=3, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n4 [label="return 0", xlabel=4, shape=rectangle]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n0 -> n2 [label="false"]\n' +
    ' n2 -> n3 [label="true"]\n' +
    ' n2 -> n4 [label="false"]\n' +
    ' }';

let test2 = 'function arrWithWhile(x,y){\n' +
    'if(x[0] < y){\n' +
    'while(x[0] < y)\n' +
    'x[0] = x[0] + 1;\n' +
    'return x[2];\n' +
    '}\n' +
    'else{\n' +
    'return false;\n' +
    '}\n' +
    '}';
let test2ArgumentsStrArray = ['let x = [1,2,3];','let y = 10;'];
let test2Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x[0] < y", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="x[0] < y", xlabel=1, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n2 [label="x[0] = x[0] + 1", xlabel=2, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n3 [label="return x[2]", xlabel=3, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n4 [label="return false", xlabel=4, shape=rectangle]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n0 -> n4 [label="false"]\n' +
    ' n1 -> n2 [label="true"]\n' +
    ' n1 -> n3 [label="false"]\n' +
    ' n2 -> n1 []\n' +
    ' }';

let test3 = 'function goo(){\n' +
    'let x = 1;\n' +
    'let y = 2;\n' +
    'return x + y;\n' +
    '}\n';
let test3ArgumentsStrArray = [];
let test3Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="let x = 1\n' +
    'let y = 2\n' +
    'return x + y", xlabel=0, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' }';
let test4 = 'function goo(x,y){\n' +
    'if(x === 0)\n' +
    'return 1;\n' +
    'else\n' +
    'return y/x;\n' +
    '}\n';
let test4ArgumentsStrArray = ['let x = 0;','let y = 10;'];
let test4Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x === 0", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="return 1", xlabel=1, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n2 [label="return y / x", xlabel=2, shape=rectangle]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n0 -> n2 [label="false"]\n' +
    ' }';
let test5 = 'function goo(x,y){\n' +
    'if(x === 0)\n' +
    'return 1;\n' +
    'else\n' +
    'return y/x;\n' +
    '}\n';
let test5ArgumentsStrArray = ['let x = 2;','let y = 10;'];
let test5Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x === 0", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="return 1", xlabel=1, shape=rectangle]\n' +
    ' n2 [label="return y / x", xlabel=2, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n0 -> n2 [label="false"]\n' +
    ' }';
let test6 = 'function goo(x,y){\n' +
    'while(x < y){\n' +
    'if(x < y)\n' +
    'x = x + 1;\n' +
    'if(y > x)\n' +
    'y = y/2;\n' +
    '}\n' +
    'return x;\n' +
    '}\n';
let test6ArgumentsStrArray = ['let x = 10;','let y = 90;'];
let test6Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x < y", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="x < y", xlabel=1, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n2 [label="x = x + 1", xlabel=2, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n3 [label="y > x", xlabel=3, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n4 [label="y = y / 2", xlabel=4, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n5 [label="return x", xlabel=5, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n0 -> n5 [label="false"]\n' +
    ' n1 -> n2 [label="true"]\n' +
    ' n1 -> n3 [label="false"]\n' +
    ' n2 -> n3 []\n' +
    ' n3 -> n4 [label="true"]\n' +
    ' n3 -> n0 [label="false"]\n' +
    ' n4 -> n0 []\n' +
    ' }';
let test7 = 'function goo(x){\n' +
    'if(x > 10){\n' +
    'while(x > 0)\n' +
    'x = x - 1;\n' +
    '}\n' +
    'return x;\n' +
    '}\n';
let test7ArgumentsStrArray = ['let x = 100;'];
let test7Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x > 10", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="x > 0", xlabel=1, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n2 [label="x = x - 1", xlabel=2, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n3 [label="return x", xlabel=3, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n0 -> n3 [label="false"]\n' +
    ' n1 -> n2 [label="true"]\n' +
    ' n1 -> n3 [label="false"]\n' +
    ' n2 -> n1 []\n' +
    ' }';
let test8 = 'function goo(x){\n' +
    'if(x > 10){\n' +
    'if(x > 15){\n' +
    'return x;\n' +
    '}\n' +
    'else{\n' +
    'return -1;\n' +
    '}\n' +
    '}\n' +
    '}\n';
let test8ArgumentsStrArray = ['let x = 12;'];
let test8Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x > 10", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="x > 15", xlabel=1, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n2 [label="return x", xlabel=2, shape=rectangle]\n' +
    ' n3 [label="return -1", xlabel=3, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n1 -> n2 [label="true"]\n' +
    ' n1 -> n3 [label="false"]\n' +
    ' }';
let test9 = 'function goo(x){\n' +
    'if(x > 10){\n' +
    'if(x > 15){\n' +
    'return x;\n' +
    '}\n' +
    'else if(x < 12){\n' +
    'return -1;\n' +
    '}\n' +
    'else\n' +
    'return 0;\n' +
    '}\n' +
    '}';
let test9ArgumentsStrArray = ['let x = 12;'];
let test9Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x > 10", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="x > 15", xlabel=1, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n2 [label="return x", xlabel=2, shape=rectangle]\n' +
    ' n3 [label="x < 12", xlabel=3, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n4 [label="return -1", xlabel=4, shape=rectangle]\n' +
    ' n5 [label="return 0", xlabel=5, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n1 -> n2 [label="true"]\n' +
    ' n1 -> n3 [label="false"]\n' +
    ' n3 -> n4 [label="true"]\n' +
    ' n3 -> n5 [label="false"]\n' +
    ' }';
let test10 = 'function goo(arr1, arr2, x){\n' +
    'if(x===10){\n' +
    'if(arr1[0] === arr2[0] && arr1[1] === arr2[1])\n' +
    'return arr2[2] - arr1[2];\n' +
    'return -1;\n' +
    '}\n' +
    'else\n' +
    'return arr1;\n' +
    '}\n';
let test10ArgumentsStrArray = ['let arr1 = [1,2,3];','let arr2 = [1,2,6];','let x = 10;'];
let test10Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="x === 10", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="arr1[0] === arr2[0] && arr1[1] === arr2[1]", xlabel=1, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n2 [label="return arr2[2] - arr1[2]", xlabel=2, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n3 [label="return -1", xlabel=3, shape=rectangle]\n' +
    ' n4 [label="return arr1", xlabel=4, shape=rectangle]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n0 -> n4 [label="false"]\n' +
    ' n1 -> n2 [label="true"]\n' +
    ' n1 -> n3 [label="false"]\n' +
    ' }';

let test11 = 'function goo(x){\n' +
    'while(true){\n' +
    'let y = 1;\n' +
    'if (x + y === 3)\n' +
    'return x;\n' +
    'x = x + 1;\n' +
    '}\n' +
    '}';
let test11ArgumentsStrArray = ['let x = 0;'];
let test11Res = 'digraph cfg { forcelabels=true\n' +
    ' n0 [label="true", xlabel=0, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n1 [label="let y = 1", xlabel=1, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n2 [label="x + y === 3", xlabel=2, shape=diamond,style = filled, fillcolor = green ]\n' +
    ' n3 [label="return x", xlabel=3, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n4 [label="x = x + 1", xlabel=4, shape=rectangle,style = filled, fillcolor = green ]\n' +
    ' n0 -> n1 [label="true"]\n' +
    ' n1 -> n2 []\n' +
    ' n2 -> n3 [label="true"]\n' +
    ' n2 -> n4 [label="false"]\n' +
    ' n4 -> n0 []\n' +
    ' }';

describe('Tests for third workshop', () => {
    it('test 1', () => {
        let dotGraph = fromCodeToGraph(test1, test1ArgumentsStrArray);
        assert.equal(dotGraph, test1Res);
    });

    it('test 2', () => {
        let dotGraph = fromCodeToGraph(test2, test2ArgumentsStrArray);
        assert.equal(dotGraph, test2Res);
    });

    it('test 3', () => {
        let dotGraph = fromCodeToGraph(test3, test3ArgumentsStrArray);
        assert.equal(dotGraph, test3Res);
    });
    it('test 4', () => {
        let dotGraph = fromCodeToGraph(test4, test4ArgumentsStrArray);
        assert.equal(dotGraph, test4Res);
    });
});

describe('Tests for third workshop', () => {
    it('test 5', () => {
        let dotGraph = fromCodeToGraph(test5, test5ArgumentsStrArray);
        assert.equal(dotGraph, test5Res);
    });
    it('test 6', () => {
        let dotGraph = fromCodeToGraph(test6, test6ArgumentsStrArray);
        assert.equal(dotGraph, test6Res);
    });
    it('test 7', () => {
        let dotGraph = fromCodeToGraph(test7, test7ArgumentsStrArray);
        assert.equal(dotGraph, test7Res);
    });
});

describe('Tests for third workshop', () => {
    it('test 8', () => {
        let dotGraph = fromCodeToGraph(test8, test8ArgumentsStrArray);
        assert.equal(dotGraph, test8Res);
    });
    it('test 9', () => {
        let dotGraph = fromCodeToGraph(test9, test9ArgumentsStrArray);
        assert.equal(dotGraph, test9Res);
    });
    it('test 10', () => {
        let dotGraph = fromCodeToGraph(test10, test10ArgumentsStrArray);
        assert.equal(dotGraph, test10Res);
    });
    it('test 11', () => {
        let dotGraph = fromCodeToGraph(test11, test11ArgumentsStrArray);
        assert.equal(dotGraph, test11Res);
    });
});
