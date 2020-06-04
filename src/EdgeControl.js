import React, { useState } from "react";

const EdgeControl = (props) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [w, setW] = useState("");
  return (
    <div style={{ display: "flex", margin: "30px" }}>
      <input
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        placeholder="From"
      ></input>
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
      ></input>
      <input
        value={w}
        onChange={(e) => setW(e.target.value)}
        placeholder="Wight"
      ></input>
      <button
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
      </button>
    </div>
  );
};

export default EdgeControl;
