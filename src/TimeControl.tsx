import React from "react";
import { TimerState } from "./Types";

interface Props {
  timeLength: number;
  setTimeLength: React.Dispatch<React.SetStateAction<number>>;
  name: TimerState;
}

const TimeControl: React.FC<Props> = (props) => {
  const capitolizedName = props.name[0].toUpperCase() + props.name.slice(1);

  const sideMargins = 5;
  const style: React.CSSProperties = {
    display: "inline",
    marginLeft: sideMargins,
    marginRight: sideMargins,
  };

  return (
    <div id={props.name + "-controls"} className="time-control">
      <p id={props.name + "-label"} className="time-control-label">
        {capitolizedName} Length
      </p>
      <div>
        <button
          id={props.name + "-decrement"}
          className="time-control-button"
          onClick={() => {
            if (props.timeLength <= 1) {
              return;
            }
            props.setTimeLength(props.timeLength - 1);
          }}
        >
          -
        </button>
        <p
          id={props.name + "-length"}
          className="time-control-length"
          style={style}
        >
          {props.timeLength}
        </p>
        <button
          id={props.name + "-increment"}
          className="time-control-button"
          onClick={() => {
            if (props.timeLength >= 60) {
              return;
            }
            props.setTimeLength(props.timeLength + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default TimeControl;
