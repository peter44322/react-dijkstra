import React, { useState } from "react";
import { Segment, Input, Button, Container } from "semantic-ui-react";

const NodeControl = (props) => {
  const [label, setLabel] = useState("F");
  return (
    <Container>
      <Input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="label"
      ></Input>
      <Button
        onClick={() => {
          const node = {
            id: label,
            label: label,
          };

          props.onAdd(node);
        }}
      >
        Add Node
      </Button>
    </Container>
  );
};

export default NodeControl;
