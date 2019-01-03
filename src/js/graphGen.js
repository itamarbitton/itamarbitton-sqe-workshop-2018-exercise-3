import * as escodegen from 'escodegen';


function generateGraph(controlFlowGraph){
    let nodes = controlFlowGraph[2];
    nodes.splice(nodes.length - 1, 1);
    nodes.splice(0,1);
    nodes.forEach(x=>{delete x.exception;});
    nodes.forEach(x=>{
        let exp = escodegen.generate(x.astNode);
        x.label = exp.endsWith(';') ? exp.substring(0, exp.length - 1) : exp;});
    nodes.forEach(function (node){
        while(node.normal && node.normal.normal && node.normal.prev.length === 1 ){
            nodes.splice(nodes.indexOf(node.normal), 1);
            node.label = node.label+ '\n' + node.normal.label;
            node.next = node.normal.next;
            node.normal = node.normal.normal;
        }});
    let nodesInDot = createNodes(nodes);
    let edgesInDot = createEdges(nodes);
    let output = nodesInDot.concat(edgesInDot).join(' ');
    return`digraph cfg { forcelabels=true\n ${output} }`;
}


function createNodes(nodes){
    let nodeindot = [];
    let index = 0;
    nodes.forEach(function (node){
        let nodeStr = 'n' + index + ' [label="' + node.label + '", xlabel=' + index;
        if(node.true && node.false){
            nodeStr = nodeStr + ', shape=diamond';
        }
        else{
            nodeStr = nodeStr + ', shape=rectangle';
        }
        if(node.paint){
            nodeStr = nodeStr + ',style = filled, fillcolor = green ';
        }
        nodeStr = nodeStr + ']\n';
        nodeindot.push(nodeStr);
        index += 1;
    });
    return nodeindot;
}

function appendEdge(start,end,edgesArray, boolType=undefined){
    if (!(end < 0)){
        switch (boolType) {
        case undefined:
            edgesArray.push('n' + start + ' -> n' + end + ' ' + '[]' +'\n');
            break;
        case true:
            edgesArray.push('n' + start + ' -> n' + end + ' ' + '[label="true"]' +'\n');
            break;
        case false:
            edgesArray.push('n' + start + ' -> n' + end + ' ' + '[label="false"]' +'\n');
            break;
        }
    }
}

function createEdges (nodes){
    let edges = [];
    for (let i =0;i<nodes.length;i++){
        let node = nodes[i];
        if(node.normal){
            let index = nodes.indexOf(node.normal);
            appendEdge(i,index,edges);
        }
        if(node.true) {
            let index = nodes.indexOf(node.true);
            appendEdge(i, index, edges, true);
        }
        if(node.false) {
            let index = nodes.indexOf(node.false);
            appendEdge(i,index, edges, false);
        }
    }
    return edges;
}

export {generateGraph};
