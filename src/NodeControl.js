import React, { useState } from "react";
import { Input, Button, Container } from "semantic-ui-react";

const NodeControl = (props) => {
  const [label, setLabel] = useState();
  return (
    <Container>
      <Input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="label"
      ></Input>
      <Button
        disabled={!label}
        onClick={() => {
          const node = {
            id: label,
            label: label,
          };
          try {
            props.onAdd(node);
          } catch (e) {
            alert(e.message);
          }
        }}
      >
        Add Node
      </Button>
    </Container>
  );
};

export default NodeControl;
