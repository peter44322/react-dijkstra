import React from "react";
import { useState } from "react";
import { Container, Input, Button } from "semantic-ui-react";

const DeleteControl = (props) => {
  const [id, setId] = useState("");
  return (
    <Container>
      <Input
        value={id}
        placeholder="label"
        onChange={(e) => setId(e.target.value)}
      ></Input>
      <Button
        disabled={!id}
        color="red"
        onClick={() => {
          try {
            props.onDelete(id);
          } catch (e) {
            alert(e.message);
          }
        }}
      >
        Delete
      </Button>
    </Container>
  );
};

export default DeleteControl;
