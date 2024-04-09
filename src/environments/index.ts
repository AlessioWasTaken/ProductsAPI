import devEnvironment from "./dev.environment";

type Environment = {
    userDB: string,
    passwordDB: string,
    origins: string[],
    serverPort: number,
    urlDB: string,
    portDB: number
}

export default () => {
    const runningEnv = process.env.NODE_ENV;
    let envData: Environment;
    switch (runningEnv) {
        case 'dev':
            envData = devEnvironment;
            break;
        case 'prod':
            break;
    }
    return envData;
};