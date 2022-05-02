import React from "react";

const Modal = (props) => {
  return (
    <div className="overlay">
      <div className="overlay-text">
        <h2>GAME OVER</h2>
        <p id="score"> Your score is: {props.score} </p>
        <p id="message">{props.message}</p>
      </div>
      <button type="button" onClick={props.click}>
        Close
      </button>
    </div>
  );
};
export default Modal;
