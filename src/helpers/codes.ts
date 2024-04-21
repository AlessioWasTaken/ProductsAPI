import { checkExistCodes } from "../db/order.db";

export const generateUniqueCode = async (): Promise<string> => {
    let codeNumber = 1;
    let unique = false;
    let code = '';

    while (!unique) {
        code = `A${codeNumber.toString().padStart(3, '0')}`;
        if(await checkExistCodes(code)){
            unique = true;
        }else{
            codeNumber++;
        }
    };
    return code;
};