import React, { useState } from "react";

const NodeControl = (props) => {
  const [label, setLabel] = useState("F");
  return (
    <div style={{ display: "flex", margin: "30px" }}>
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="label"
      ></input>
      <button
        onClick={() => {
          const node = {
            id: label,
            label: label,
          };

          props.onAdd(node);
        }}
      >
        Add Node
      </button>
    </div>
  );
};

export default NodeControl;
