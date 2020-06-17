import React, { useRef, useState } from "react";
import Graph from "react-graph-vis";
import NodeControl from "./NodeControl";
import EdgeControl from "./EdgeControl";
import SolveControl from "./SolveControl";
import DeleteControl from "./DeleteControl";
import {
  Container,
  Grid,
  Divider,
  Segment,
  Dimmer,
  Header as SHeader,
  Table,
  Button,
  Label,
} from "semantic-ui-react";
import "./App.css";
import Header from "./components/Header";
import { MaxFlow, intialStateMaxFlow, maxFlowStep } from "./util/maxFlow";
import { Dijkstra, intialStateDijkstra, DijkstraStep } from "./util/Dijkstra";
import { resetNetworkLayout, colorPath, addEdge } from "./util/network";
import { sleep, findPathAndCost, cleanDuplicatedEdges } from "./util/helpers";
import Steps from "./components/Steps";

const graph = {
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
function App() {
  const ref = useRef();
  const [solution, setSolution] = useState("");
  const [bi, setBi] = useState(false);
  const [dimmed, setDimmed] = useState(true);
  const [solving, setSolving] = useState(false);
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
              This is An Implementation For the final Algorithms project
              2019/2020
              <br />
              under the supervision of
              <br />
              Dr.Moustafa reda Eltantawi
              <Steps></Steps>
            </Segment>
            <Segment>
              <Header
                onChange={(val) => {
                  setBi(val);
                  if (val) {
                    cleanDuplicatedEdges(ref.current);
                    ref.current.Network.setOptions({
                      edges: {
                        smooth: false,
                        arrows: { to: { enabled: false } },
                      },
                    });
                  } else {
                    ref.current.Network.setOptions({
                      edges: {
                        smooth: true,
                        arrows: { to: { enabled: true } },
                      },
                    });
                  }
                }}
              />
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
                  addEdge(edge, ref.current, bi);
                }}
              ></EdgeControl>
              <Divider></Divider>
              <SolveControl
                solving={solving}
                onSolve={(s, e) => {
                  setSolving(true);
                  const [path, cost] = Dijkstra(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s,
                    e,
                    bi
                  );
                  resetNetworkLayout(ref.current);
                  colorPath(path, ref.current, "#5ab55e", true, bi);
                  setSolution("cost: " + cost + ", " + path.join(">"));
                  setSolving(false);
                }}
              >
                Dijkstra
              </SolveControl>
              <SolveControl
                solving={solving}
                onSolve={(s, e) => {
                  setSolving(true);
                  const [path, maxCap] = MaxFlow(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s,
                    e,
                    bi
                  );
                  resetNetworkLayout(ref.current);
                  colorPath(path, ref.current, "#5ab55e", true, bi);
                  setSolution("max flow: " + maxCap + ", " + path.join(">"));
                  setSolving(false);
                }}
              >
                MaxFlow
              </SolveControl>
              <Divider />
              <SolveControl
                solving={solving}
                time={true}
                onSolve={async (s, e, t) => {
                  setSolving(true);
                  let state = intialStateDijkstra(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s
                  );
                  while (state.unVisited.length > 1) {
                    state = DijkstraStep(state, ref.current.edges.get(), bi);
                    resetNetworkLayout(ref.current);
                    setSolution(
                      "Visited: " +
                        state.visited.map((n) => n.id).join(" ") +
                        " , " +
                        "Unvisited: " +
                        state.unVisited.map((n) => n.id).join(" ")
                    );
                    colorPath(
                      state.visited.map((n) => n.id),
                      ref.current,
                      "red",
                      false,
                      bi
                    );
                    await sleep(t * 1000);
                  }
                  const [path, cost] = findPathAndCost(state.table, e);
                  colorPath(path, ref.current, "#5ab55e", true, bi);
                  setSolution("cost: " + cost + ", " + path.join(">"));
                  setSolving(false);
                }}
              >
                Dijkstra Steps
              </SolveControl>
              <SolveControl
                solving={solving}
                time={true}
                onSolve={async (s, e, t) => {
                  setSolving(true);
                  let state = intialStateMaxFlow(
                    ref.current.nodes.get(),
                    ref.current.edges.get(),
                    s
                  );
                  while (state.unVisited.length > 1) {
                    state = maxFlowStep(state, ref.current.edges.get(), bi);
                    resetNetworkLayout(ref.current);
                    colorPath(
                      state.visited.map((n) => n.id),
                      ref.current,
                      "red",
                      false,
                      bi
                    );
                    setSolution(
                      "Visited: " +
                        state.visited.map((n) => n.id).join(" ") +
                        " , " +
                        "Unvisited: " +
                        state.unVisited.map((n) => n.id).join(" ")
                    );
                    await sleep(t * 1000);
                  }
                  const [path, cost] = findPathAndCost(state.table, e);
                  colorPath(path, ref.current, "#5ab55e", true, bi);
                  setSolution("Max Flow: " + cost + ", " + path.join(">"));
                  setSolving(false);
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
            {solution && <Segment>{solution}</Segment>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Dimmer page={true} active={dimmed}>
        <SHeader inverted icon>
          Welcome To Maximum Flow and Dijkstra Algorithms
          <SHeader.Subheader>
            This is An Implementation For the final Algorithms project 2019/2020
            <br />
            under the supervision of
            <br />
            <strong>Dr.Moustafa reda Eltantawi</strong>
            <p>
              faculty of computer and artificial intelligence - cairo university
            </p>
          </SHeader.Subheader>
        </SHeader>
        <Table celled inverted>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={2}>
                <Label ribbon>Implemented By</Label>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Bavly Adel</Table.Cell>
              <Table.Cell>20160082</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Engy Hishmat</Table.Cell>
              <Table.Cell>20160069</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Joseph Medhat</Table.Cell>
              <Table.Cell>20160088</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Peter Safwat</Table.Cell>
              <Table.Cell>20160083</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button
          onClick={(e) => setDimmed(false)}
          content="Proceed"
          icon="right arrow"
          labelPosition="right"
        />
      </Dimmer>
    </Container>
  );
}

export default App;
