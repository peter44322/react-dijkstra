import React, { useState } from "react";
import { Container, Input, Button } from "semantic-ui-react";

const SolveControl = (props) => {
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("C");
  const [time, setTime] = useState(1);
  return (
    <Container>
      {props.time && (
        <>
          <input
            value={time}
            min={1}
            max={10}
            step={1}
            placeholder="s"
            type="range"
            onChange={(e) => setTime(e.target.value)}
          ></input>
          <span className="mr-3">{time} s</span>
        </>
      )}
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
      <Button
        disabled={!start || !end || !time || props.solving}
        color="green"
        loading={props.solving}
        onClick={(e) => !props.solving && props.onSolve(start, end, time)}
      >
        {props.children}
      </Button>
    </Container>
  );
};

export default SolveControl;
