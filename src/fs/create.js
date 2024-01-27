import fs from 'fs';
import __relative from '../modules/__relative.js';

const create = async () => {
    const filePath = __relative(import.meta.url, 'files/fresh.txt');
    const content = 'I am fresh and young';

    fs.stat(filePath, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile(filePath, content, (err) => {
                    if (err) {
                        throw new Error('Something went wrong... ', err.message);
                    } else {
                        console.log('File created successfully!');
                    }
                });
            } else {
                throw new Error('Something went wrong... ', err.message);
            }
        } else {
            if (stats.isFile()) {
                throw new Error('FS operation failed');
            }
        }
    })

};

await create();