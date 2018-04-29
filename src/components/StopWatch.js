import React from "react";
import { fromEvent, interval } from "rxjs";
import { switchMapTo, takeUntil, scan } from "rxjs/operators";

class StopWatch extends React.Component {
  state = { time: 0 };

  componentDidMount() {
    const startClick = fromEvent(this.startButton, "click");
    const stopClick = fromEvent(this.stopButton, "click");

    startClick
      .pipe(
        switchMapTo(interval(100).pipe(takeUntil(stopClick))),
        scan(
          time => time + 1,
          this.state.time // <-- immutable at the time of declaration
        )
      )
      .subscribe(v => {
        this.setState({ time: v });
      });
  }

  render() {
    return (
      <div>
        <h3>StopWatch Example</h3>
        <p>{this.state.time}</p>
        <p>
          <button ref={el => (this.startButton = el)}>Start</button>
          <button ref={el => (this.stopButton = el)}>Stop</button>
        </p>
      </div>
    );
  }
}

export default StopWatch;
