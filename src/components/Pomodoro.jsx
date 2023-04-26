import { useEffect, useState } from "react";
import { Circle } from "rc-progress";

const Pomodoro = ({
  timeInSeconds,
  setTimeInSeconds,
  active,
  setActive,
  disabledButtons,
  playDing,
  IsActiveDing , 
  setIsActiveDing
}) => {

  let [ hundredPercentInSeconds, setHundredPercentInSeconds ] = useState(0);
  let [ inicialTime, setInicialTime ] = useState(0);

  useEffect(() => {
    let interval;
    if (active && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds(timeInSeconds - 1);
      }, 1000);
      setIsActiveDing(true);
    } else if (timeInSeconds === 0 && IsActiveDing) {
      clearInterval(interval);
      setActive(false);
      playDing();
      setIsActiveDing(false);
    }

    return () => clearInterval(interval);
  }, [active, timeInSeconds]);

  const start = () => {
    setActive(true);
    setInicialTime(timeInSeconds);
    setHundredPercentInSeconds(timeInSeconds);
    disabledButtons();
  };

  const stop = () => {
    setActive(false);
    setTimeInSeconds(inicialTime);
  };

  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds % 60;
  let percentage = (timeInSeconds * 100) / hundredPercentInSeconds;

  return (
    <div className="timer">
      <h1>Pomodoro</h1>
      <Circle
        percent={active ? percentage : 0}
        strokeWidth={6}
        strokeColor="#006d89"
        style={{ width: 270 }}
      />
      <p>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <div className="buttons-inputs">
        <input
          type="range"
          value={timeInSeconds}
          min={0}
          max={5400}
          onChange={(e) => setTimeInSeconds(e.target.value)}
          disabled={active}
        />
        <input
          type="number"
          value={timeInSeconds}
          min={0}
          max={5400}
          onChange={(e) => setTimeInSeconds(e.target.value)}
          className="input-number"
          disabled={active}
        />
      </div>
      <div className="buttons-inputs">
        <button className='buttons' style={{background: 'rgb(88, 255, 88)'}} onClick={start} disabled={timeInSeconds === 0}>
          Start
        </button>
        <button className='buttons' style={{background: 'rgb(255, 108, 108)'}} onClick={stop}>Stop</button>
      </div>
    </div>
  );
};

export default Pomodoro;
