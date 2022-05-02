import React, { Component } from "react";

import Button from "./components/Button";
import Circle from "./components/Circle";
import Modal from "./components/Modal";
import { circles } from "./circles";
import GameSetUp from "./components/GameSetup";

import startMusic from "./assets/sounds/start.wav";
import stopMusic from "./assets/sounds/end.wav";
import click from "./assets/sounds/click.wav";

const clickSound = new Audio(click);
const startSound = new Audio(startMusic);
const stopSound = new Audio(stopMusic);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    pace: 1500,
    rounds: 0,
    showModal: false,
    showGameSetup: true,
    gameOn: false,
    difficulty: "",
    circles: [],
    maxRounds: 3,
  };

  timer = undefined;

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  gameSetupHandler = (level) => {
    let circleArray;
    switch (level) {
      case "easy":
        circleArray = Array.from({ length: 3 }, (x, i) => i);
        break;
      case "medium":
        circleArray = Array.from({ length: 5 }, (x, i) => i);
        break;
      case "difficult":
        circleArray = Array.from({ length: 7 }, (x, i) => i);
        break;
      default:
        circleArray = Array.from({ length: 3 }, (x, i) => i);
    }
    this.setState({
      circles: circleArray,
      showGameSetup: false,
      gameOn: false,
      difficulty: level,
    });
  };

  clickHandler = (i) => {
    this.clickPlay();
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }
    // console.log("clickHandler, circle number:",i);
    this.setState({
      score: this.state.score + 10,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 3) {
      this.stopHandler();
      return;
    }

    let nextActive;
    do {
      nextActive = getRndInteger(0, this.state.circles.length);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    // console.log("rounds", this.state.rounds);

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.nextCircle();
    this.setState({ gameOn: true, showGameSetup: false, rounds: 0 });
  };

  stopHandler = () => {
    startSound.pause();
    stopSound.play();
    clearTimeout(this.timer);
    this.setState({ showModal: true, gameOn: false });
  };

  closeHandler = () => {
    this.setState({
      showModal: false,
      score: 0,
      current: -1,
      showGameSetup: true,
      rounds: 0,
    });
  };

  render() {
    return (
      <div className="container">
        <div>
          <h1>Hit the Target</h1>
        </div>
        {this.state.showGameSetup && (
          <GameSetUp>
            <Button click={() => this.gameSetupHandler("easy")}>Easy</Button>
            <Button click={() => this.gameSetupHandler("medium")}>
              Medium
            </Button>
            <Button click={() => this.gameSetupHandler("difficult")}>
              Difficult
            </Button>
          </GameSetUp>
        )}
        <div>
          {this.state.gameOn && (
            <p className="score">Your score: {this.state.score}</p>
          )}
          <div className="circles">
            {this.state.circles.map((_, i) => (
              <Circle
                key={i}
                id={i}
                click={() => this.clickHandler(i)}
                active={this.state.current === i}
                disabled={this.state.gameOn}
              />
            ))}
          </div>
          {this.state.gameOn && (
            <Button click={this.startHandler}>START</Button>
          )}
          {this.state.gameOn && <Button click={this.stopHandler}>STOP</Button>}
        </div>

        {this.state.showModal && (
          <Modal
            click={this.closeHandler}
            score={this.state.score}
            message={this.state.message}
          />
        )}
      </div>
    );
  }
}

export default App;
