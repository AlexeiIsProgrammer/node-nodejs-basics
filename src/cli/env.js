const parseEnv = () => {
    const args = process.env
    let str = ''
    for (const key in args) {
        if (key.startsWith('RSS_')) {
            str = `${str}${key}=${args[key]}; `;
        }
    }
    console.log(str);
};

parseEnv();