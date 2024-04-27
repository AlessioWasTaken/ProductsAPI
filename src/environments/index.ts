import devEnvironment from "./dev.environment";
import workstationEnvironment from "./workstation.environment";

type Environment = {
    userDB: string,
    passwordDB: string,
    databaseName: string,
    serverPort: number,
    urlDB: string,
    portDB: number,
    secretKey: string
}

export default () => {
    const runningEnv = process.env.NODE_ENV;
    let envData: Environment;
    switch (runningEnv) {
        case 'dev':
            envData = devEnvironment;
            break;
        case 'workstation':
            envData = workstationEnvironment;
            break;
        case 'prod':
            break;
    }
    return envData;
};