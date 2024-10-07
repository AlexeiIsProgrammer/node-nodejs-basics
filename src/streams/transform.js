
import __relative from '../modules/__relative.js';
import { Transform } from 'stream';

const transform = async () => {
    console.log('Write smth here for transforming:');

    const reversed = new Transform({
        transform(chunk, _, callback) {
            const reversedData = chunk.toString().split('').reverse().join('');
            this.push(reversedData);
            callback();
        }
    });

    reversed.on('data', (data) => {
        console.log('Your reversed input is:');
        process.stdout.write(data.toString());

        console.log('\nWrite smth here for transforming:');
    });

    process.stdin.pipe(reversed);
};

await transform();