
import __relative from '../modules/__relative.js';
import { promises as fsPromises } from 'fs';

const transform = async () => {
    console.log('Write smth here for transforming: \n');
    let input = '';
    process.stdin.on('data', (data) => {
        input += data
    })

    const exitHandle = () => {
        console.log('Your reversed input is:');
        process.stdout.write(input.split('').reverse().join(''))
        process.exit(0);
    }

    process.stdin.on('end', exitHandle);

    process.on('SIGINT', exitHandle);

};

await transform();