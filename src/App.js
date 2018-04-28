import React from "react";
import { of, fromEvent } from "rxjs";
import { map, filter, flatMap } from "rxjs/operators";
import "./App.css";

const tap = console.log.bind(null);

// it allows you to specify the *dynamic behavior* of a value completely *at the time of declaration*
// ^ you cannot rely on state outside of the stream 🙏 💯

// const a = of(3, 4);
// const b = a.pipe(map(v => v * 10));
// const click = () => b.subscribe(tap);

const isChecked = event => event.currentTarget.checked;

const req$ = of("https://api.github.com/users/bhongy/repos");
req$
  .pipe(flatMap(reqUrl => fetch(reqUrl)), flatMap(res => res.json()))
  .subscribe(tap);

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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <button onClick={click}>Run RxJS Example</button> */}
        <input
          type="checkbox"
          ref={el => {
            this.checkEvent$ = fromEvent(el, "change");
          }}
        />
        <p>{this.state.on ? "✔ on" : "✘ off"}</p>
      </div>
    );
  }
}

export default App;
