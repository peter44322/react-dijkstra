import React from "react";
import { useState } from "react";

const DeleteControl = (props) => {
  const [id, setId] = useState("");
  return (
    <div>
      <input
        value={id}
        placeholder="label"
        onChange={(e) => setId(e.target.value)}
      ></input>
      <button onClick={() => props.onDelete(id)}>Delete</button>
    </div>
  );
};

export default DeleteControl;
