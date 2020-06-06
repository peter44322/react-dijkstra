/* eslint-disable no-loop-func */
import {
  findNextNodeForDijkstra,
  findIndexInTable,
  findPath,
  getConnectedNodes,
  generateINF,
  intializeTableForDijkstra,
} from "./helpers";
export function Dijkstra(nodes, edges, start_id, end_id) {
  const INF = generateINF(edges);
  let visited = [];
  let unVisited = [...nodes];
  let table = intializeTableForDijkstra(nodes, start_id, INF);

  let nextNode = findNextNodeForDijkstra(table, unVisited);
  while (unVisited.length > 1) {
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
    nextNode = findNextNodeForDijkstra(table, unVisited);
  }

  const [path, distances] = findPath(table, end_id);
  const cost = distances.reduce((a, b) => a + b);

  return [path, cost];
}
