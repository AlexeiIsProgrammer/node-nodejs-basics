import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs'

const rename = async () => {
    const filepath = __relative(import.meta.url, 'files/wrongFilename.txt');
    const newFilepath = __relative(import.meta.url, 'files/properFilename.md');

    try {
        const stats = await fs.stat(filepath)

        if (stats.isFile()) {
            try {
                const newFile = await fs.stat(newFilepath)

                if (newFile.isFile()) {
                    throw new Error('FS operation failed');
                }
            } catch (err) {
                if (err.code === 'ENOENT') {
                    await fs.rename(filepath, newFilepath)
                } else {
                    throw new Error(err.message);
                }
            }
        }

    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } else {
            throw new Error(err.message);
        }
    }
};

await rename();
