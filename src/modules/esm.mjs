import path from 'path'
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import './files/c.js';
import a from './files/a.json' assert { type: 'json' };
import b from './files/b.json' assert { type: 'json' };
import __relativeFilename from './__relativeFilename.js';
import __relative from './__relative.js';

const random = Math.random();

export const unknownObject = random > 0.5 ? a : b;

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__relativeFilename(import.meta.url)}`);
console.log(`Path to current directory is ${__relative(import.meta.url)}`);

export const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});


