
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';

const read = async () => {
    const filepath = __relative(import.meta.url, 'files/fileToRead.txt');

    try {
        const stats = await fsPromises.stat(filepath)

        if (stats.isFile()) {
            const stream = fs.createReadStream(filepath);

            let content = '';

            stream.on('data', (data) => {
                content += data
            })

            stream.on('close', () => {
                process.stdout.write(content)
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

await read();