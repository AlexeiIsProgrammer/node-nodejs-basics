import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs'
import path from 'path'

async function printFiles(source) {
    try {
        const files = await fs.readdir(source);

        for (const file of files) {
            const stats = await fs.stat(path.join(source, file));
            if (!stats.isDirectory()) {
                console.log(file);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const list = async () => {
    const filesPath = __relative(import.meta.url, 'files');

    try {
        const stats = await fs.stat(filesPath)

        if (stats.isDirectory()) {
            printFiles(filesPath)
        }

    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(err.message);
        }
    }
};

await list();
