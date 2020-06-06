import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import NodeControl from "./NodeControl";
import EdgeControl from "./EdgeControl";
import SolveControl from "./SolveControl";
import DeleteControl from "./DeleteControl";
import { Container, Grid, Divider, Segment } from "semantic-ui-react";
import "./App.css";
import Header from "./components/Header";
import { MaxFlow, intialStateMaxFlow, maxFlowStep } from "./util/maxFlow";
import { Dijkstra, intialStateDijkstra, DijkstraStep } from "./util/Dijkstra";
import { resetNetworkLayout, colorPath, addEdge } from "./util/network";
import { sleep, findPathAndCost } from "./util/helpers";

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
      { from: "B", to: "E", label: "1" },
      { from: "D", to: "E", label: "1" },
      { from: "E", to: "B", label: "2" },
      { from: "C", to: "B", label: "5" },
      { from: "E", to: "C", label: "5" },
    ],
  };
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
    <Container style={{ marginTop: "3em" }}>
      <Grid divided="vertically">
        <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Segment>
              <Header />
              <Divider />
              <NodeControl onAdd={(node) => ref.current.nodes.add(node)} />
              <Divider />
              <DeleteControl
                onDelete={(id) => {
                  ref.current.nodes.remove({ id: id });
                }}
              />
              <Divider />
              <EdgeControl
                onAdd={(edge) => {
                  addEdge(edge, ref.current);
                }}
              ></EdgeControl>
              <Divider></Divider>
              <SolveControl
                onSolve={(s, e) => {
                  const [path, maxCap] = Dijkstra(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s,
                    e
                  );
                  resetNetworkLayout(ref.current);
                  colorPath(path, ref.current, "#5ab55e");
                  // alert("Max Capacity : " + maxCap);
                }}
              >
                Dijkstra
              </SolveControl>
              <SolveControl
                onSolve={async (s, e) => {
                  let state = intialStateDijkstra(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s
                  );
                  while (state.unVisited.length > 1) {
                    state = DijkstraStep(state, ref.current.edges.get());
                    resetNetworkLayout(ref.current);
                    colorPath(
                      state.visited.map((n) => n.id),
                      ref.current,
                      "red",
                      false
                    );
                    await sleep(1000);
                  }
                  const [path] = findPathAndCost(state.table, e);
                  colorPath(path, ref.current, "#5ab55e");
                }}
              >
                Dijkstra Steps
              </SolveControl>
              <SolveControl
                onSolve={(s, e) => {
                  const [path, maxCap] = MaxFlow(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s,
                    e
                  );
                  resetNetworkLayout(ref.current);
                  colorPath(path, ref.current, "#5ab55e");
                  // alert("Max Capacity : " + maxCap);
                }}
              >
                MaxFlow
              </SolveControl>
              <SolveControl
                onSolve={async (s, e) => {
                  let state = intialStateMaxFlow(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s
                  );
                  while (state.unVisited.length > 1) {
                    state = maxFlowStep(state, ref.current.edges.get());
                    resetNetworkLayout(ref.current);
                    colorPath(
                      state.visited.map((n) => n.id),
                      ref.current,
                      "red",
                      false
                    );
                    await sleep(1000);
                  }
                  const [path] = findPathAndCost(state.table, e);
                  colorPath(path, ref.current, "#5ab55e");
                }}
              >
                MaxFlow Steps
              </SolveControl>
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <Graph
                style={{ height: "500px", width: "100%" }}
                graph={graph}
                options={options}
                ref={ref}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default App;
