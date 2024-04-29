import devEnvironment from "./dev.environment";
import laptopEnvironment from "./laptop.environment";
import workstationEnvironment from "./workstation.environment";

type Environment = {
    userDB: string,
    passwordDB: string,
    databaseName: string,
    serverPort: number,
    urlDB: string,
    portDB: number,
    origins: string[],
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
        case 'laptop':
            envData = laptopEnvironment;
        case 'prod':
            break;
    }
    return envData;
};