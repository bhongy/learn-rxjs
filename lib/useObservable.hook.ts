import * as React from 'react';
import { Observable } from 'rxjs';

// https://github.com/leandrohsilveira/reactjs-hooks-rxjs#the-magical-hook
export function useObservable<T>(
  observable: Observable<T>,
  initialValue: T
): T {
  const [value, setValue] = React.useState(initialValue);

  // it ensure the observable is unsubscribed when component unmount
  React.useEffect(() => {
    const s = observable.subscribe(v => setValue(v));
    return () => s.unsubscribe();
  }, []);

  return value;
}
