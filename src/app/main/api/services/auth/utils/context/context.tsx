import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { UserPrivate } from "../../models/user.ts";
import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { AuthData } from "../../internal_utils/utils.ts";
import ApiResponse from "../../../../api_response.ts";
import { getAuthDataFromStorage, saveAuthDataToStorage } from "../../internal_utils/tokens.ts";
import { loginAPICall, LoginRequestParams, registerAPICall, RegisterRequestParams } from "../../service.ts";
import { setupAxiosClient } from "../../../../../../core/http/axios_client.ts";
import { pathSearch } from "../../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../../layouts/main_layout/routing.ts";

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
    const navigate = useNavigate();
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [isReady, setReady] = useState<boolean>(false);

    useEffect(() => {
        const authData: AuthData | null = getAuthDataFromStorage();
        if (authData) setAuthData(authData);

        setupAxiosClient(() => authData, setAuthData, logoutUser);
        setReady(true);
    }, [])

    const registerUser = async (params: RegisterRequestParams): Promise<ApiResponse<AuthData>> => {
        const response: AxiosResponse<ApiResponse<AuthData>> = await registerAPICall(params);

        const authData: AuthData = response.data.data;
        saveAuthDataToStorage(authData);  // TODO: Make it in custom setAuthData?
        setAuthData(authData);
        navigate(pathSearch(mainLayoutRouting, "main=>index", {}));

        return response.data;
    }

    const loginUser = async (params: LoginRequestParams): Promise<ApiResponse<AuthData>> => {
        const response: AxiosResponse<ApiResponse<AuthData>> = await loginAPICall(params);

        const authData: AuthData = response.data.data;
        saveAuthDataToStorage(authData);
        setAuthData(authData);
        navigate(pathSearch(mainLayoutRouting, "main=>index", {}));

        return response.data;
    }

    const logoutUser = () => {
        saveAuthDataToStorage(null);
        setAuthData(null);
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
