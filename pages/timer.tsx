import * as React from 'react';
import { timer } from 'rxjs';
import { useObservable } from '../lib/useObservable.hook';
import { tap } from 'rxjs/operators';
import Link from 'next/link';

const from = {
  text: 'The Best Way To Unsubscribe RxJS Observables — Tomas Trajan',
  url:
    'https://blog.angularindepth.com/the-best-way-to-unsubscribe-rxjs-observable-in-the-angular-applications-d8f9aa42f6a0',
};

const From = React.memo(() => (
  <p>
    <span>From: </span>
    <a href={from.url} rel="noopener noreferrer" target="_blank">
      {from.text}
    </a>
  </p>
));

const LinkHome = () => (
  <Link href="/">
    <a>Home</a>
  </Link>
);

const TimeDisplay = ({ time }: { time: number }) => (
  <main>
    <From />
    <h1>Timelapsed: {time}</h1>
    <LinkHome />
  </main>
);

const Timer = () => {
  const second = timer(0, 1000).pipe(tap(sec => console.log(sec)));
  const time = useObservable(second, 0);
  return <TimeDisplay time={time} />;
};

export default Timer;
