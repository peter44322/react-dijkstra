import React from "react";
import { Button, Header, Image, Modal, Message } from "semantic-ui-react";

const Steps = () => {
  return (
    <div>
      <Modal
        trigger={<Button color="blue">How To Use (Readme)</Button>}
        closeIcon
      >
        <Modal.Header>How to Use</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Image wrapped fluid src="/steps/0.jpeg" />
            <Header>
              By using the bidirctonal toggle you will be able to switch the
              graph into bidirctonal and switching it back{" "}
            </Header>
            <Image wrapped fluid src="/steps/1.jpeg" />
            <Header>
              If you want to add node <br /> type the name of the node (example
              f) and click on “add node” button.
            </Header>
            <Message
              icon="hand point right"
              info
              content="
                Notice the Button is Disabled untill you enter A charachter in
                the text input
              "
            ></Message>
            <Image wrapped fluid src="/steps/2.jpeg" />
            <Header>
              If you want to delete a node <br /> type the name of the node
              (example C ) and click on “delete” button.
            </Header>
            <Image wrapped fluid src="/steps/3.jpeg" />
            <Header>
              If you want to add an edge <br /> type the name of the source node
              (example f ),the destination node (example E ) and the
              weight/Capacity of the edge (example 3 ) and click on “add edge”
              button.
            </Header>
            <Image wrapped fluid src="/steps/4.jpeg" />
            <Header>
              You can control the delay time (4 s) from one step to another in
              dijkstra from the slider
            </Header>
            <Image wrapped fluid src="/steps/5.jpeg" />
            <Header>
              The solution will be displayed down there along side the path
            </Header>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Steps;
