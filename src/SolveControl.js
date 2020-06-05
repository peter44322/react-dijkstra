import React, { useState } from "react";
import { Container, Input, Button } from "semantic-ui-react";

const SolveControl = (props) => {
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("C");
  return (
    <Container>
      <Input
        value={start}
        placeholder="Start"
        onChange={(e) => setStart(e.target.value)}
      ></Input>
      <Input
        value={end}
        placeholder="End"
        onChange={(e) => setEnd(e.target.value)}
      ></Input>
      <Button color="green" onClick={(e) => props.onSolve(start, end)}>
        solve
      </Button>
    </Container>
  );
};

export default SolveControl;
