import { useEffect, useState } from "react";
import TimeControl from "./TimeControl";
import { TimerState } from "./Types";
import "./App.css";
import beepURL from "./assets/beep.wav";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const [currentTimerState, setCurrentTimerState] =
    useState<TimerState>("session");

  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);

  const secondsToDisplay = (): string => {
    const minutes: string = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds: string = (timeLeft % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const [timerPaused, setTimerPaused] = useState(true);

  // Handle timer counting

  const handleTimer = () => {
    if (timerPaused) {
      return;
    }
    setTimeLeft(timeLeft - 1);
    if (timeLeft <= 0) {
      const timerState: TimerState =
        currentTimerState == "break" ? "session" : "break";
      activateAlarm();
      resetTimer(timerState);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleTimer();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  const resetTimer = (stateToReset: TimerState) => {
    setCurrentTimerState(stateToReset);
    setTimeLeft(
      stateToReset == "session" ? sessionLength * 60 : breakLength * 60
    );
  };

  const fullReset = () => {
    setTimerPaused(true);
    resetTimer("session");
    setBreakLength(5);
    setSessionLength(25);
    stopAlarm();
  };

  // Change timer on current session length change
  useEffect(() => {
    resetTimer(currentTimerState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionLength, breakLength]);

  // Audio Controls and setup
  const alarm: HTMLAudioElement = document.getElementById(
    "beep"
  ) as HTMLAudioElement;

  const activateAlarm = () => {
    alarm.play();
  };

  const stopAlarm = () => {
    alarm.pause();
    alarm.currentTime = 0;
  };

  return (
    <>
      <div id="time-controls">
        <TimeControl
          name="session"
          timeLength={sessionLength}
          setTimeLength={setSessionLength}
        />
        <div
          id="time-controls-divider"
          style={{ display: "inline-block" }}
        ></div>
        <TimeControl
          name="break"
          timeLength={breakLength}
          setTimeLength={setBreakLength}
        />
      </div>

      <div id="timer">
        <p id="timer-label">{currentTimerState}</p>
        <p id="time-left">{secondsToDisplay()}</p>
        <button id="start_stop" onClick={() => setTimerPaused(!timerPaused)}>
          {timerPaused ? "Play" : "Pause"}
        </button>
        <button id="reset" onClick={fullReset}>
          Reset
        </button>
        <audio id="beep" src={beepURL} />
      </div>

      {/* Testing purposes */}
      {/* <button onClick={activateAlarm}>Audio</button> */}
      {/* <button
        onClick={() =>
          setCurrentTimerState(
            currentTimerState == "break" ? "session" : "break"
          )
        }
      >
        Switch Timer State
      </button>
      <button onClick={updateTimeOneSecond}>Move One Second</button> */}
    </>
  );
}

export default App;
