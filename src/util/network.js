export function resetNetworkLayout(network) {
  network.nodes.forEach((node) => {
    network.nodes.update({
      id: node.id,
      label: node.id,
      color: null,
    });
  });
  network.edges.forEach((edge) => {
    network.edges.update({
      ...edge,
      color: null,
      width: null,
    });
  });
}

export function colorPath(path, network) {
  const strPath = path.join(">");
  path.forEach((nodeId) => {
    network.nodes.update({
      id: nodeId,
      label: nodeId,
      color: "#5ab55e",
    });
  });

  network.edges.forEach((edge) => {
    if (strPath.includes(edge.from + ">" + edge.to))
      network.edges.update({
        ...edge,
        color: "#5ab55e",
        width: 4,
        title: "sss",
      });
  });
}
