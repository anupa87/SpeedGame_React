import React from "react";

const GameSetUp = (props) => {
  return (
    <div>
      <h2 className="difficulty-header">Choose difficulty</h2>
      <div className="difficulty-btn">{props.children}</div>
    </div>
  );
};

export default GameSetUp;
