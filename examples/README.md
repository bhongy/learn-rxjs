To run an example:

```sh
$ yarn tsc -p examples/<example>
$ cd examples/<example>/dist
$ node <main.js>
```

Each individual example contains `tsconfig.json` so `dist` is inside each example so the relative path is simple.
