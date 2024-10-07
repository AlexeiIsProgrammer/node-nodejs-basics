import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs'

const remove = async () => {
    const filepath = __relative(import.meta.url, 'files/fileToRemove.txt');

    try {
        const stats = await fs.stat(filepath)

        if (stats.isFile()) {
            await fs.unlink(filepath)
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(err.message);
        }
    }
};

await remove();
