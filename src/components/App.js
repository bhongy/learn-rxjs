import React from "react";
import { fromEvent } from "rxjs";
import { map, filter } from "rxjs/operators";
import Repositories from "./Repositories";
import "./App.css";

const tap = console.log.bind(null);

// it allows you to specify the *dynamic behavior* of a value completely *at the time of declaration*
// ^ you cannot rely on state outside of the stream 🙏 💯

// const a = of(3, 4);
// const b = a.pipe(map(v => v * 10));
// const click = () => b.subscribe(tap);

const isChecked = event => event.currentTarget.checked;
class App extends React.Component {
  checkEvent$: null;
  state = { on: false };

  componentDidMount() {
    // it's immutable -> always returns a new stream
    const onlyChecked$ = this.checkEvent$.pipe(map(isChecked));
    onlyChecked$.subscribe(checked => this.setState({ on: checked }));
    onlyChecked$
      .pipe(filter(checked => checked === true), map(checked => "✔ true︎"))
      .subscribe(tap);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Github Repositories</h1>
        </header>
        <div className="App-content">
          <Repositories />
          {/* <button onClick={click}>Run RxJS Example</button> */}
          <input
            type="checkbox"
            ref={el => {
              this.checkEvent$ = fromEvent(el, "change");
            }}
          />
          <p>{this.state.on ? "✔ on" : "✘ off"}</p>
        </div>
      </div>
    );
  }
}

export default App;
