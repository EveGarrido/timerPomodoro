import { useState } from "react";
import "./App.css";
import Pomodoro from "./components/Pomodoro";
import SmallBreak from "./components/SmallBreak";
import LargeBreak from "./components/LargeBreak";
import ding from "./assets/BELLBOX.mp3";

function App() {
  let [timeInSecondsSmallBreak, setTimeInSecondsSmallBreak] = useState(0);
  let [timeInSecondsPomodoro, setTimeInSecondsPomodoro] = useState(0);
  let [timeInSecondsLargeBreak, setTimeInSecondsLargeBreak] = useState(0);
  let [isActiveSmallBreak, setIsActiveSmallBreak] = useState(false);
  let [isActivePomodoro, setIsActivePomodoro] = useState(false);
  let [isActiveLargeBreak, setIsActiveLargeBreak] = useState(false);
  let [IsActiveDing , setIsActiveDing ] = useState(false);

  const timePredermined = () => {
    setTimeInSecondsSmallBreak(300);
    setTimeInSecondsPomodoro(1500);
    setTimeInSecondsLargeBreak(1800);
  };

  const reset = () => {
    setTimeInSecondsSmallBreak(0);
    setTimeInSecondsPomodoro(0);
    setTimeInSecondsLargeBreak(0);
    setIsActiveDing(false);
  };

  const disabledButtons = () => {
    if (isActivePomodoro) {
      setIsActiveSmallBreak(false);
      setIsActiveLargeBreak(false);
    } else if (isActiveSmallBreak) {
      setIsActivePomodoro(false);
      setIsActiveLargeBreak(false);
    } else if (isActiveLargeBreak) {
      setIsActiveSmallBreak(false);
      setIsActivePomodoro(false);
    }
  };

  const playDing = () => {
    const audio = new Audio(ding);
    audio.play();
  };

  return (
    <div className="container-general">
      <div className="buttons-inputs">
        <button
          className="button-predetermined-reset"
          style={{ background: "#6dc5fd" }}
          onClick={timePredermined}
        >
          Time Predetermined
        </button>
        <button
          className="button-predetermined-reset"
          style={{ background: "#00e8b5" }}
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <div className="container-timers">
        <div>
          <SmallBreak
            timeInSeconds={timeInSecondsSmallBreak}
            setTimeInSeconds={setTimeInSecondsSmallBreak}
            active={isActiveSmallBreak}
            setActive={setIsActiveSmallBreak}
            disabledButtons={disabledButtons}
            playDing={playDing}
            IsActiveDing={IsActiveDing}
            setIsActiveDing={setIsActiveDing}

          />
        </div>
        <div>
          <Pomodoro
            timeInSeconds={timeInSecondsPomodoro}
            setTimeInSeconds={setTimeInSecondsPomodoro}
            active={isActivePomodoro}
            setActive={setIsActivePomodoro}
            disabledButtons={disabledButtons}
            playDing={playDing}
            IsActiveDing={IsActiveDing}
            setIsActiveDing={setIsActiveDing}
          />
        </div>
        <div>
          <LargeBreak
            timeInSeconds={timeInSecondsLargeBreak}
            setTimeInSeconds={setTimeInSecondsLargeBreak}
            active={isActiveLargeBreak}
            setActive={setIsActiveLargeBreak}
            disabledButtons={disabledButtons}
            playDing={playDing}
            IsActiveDing={IsActiveDing}
            setIsActiveDing={setIsActiveDing}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
