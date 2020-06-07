export function findNextNodeForDijkstra(table, unVisited) {
  return unVisited.reduce((accum, curr) => {
    const current = table[findIndexInTable(curr.id, table)];
    const carry = table[findIndexInTable(accum.id, table)];
    return current.distance < carry.distance ? current : carry;
  });
}
export function findNextNodeForMaxFlow(table, unVisited) {
  return unVisited.reduce((accum, curr) => {
    const current = table[findIndexInTable(curr.id, table)];
    const carry = table[findIndexInTable(accum.id, table)];
    return current.distance > carry.distance ? current : carry;
  });
}

export function getConnectedNodes(node_id, edges) {
  let connected = [];
  edges.forEach((edge) => {
    if (edge.from === node_id) {
      connected.push({
        id: edge.to,
        distance: parseInt(edge.label),
      });
    }
  });
  return connected;
}

export function findIndexInTable(id, table) {
  for (let i = 0; i < table.length; i++) {
    if (table[i].id === id) {
      return i;
    }
  }
}

export function findPath(table, target_id) {
  let path = [];
  let prev = table[findIndexInTable(target_id, table)];
  let distances = prev.distance;
  // return [];
  while (prev != null) {
    path.push(prev.id);
    prev = table[findIndexInTable(prev.previous, table)];
  }
  return [path.reverse(), distances];
}

export function intializeTableForDijkstra(nodes, start_id, INF) {
  const table = nodes.map((node) => {
    return {
      id: node.id,
      distance: node.id === start_id ? 0 : INF,
      previous: null,
    };
  });
  return table;
}
export function intializeTableForMaxFlow(nodes, start_id, INF) {
  const table = nodes.map((node) => {
    return {
      id: node.id,
      distance: node.id === start_id ? INF : 0,
      previous: null,
    };
  });
  return table;
}

export function generateINF(edges) {
  return (
    edges.reduce((carry, current) => {
      return carry.label
        ? parseInt(carry.label) + parseInt(current.label)
        : carry + parseInt(current.label);
    }) + 1
  );
}
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function findPathAndCost(table, end_id) {
  const [path, cost] = findPath(table, end_id);
  return [path, cost];
}
