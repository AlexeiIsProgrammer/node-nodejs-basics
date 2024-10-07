const parseArgs = () => {
    const args = process.argv.slice(2)
    let str = '';
    for (let i = 0; i < args.length; i += 2) {
        str = `${str}${args[i]} is ${args[i + 1]}${i + 2 !== args.length ? ', ' : ''}`;
    }
    console.log(str);
};

parseArgs();