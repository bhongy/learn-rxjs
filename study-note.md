an observable is finished in two ways:
  - on "complete"
  - on "error", without calling "complete" handler

if the error is thrown from the observable (i.e. `observer.error`) and there is no error handler specified on the observer, the error will be re-thrown 