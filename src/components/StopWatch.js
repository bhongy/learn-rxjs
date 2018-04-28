import React from "react";
import { fromEvent, interval } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";

class StopWatch extends React.Component {
  state = { time: 0 };

  componentDidMount() {
    const start = fromEvent(this.startButton, "click");
    const stop = fromEvent(this.stopButton, "click");

    start
      .pipe(switchMap(() => interval(100).pipe(takeUntil(stop))))
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
