import {
  findNextNodeForMaxFlow,
  findIndexInTable,
  getConnectedNodes,
  generateINF,
  intializeTableForMaxFlow,
  findPathAndCost,
} from "./helpers";

/* intilize the first state to have an 
  empty visited array
  unVisited array with all the nodes
  intial table
*/
export function intialStateMaxFlow(nodes, edges, start_id) {
  const INF = generateINF(edges);
  return {
    visited: [],
    unVisited: [...nodes],
    table: intializeTableForMaxFlow(nodes, start_id, INF),
  };
}
/*
  this function takes a step with table,visited and unvisited 
  and return the next step after preforming on iteration from the algorithm
*/
export function maxFlowStep(prevStep, edges) {
  let { table, visited, unVisited } = prevStep;
  let nextNode = findNextNodeForMaxFlow(table, unVisited);
  visited.push(nextNode);
  unVisited.splice(findIndexInTable(nextNode.id, unVisited), 1);
  const connectNodes = getConnectedNodes(nextNode.id, edges);
  connectNodes.forEach((node) => {
    const tableIndex = findIndexInTable(node.id, table);
    if (
      table[tableIndex].distance < Math.min(nextNode.distance, node.distance)
    ) {
      table[tableIndex].distance = Math.min(nextNode.distance, node.distance);
      table[tableIndex].previous = nextNode.id;
    }
  });
  return { table, visited, unVisited };
}
/*
function to solve the graph by iteration throw the 
algorthim step
*/
export function MaxFlow(nodes, edges, start_id, end_id) {
  let state = intialStateMaxFlow(nodes, edges, start_id);
  while (state.unVisited.length > 1) {
    state = maxFlowStep(state, edges);
  }
  return findPathAndCost(state.table, end_id);
}
