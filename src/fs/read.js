import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs'

const read = async () => {
    const filepath = __relative(import.meta.url, 'files/fileToRead.txt');

    try {
        const stats = await fs.stat(filepath)

        if (stats.isFile()) {
            const content = await fs.readFile(filepath, 'utf-8');
            console.log(content);
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
