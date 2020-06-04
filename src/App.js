import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Graph from "react-graph-vis";
import { Dijkstra } from "./Dijkstra";
import NodeControl from "./NodeControl";
import EdgeControl from "./EdgeControl";
import SolveControl from "./SolveControl";

function App() {
  let graph = {
    nodes: [
      { id: "A", label: "A", title: "node 1 tootip text" },
      { id: "B", label: "B", title: "node 2 tootip text" },
      { id: "C", label: "C", title: "node 3 tootip text" },
      { id: "D", label: "D", title: "node 4 tootip text" },
      { id: "E", label: "E", title: "node 5 tootip text" },
    ],
    edges: [
      { from: "A", to: "B", label: "6" },
      { from: "A", to: "D", label: "1" },
      { from: "B", to: "D", label: "2" },
      { from: "D", to: "E", label: "1" },
      { from: "E", to: "B", label: "2" },
      { from: "C", to: "B", label: "5" },
      { from: "C", to: "E", label: "5" },
    ],
  };

  const ref = useRef();

  Dijkstra(graph.nodes, graph.edges, "A", "C");

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
    height: "100%",
  };

  return (
    <div className="App">
      <NodeControl
        onAdd={(node) => {
          try {
            ref.current.nodes.add(node);
            graph.nodes.push(node);
          } catch (e) {
            alert(e.message);
          }
        }}
      >
        Add Node
      </NodeControl>
      <EdgeControl
        onAdd={(edge) => {
          console.log(ref.current.edges.add(edge));
          graph.edges.push(edge);
        }}
      ></EdgeControl>
      <SolveControl
        onSolve={(s, e) =>
          alert(Dijkstra(graph.nodes, graph.edges, s, e).join(">"))
        }
      ></SolveControl>
      <Graph
        graph={graph}
        options={options}
        // events={events}
        ref={ref}
        getNetwork={(network) => {
          // network.nodes.add({ id: "dddddddddd", label: "sssssssss" });
          // network.addNodeMode();
          // console.log(network.nodes);
          // network.addEdgeMode();
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </div>
  );
}

export default App;
