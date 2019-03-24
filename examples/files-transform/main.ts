// from: https://medium.freecodecamp.org/rxjs-and-node-8f4e0acebc7c

import * as fs from 'fs';
import * as path from 'path';
import { Observable, bindNodeCallback } from 'rxjs';
import { map, flatMap, switchMap, tap } from 'rxjs/operators';

// interface ReadDir$ {
//   (path: fs.PathLike): Observable<string[]>;
// }

// const readdir: ReadDir$ = bindNodeCallback(fs.readdir);
const readFile = bindNodeCallback(fs.readFile);
const writeFile = bindNodeCallback(fs.writeFile);

const outDir = path.resolve(__dirname);
const filesDir = path.resolve(outDir, '../files');

interface Parsed {
  content: string;
  filename: string;
}

const bufferToJson = (buffer: Buffer): Parsed => JSON.parse(buffer.toString());
const processFile = (file: string) =>
  readFile(path.join(filesDir, file)).pipe(
    map(bufferToJson),
    switchMap(({ content, filename }: Parsed) => {
      const writeTo = path.join(outDir, filename);
      const data = { content, filename: null };
      return writeFile(writeTo, JSON.stringify(data, null, 2)).pipe(
        map(() => filename)
      );
    })
  );

processFile('1.json').subscribe(
  v => console.log(v),
  e => console.error(e),
  () => console.log('completed')
);
