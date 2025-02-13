import { AxiosResponse } from "axios";
import { UserPrivate } from "../../models/user.ts";
import { createContext, FC, ReactNode, useEffect, useRef, useState } from "react";
import { AuthData } from "../../internal_utils/utils.ts";
import ApiResponse from "../../../../api_response.ts";
import { getAuthDataFromStorage, saveAuthDataToStorage } from "../../internal_utils/tokens.ts";
import { loginAPICall, LoginRequestParams, registerAPICall, RegisterRequestParams } from "../../service.ts";
import { setupAxiosClient } from "../../../../../../core/http/axios_client.ts";

interface AuthContextData {
    user: UserPrivate | null;
    registerUser: (data: RegisterRequestParams) => Promise<ApiResponse<AuthData>>;
    loginUser: (data: LoginRequestParams) => Promise<ApiResponse<AuthData>>;
    logoutUser: () => void;
    isAuthenticated: () => boolean;
}

type UserContextProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContextProvider: FC<UserContextProps> = ({ children }: UserContextProps) => {
    const [ authData, setAuthData ] = useState<AuthData | null>(null);
    const [ isReady, setReady ] = useState<boolean>(false);
    const authDataRef = useRef(authData);

    useEffect(() => {
        saveAuthDataToStorage(authData);
        authDataRef.current = authData;
    }, [authData]);

    useEffect(() => {
        const storedAuthData: AuthData | null = getAuthDataFromStorage();
        if (storedAuthData) setAuthData(storedAuthData);

        setupAxiosClient(() => authDataRef.current, setAuthData, logoutUser);
        setReady(true);
    }, []);

    const registerUser = async (params: RegisterRequestParams): Promise<ApiResponse<AuthData>> => {
        const response: AxiosResponse<ApiResponse<AuthData>> = await registerAPICall(params);
        const authData: AuthData = response.data.data;
        setAuthData(authData);
        return response.data;
    }

    const loginUser = async (params: LoginRequestParams): Promise<ApiResponse<AuthData>> => {
        const response: AxiosResponse<ApiResponse<AuthData>> = await loginAPICall(params);
        const newAuthData: AuthData = response.data.data;
        setAuthData(newAuthData);
        return response.data;
    }

    const logoutUser = () => setAuthData(null);

    const isAuthenticated = () => !!authData;

    return (
        <AuthContext.Provider value={ {
            registerUser,
            loginUser,
            logoutUser,
            isAuthenticated,
            user: authData != null ? authData.user : null
        } }>
            { isReady && children }
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthContextProvider
}

export type {
    AuthContextData
}
