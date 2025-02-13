import { AxiosResponse } from "axios";
import { UserPrivate } from "../../models/user.ts";
import { createContext, FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import ApiResponse from "../../../../api_response.ts";
import { loginAPICall, LoginRequestParams, registerAPICall, RegisterRequestParams } from "../../service.ts";
import { setupAxiosClient } from "../../../../../../core/http/axios_client.ts";
import useLocalStorage from "../../../../../../core/hooks/local_storage.ts";
import { AuthData } from "../../models/auth_data.ts";

const LOCAL_STORAGE_KEY = "auth_data";

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
    const [ authData, setAuthData ] = useLocalStorage<AuthData | null>(LOCAL_STORAGE_KEY, null);
    const [ isReady, setReady ] = useState<boolean>(false);
    const authDataRef = useRef(authData);

    const updateAuthData = useCallback((newAuthData: AuthData | null) => {
        authDataRef.current = newAuthData
        setAuthData(newAuthData);
    }, [setAuthData]);

    const logoutUser = useCallback(() => updateAuthData(null), [updateAuthData]);

    const isAuthenticated = () => !!authDataRef.current

    const registerUser = async (params: RegisterRequestParams): Promise<ApiResponse<AuthData>> => {
        const response: AxiosResponse<ApiResponse<AuthData>> = await registerAPICall(params);
        const authData: AuthData = response.data.data;
        updateAuthData(authData);
        return response.data;
    }

    const loginUser = async (params: LoginRequestParams): Promise<ApiResponse<AuthData>> => {
        const response: AxiosResponse<ApiResponse<AuthData>> = await loginAPICall(params);
        const newAuthData: AuthData = response.data.data;
        updateAuthData(newAuthData);
        return response.data;
    }

    useEffect(() => {
        setupAxiosClient(() => authDataRef.current, updateAuthData, logoutUser);
        setReady(true);
    }, [logoutUser, updateAuthData]);
    
    return (
        <AuthContext.Provider value={ {
            registerUser,
            loginUser,
            logoutUser,
            isAuthenticated,
            user: authDataRef.current != null ? authDataRef.current.user : null
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
