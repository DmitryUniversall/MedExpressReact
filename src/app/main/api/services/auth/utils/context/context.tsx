import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { UserPrivate } from "../../models/user.ts";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { AuthData } from "../utils.ts";
import ApiResponse from "../../../../api_response.ts";
import { getAuthDataFromStorage, saveAuthDataToStorage } from "../tokens.ts";
import { loginAPICall, LoginRequestParams, registerAPICall, RegisterRequestParams } from "../../service.ts";

interface AuthContextData {
    user: UserPrivate | null;
    registerUser: (data: RegisterRequestParams) => Promise<ApiResponse<AuthData> | null>;
    loginUser: (data: LoginRequestParams) => Promise<ApiResponse<AuthData> | null>;
    logoutUser: () => void;
    isAuthenticated: () => boolean;
}

type UserContextProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthContextProvider: FC<UserContextProps> = ({ children }: UserContextProps) => {
    const navigate = useNavigate();
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        const authData: AuthData | null = getAuthDataFromStorage();
        if (authData) setAuthData(authData);
        setReady(true);
    }, [])

    const registerUser = async (params: RegisterRequestParams): Promise<ApiResponse<AuthData> | null> => {
        const response: AxiosResponse<ApiResponse<AuthData>> | null = await registerAPICall(params);

        if (!response || !response.data) return null;
        if (!response.data.ok) return response.data;

        const authData: AuthData = response.data.data;
        saveAuthDataToStorage(authData);
        setAuthData(authData);
        navigate("");

        return response.data;
    }

    const loginUser = async (params: LoginRequestParams): Promise<ApiResponse<AuthData> | null> => {
        const response: AxiosResponse<ApiResponse<AuthData>> | null = await loginAPICall(params);

        if (!response || !response.data) return null;
        if (!response.data.ok) return response.data;

        const authData: AuthData = response.data.data;
        saveAuthDataToStorage(authData);
        setAuthData(authData);
        navigate("");

        return response.data;
    }

    const logoutUser = () => {
        saveAuthDataToStorage(null);
        setAuthData(null);
        toast.success("Logout successful")
    }

    const isAuthenticated = () => {
        return !!authData;
    }

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
