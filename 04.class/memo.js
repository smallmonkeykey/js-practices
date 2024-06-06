import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let memoLines = [];

rl.on('line', (line) => {
	memoLines.push(line);
});

rl.on('close', () => {
    console.log(memoLines);
});

