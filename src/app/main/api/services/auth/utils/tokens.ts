import { AuthData } from "./utils.ts";

const LOCAL_STORAGE_KEY = "auth_data";


const getAuthDataFromStorage = (): AuthData | null => {
    const stringData: string | null = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stringData === null) return null;
    return JSON.parse(stringData);
}


const saveAuthDataToStorage = (authData: AuthData | null): void => {
    sessionStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));
}

export {
    getAuthDataFromStorage,
    saveAuthDataToStorage
}