import * as escodegen from 'escodegen';


function visualizeGraph(graph, params) {
    let node = graph[0].normal;
    nodePaint(node, params);
}

function condPaint(n, params) {
    const n_string = escodegen.generate(n.astNode);
    const variables = params.join(';');
    if(eval(variables + n_string + ';')){
        nodePaint(n.true, params);
    }
    else{
        nodePaint(n.false, params);
    }
}

function nodePaint(n, params) {
    if(n.type !== 'exit' ){
        n.paint = true;
        if(n.normal){
            params.push(escodegen.generate(n.astNode)+';');
            nodePaint(n.normal,params);
        }
        else{
            condPaint(n, params);
        }
    }
}


export {visualizeGraph};