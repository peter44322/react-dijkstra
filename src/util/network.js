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

export function colorPath(path, network, color, edges = true) {
  const strPath = path.join(">");
  path.forEach((nodeId) => {
    network.nodes.update({
      id: nodeId,
      label: nodeId,
      color,
    });
  });

  //   network.edges.forEach((edge) => {
  //     if (path.includes(edge.from) && path.includes(edge.to))
  //       network.edges.update({
  //         ...edge,
  //         color,
  //         width: 4,
  //         title: "sss",
  //       });
  //   });
  if (edges)
    network.edges.forEach((edge) => {
      if (strPath.includes(edge.from + ">" + edge.to))
        network.edges.update({
          ...edge,
          color,
          width: 4,
          title: "sss",
        });
    });
}

export function addEdge(edge, network) {
  let old = null;
  network.edges.forEach((ed) => {
    if (ed.from === edge.from && ed.to === edge.to) {
      old = ed;
    }
  });
  if (!old) {
    network.edges.add(edge);
  } else {
    network.edges.remove(old);
    network.edges.add({ ...edge, color: "#7d5ab5" });
  }
}
