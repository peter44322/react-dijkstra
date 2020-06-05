import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Graph from "react-graph-vis";
import { Dijkstra } from "./Dijkstra";
import NodeControl from "./NodeControl";
import EdgeControl from "./EdgeControl";
import SolveControl from "./SolveControl";
import DeleteControl from "./DeleteControl";

function App() {
  let graph = {
    nodes: [
      { id: "A", label: "A" },
      { id: "B", label: "B" },
      { id: "C", label: "C" },
      { id: "D", label: "D" },
      { id: "E", label: "E" },
    ],
    edges: [
      { from: "A", to: "B", label: "6" },
      { from: "A", to: "D", label: "1" },
      { from: "B", to: "D", label: "2" },
      { from: "D", to: "E", label: "1" },
      { from: "E", to: "B", label: "2" },
      { from: "C", to: "B", label: "5" },
      { from: "E", to: "C", label: "5" },
    ],
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const ref = useRef();

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      smooth: true,
    },
    height: "100%",
  };

  return (
    <div className="App">
      <NodeControl
        onAdd={(node) => {
          try {
            ref.current.nodes.add(node);
          } catch (e) {
            alert(e.message);
          }
        }}
      >
        Add Node
      </NodeControl>
      <DeleteControl
        onDelete={(id) => {
          try {
            ref.current.nodes.remove({ id: id });
            console.log(ref.current.edges.getDataSet());
          } catch (e) {
            alert(e.message);
          }
        }}
      ></DeleteControl>
      <EdgeControl
        onAdd={(edge) => {
          let old = null;
          // ref.current.edges.foreach()
          ref.current.edges.forEach((ed) => {
            if (ed.from === edge.from && ed.to === edge.to) {
              old = ed;
            }
          });
          if (!old) {
            console.log(ref.current.edges.add(edge));
          } else {
            ref.current.edges.remove(old);
            console.log(ref.current.edges.add({ ...edge, color: "#7d5ab5" }));
          }
        }}
      ></EdgeControl>
      <SolveControl
        onSolve={(s, e) => {
          const path = Dijkstra(
            ref.current.nodes.get(),
            ref.current.edges.get(),
            s,
            e
          );
          const strPath = path.join(">");

          ref.current.nodes.forEach((node) => {
            ref.current.nodes.update({
              id: node.id,
              label: node.id,
              color: null,
            });
          });

          path.forEach((nodeId) => {
            ref.current.nodes.update({
              id: nodeId,
              label: nodeId,
              color: "#5ab55e",
            });
          });

          ref.current.edges.forEach((edge) => {
            ref.current.edges.update({ ...edge, color: null, width: 1 });
          });
          ref.current.edges.forEach((edge) => {
            if (strPath.includes(edge.from + ">" + edge.to))
              ref.current.edges.update({ ...edge, color: "#5ab55e", width: 3 });
          });
        }}
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
