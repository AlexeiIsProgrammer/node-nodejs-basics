
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';
import crypto from 'crypto';

const calculateHash = async () => {
    const filepath = __relative(import.meta.url, 'files/fileToCalculateHashFor.txt');
    const hash = crypto.createHash('sha256');

    try {
        const stats = await fsPromises.stat(filepath)

        if (stats.isFile()) {
            const stream = fs.createReadStream(filepath);

            stream.on('data', (data) => {
                hash.update(data);
            })

            stream.on('close', () => {
                console.log('Hash is', hash.digest("hex"));
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

await calculateHash();