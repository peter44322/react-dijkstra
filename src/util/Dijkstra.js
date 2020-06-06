/* eslint-disable no-loop-func */
import {
  findNextNodeForDijkstra,
  findIndexInTable,
  getConnectedNodes,
  generateINF,
  intializeTableForDijkstra,
  findPathAndCost,
} from "./helpers";

export function intialStateDijkstra(nodes, edges, start_id) {
  const INF = generateINF(edges);
  return {
    visited: [],
    unVisited: [...nodes],
    table: intializeTableForDijkstra(nodes, start_id, INF),
  };
}

export function DijkstraStep(prevStep, edges) {
  let { table, visited, unVisited } = prevStep;

  let nextNode = findNextNodeForDijkstra(table, unVisited);
  visited.push(nextNode);
  unVisited.splice(findIndexInTable(nextNode.id, unVisited), 1);
  const connectNodes = getConnectedNodes(nextNode.id, edges);
  connectNodes.forEach((node) => {
    const tableIndex = findIndexInTable(node.id, table);
    if (table[tableIndex].distance > nextNode.distance + node.distance) {
      table[tableIndex].distance = nextNode.distance + node.distance;
      table[tableIndex].previous = nextNode.id;
    }
  });
  return { table, visited, unVisited };
}
export function Dijkstra(nodes, edges, start_id, end_id) {
  let state = intialStateDijkstra(nodes, edges, start_id);
  while (state.unVisited.length > 1) {
    state = DijkstraStep(state, edges);
  }
  return findPathAndCost(state.table, end_id);
}
