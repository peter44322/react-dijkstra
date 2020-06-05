import React, { useState } from "react";
import { Input, Button, Segment, Container } from "semantic-ui-react";

const EdgeControl = (props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [w, setW] = useState("");
  return (
    <Container>
      <Input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
      ></Input>
      <Input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
      ></Input>
      <Input
        value={w}
        onChange={(e) => setW(e.target.value)}
        placeholder="Wight"
        type="number"
      ></Input>
      <Button
        disabled={!from || !to | !w}
        onClick={() => {
          const edge = {
            from: from,
            to: to,
            label: w,
          };

          props.onAdd(edge);
        }}
      >
        Add Edge
      </Button>
    </Container>
  );
};

export default EdgeControl;
