
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';

const write = async () => {
    const filepath = __relative(import.meta.url, 'files/fileToWrite.txt');

    try {
        const stats = await fsPromises.stat(filepath)

        if (stats.isFile()) {
            const stream = fs.createWriteStream(filepath);
            console.log('Write smth here: \n');
            process.stdin.on('data', (data) => {
                stream.write(data)
            })
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(err.message);
        }
    }
};

await write();