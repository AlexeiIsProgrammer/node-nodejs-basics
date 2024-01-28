import { spawn } from 'child_process';
import __relative from '../modules/__relative.js';

function spawnChildProcess(args) {
    const childProcess = spawn('node', [__relative(import.meta.url, 'files/script.js'), ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    });

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.pipe(process.stdout);
}

spawnChildProcess(['1one', '2two', '3three']);