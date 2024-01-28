import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

parentPort.on('message', (message) => {
    const modifiedMessage = nthFibonacci(message)

    if (Math.random() < 0.9) { // For error handling
        parentPort.postMessage({ status: 'resolved', data: modifiedMessage });
    } else {
        parentPort.postMessage({ status: 'error', data: null });
    }
});
