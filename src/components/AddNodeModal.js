import React, { useState } from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";

const AddNodeModal = (props) => {
  const [label, setLabel] = useState("F");
  return (
    <Modal trigger={<Button>Add Node</Button>} size="small">
      <Header icon="archive" content="Add Node" />
      <Modal.Content>
        <Input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="label"
        ></Input>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          onClick={() => {
            const node = {
              id: label,
              label: label,
            };

            props.onAdd(node);
          }}
          inverted
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddNodeModal;
