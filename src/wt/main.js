
import { Worker } from 'worker_threads';
import os from 'os';
import __relative from '../modules/__relative.js'

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const filename = __relative(import.meta.url, './worker.js')
    const workers = []

    for (let i = 0; i < numCores; i++) {
        workers.push(
            new Promise((resolve, reject) => {
                const worker = new Worker(filename)
                const data = 10 + i;
                worker.postMessage(data);
                worker.on('message', (data) => {
                    resolve(data)
                })
                worker.on('error', (err) => {
                    resolve(data);
                })
            })
        )
    }

    Promise.all(workers).then(results => {
        console.log(results);
        process.exit(0)
    })
};

await performCalculations();