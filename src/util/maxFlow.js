/* eslint-disable no-loop-func */
import {
  findNextNodeForMaxFlow,
  findIndexInTable,
  findPath,
  getConnectedNodes,
  generateINF,
  intializeTableForMaxFlow,
} from "./helpers";

export function MaxFlow(nodes, edges, start_id, end_id) {
  const INF = generateINF(edges);
  let visited = [];
  let unVisited = [...nodes];
  let table = intializeTableForMaxFlow(nodes, start_id, INF);

  let nextNode = findNextNodeForMaxFlow(table, unVisited);
  while (unVisited.length > 1) {
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
    nextNode = findNextNodeForMaxFlow(table, unVisited);
  }

  const [path, distances] = findPath(table, end_id);
  const maxCap = Math.min(...distances);

  return [path, maxCap];
}
