import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs'
import path from 'path'

async function copyDirectory(source, destination) {
    try {
        await fs.mkdir(destination, { recursive: true });

        const files = await fs.readdir(source);

        for (const file of files) {
            const sourceFile = path.join(source, file);
            const destinationFile = path.join(destination, file);

            const stats = await fs.stat(sourceFile);
            if (stats.isDirectory()) {
                await copyDirectory(sourceFile, destinationFile);
            } else {
                await fs.copyFile(sourceFile, destinationFile);
            }
        }
    } catch (error) {
        console.error('Error copying directory:', error.message);
    }
}

const copy = async () => {
    const filesPath = __relative(import.meta.url, 'files');
    const copyDirectoryPath = __relative(import.meta.url, 'files_copy');

    try {
        const stats = await fs.stat(filesPath)

        if (stats.isDirectory()) {
            try {
                const copyStats = await fs.stat(copyDirectoryPath)

                console.log('tut');
                if (copyStats.isDirectory()) {
                    throw new Error('FS operation failed');
                }
            } catch (err) {
                if (err.code === 'ENOENT') {
                    copyDirectory(filesPath, copyDirectoryPath)
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

await copy();
