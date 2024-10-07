import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs'

import zlib from 'zlib'

const compress = async () => {
    const filePath = __relative(import.meta.url, 'files/fileToCompress.txt');
    const archivePath = __relative(import.meta.url, 'files/archive.gz');

    try {
        const stats = await fsPromises.stat(filePath)

        if (!stats.isFile()) {
            throw new Error('Required file isn\'t file!');
        }

        const rs = fs.createReadStream(filePath);
        const ws = fs.createWriteStream(archivePath);

        const gzip = zlib.createGzip()
        rs.pipe(gzip).pipe(ws)

        ws.on('finish', () => {
            console.log('Finish compressing.');
        })
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(err.message);
        }
    }
};

await compress();
