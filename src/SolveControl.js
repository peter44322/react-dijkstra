import React, { useState } from "react";

const SolveControl = (props) => {
  const [start, setStart] = useState("A");
  const [end, setEnd] = useState("C");
  return (
    <div style={{ display: "flex", margin: "30px" }}>
      <input
        value={start}
        placeholder="Start"
        onChange={(e) => setStart(e.target.value)}
      ></input>
      <input
        value={end}
        placeholder="End"
        onChange={(e) => setEnd(e.target.value)}
      ></input>
      <button onClick={(e) => props.onSolve(start, end)}>solve</button>
    </div>
  );
};

export default SolveControl;
