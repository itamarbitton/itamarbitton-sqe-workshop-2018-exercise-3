import {visualizeGraph} from './CFG-Painter.js';
import $ from 'jquery';
import * as esgraph from 'esgraph';
import {generateGraph} from './graphGen';
import {parseCode} from './code-analyzer';
import {Module,render} from 'viz.js/full.render.js';
import Viz from 'viz.js';


const encapsulate = (exp)=> {return '[' + exp + ']';};


function initiateFunctionArgs(parsedCode, argsStr){
    const initiator=[];
    const strVals = eval(encapsulate(argsStr));
    const params = parsedCode.body[0].params;
    let varToValue = {};
    let j = 0;
    params.map(function (param){
        varToValue[param.name] = strVals[j];
        j++;
    });
    for(const element in varToValue){
        initiator.push('let '+ element + ' = ' + JSON.stringify(varToValue[element]) + ';');
    }
    return initiator;
}


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let paramsList = initiateFunctionArgs(parsedCode, $('#parametersHolder').val());
        let funcToGraph = parsedCode['body'][0]['body'];
        let controlFlowGraph = esgraph(funcToGraph);
        visualizeGraph(controlFlowGraph, paramsList);
        let dotGraph = generateGraph(controlFlowGraph);
        var query = $('#parsedCode');
        query.innerHTML = '';
        query.find('*').remove();
        let viz = new Viz({Module,render});
        viz.renderSVGElement(dotGraph)
            .then(function (element) {
                query.append(element);
            });
    });
});


