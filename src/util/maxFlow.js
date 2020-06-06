/* eslint-disable no-loop-func */
import {
  findNextNodeForMaxFlow,
  findIndexInTable,
  getConnectedNodes,
  generateINF,
  intializeTableForMaxFlow,
  findPathAndCost,
} from "./helpers";

export function intialStateMaxFlow(nodes, edges, start_id) {
  const INF = generateINF(edges);
  return {
    visited: [],
    unVisited: [...nodes],
    table: intializeTableForMaxFlow(nodes, start_id, INF),
  };
}
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
export function MaxFlow(nodes, edges, start_id, end_id) {
  let state = intialStateMaxFlow(nodes, edges, start_id);
  while (state.unVisited.length > 1) {
    state = maxFlowStep(state, edges);
  }
  return findPathAndCost(state.table, end_id);
}
