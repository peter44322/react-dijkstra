/* eslint-disable no-loop-func */
function nodeExists(id, nodes) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id == id) {
      return true;
    }
  }
  return false;
}

function findNextNode(table, unVisited) {
  return unVisited.reduce((accum, curr) => {
    const current = table[findIndexInTable(curr.id, table)];
    const carry = table[findIndexInTable(accum.id, table)];
    if (current.distance === null) {
      return carry;
    }
    return current.distance < carry.distance ? current : carry;
  });
}

function getConnectedNodes(node_id, edges) {
  let connected = [];
  edges.forEach((edge) => {
    if (edge.from === node_id) {
      connected.push({
        id: edge.to,
        distance: parseInt(edge.label),
      });
    } else if (edge.to === node_id) {
      connected.push({
        id: edge.from,
        distance: parseInt(edge.label),
      });
    }
  });
  return connected;
}

function findIndexInTable(id, table) {
  for (let i = 0; i < table.length; i++) {
    if (table[i].id === id) {
      return i;
    }
  }
}

function findPath(table, target_id) {
  let path = [];
  let prev = table[findIndexInTable(target_id, table)].previous;
  while (prev != null) {
    path.push(prev);
    prev = table[findIndexInTable(prev, table)].previous;
  }
  return path.reverse();
}

export function Dijkstra(nodes, edges, start_id, end_id) {
  let visited = [];
  let unVisited = [...nodes];
  let table = nodes.map((node) => {
    return {
      id: node.id,
      distance: node.id === start_id ? 0 : null,
      previous: null,
    };
  });

  let nextNode = findNextNode(table, unVisited);
  while (unVisited.length > 1) {
    visited.push(nextNode);
    unVisited.splice(findIndexInTable(nextNode.id, unVisited), 1);
    const connectNodes = getConnectedNodes(nextNode.id, edges);
    connectNodes.forEach((node) => {
      const tableIndex = findIndexInTable(node.id, table);
      if (
        table[tableIndex].distance == null ||
        table[tableIndex].distance > nextNode.distance + node.distance
      ) {
        table[tableIndex].distance = nextNode.distance + node.distance;
        table[tableIndex].previous = nextNode.id;
      }
    });
    nextNode = findNextNode(table, unVisited);
  }
  //   console.log(findPath(table, end_id));
  return [...findPath(table, end_id), end_id];
}
