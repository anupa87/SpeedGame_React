import React from "react";

const Modal = (props) => {
  let message = "";
  if (props.score <= 50) {
    message = "You can do better";
  } else if (props.score >= 51 && props.score <= 100) {
    message = "Now you are getting the hang of it";
  } else {
    message = "You are rocking it, Well done !";
  }
  return (
    <div className="overlay">
      <div className="overlay-text">
        <h2>GAME OVER</h2>
        <p id="score"> Your score is: {props.score} </p>
        <p id="message">{props.message}</p>
        <button onClick={props.click}>Close</button>
      </div>
    </div>
  );
};
export default Modal;
