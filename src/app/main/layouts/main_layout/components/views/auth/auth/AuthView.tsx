import React, { FC, useEffect, useState } from "react";
import "./auth.css"
import { classNames } from "../../../../../../../core/utils/utils.ts";
import AuthFormInput from "./components/AuthFormInput.tsx";
import { useAuth } from "../../../../../../api/services/auth/utils/context/hook.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { pathSearch } from "../../../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../routing.ts";
import ApiRequestError from "../../../../../../api/errors/api_request_error.ts";
import ApiRespondedError from "../../../../../../api/errors/api_responded_error.ts";

enum AuthType {
    login = "login",
    register = "register"
}

interface AuthFormState {
    email: string;
    password: string;
    password_confirmation: string;
    first_name: string;
    last_name: string;
}

const initialAuthFormState: AuthFormState = {
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: ""
};


const validateForm = (form: AuthFormState, authType: AuthType) => {
    const formErrors: Partial<AuthFormState> = {};

    if (!form.email) {
        formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        formErrors.email = "Invalid email format";
    }

    if (!form.password) formErrors.password = "Password is required";

    if (authType === AuthType.register) {
        if (!form.first_name) formErrors.first_name = "First name is required";
        if (!form.last_name) formErrors.last_name = "Last name is required";
        if (form.password !== form.password_confirmation) formErrors.password_confirmation = "Passwords do not match";
    }

    return formErrors;
};


const AuthView: FC = () => {
    const { loginUser, registerUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [authError, setAuthError] = useState<string>("");
    const [errors, setErrors] = useState<Partial<AuthFormState>>({});
    const [authType, setAuthType] = useState<AuthType>(AuthType.login);
    const [authFormState, setAuthFormState] = useState<AuthFormState>(initialAuthFormState)

    useEffect(() => {
        if (isAuthenticated()) {
            navigate(pathSearch(mainLayoutRouting, "main=>index", {}));  // TODO: history.goBack()
            return;
        }
    }, [isAuthenticated, navigate])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAuthFormState({ ...authFormState, [name]: value } as Pick<AuthFormState, keyof AuthFormState>);
    };

    const handleSetAuthType = (authType: AuthType) => {
        setAuthType(authType);
        setErrors({})
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const errors: Partial<AuthFormState> = validateForm(authFormState, authType)
        setErrors(errors)

        if (Object.keys(errors).length !== 0) return;
        await handleAuth();
    };

    const handleAuth = async () => {
        try {
            if (authType == AuthType.login) {
                await loginUser(authFormState);
            } else {
                await registerUser(authFormState);
            }
        } catch (error) {
            if (error instanceof Error) console.error('Authentication failed: ', error);
            toast.error("Auth failed");  // TODO: Translate it

            if (error instanceof ApiRequestError) {
                setAuthError("Authentication failed: Unknown error occurred.");  // TODO: Translate it
            } else if (error instanceof ApiRespondedError) {
                setAuthError(`Authentication failed: ${ error.responseData.message }`);  // TODO: Translate it
            } else {
                console.error("Unknown error occurred during authentication");
            }

            return;
        }


        toast.success("Auth successful");
        navigate(pathSearch(mainLayoutRouting, "main=>index", {}));
    }

    return (
        <div id="auth_view" className="text-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="auth-main col-11 col-sm-9 col-md-7 col-lg-5">
                        <h2 className="auth-title mb-4 fs-1">Авторизация</h2>
                        <div className="auth-card">
                            <div className="auth-nav d-flex flex-column flex-sm-row">
                                <button
                                    className={ classNames("btn w-100 auth-type", { active: authType == AuthType.login }) }
                                    onClick={ () => handleSetAuthType(AuthType.login) }>Вход
                                </button>
                                <button
                                    className={ classNames("btn w-100 auth-type", { active: authType == AuthType.register }) }
                                    onClick={ () => handleSetAuthType(AuthType.register) }>Регистрация
                                </button>
                            </div>

                            <form
                                id="auth_form"
                                onSubmit={ handleSubmit }
                                className="mb-3"
                            >
                                <div className="d-flex flex-column gap-4">
                                    {
                                        authType === AuthType.login
                                            ? (
                                                <>
                                                    <AuthFormInput
                                                        handleInputChange={ handleInputChange }
                                                        name={ "email" }
                                                        type={ "text" }
                                                        placeholder={ "Email" }
                                                        value={ authFormState.email }
                                                        error={ errors.email }/>
                                                    <AuthFormInput
                                                        handleInputChange={ handleInputChange }
                                                        name={ "password" }
                                                        type={ "password" }
                                                        placeholder={ "Пароль" }
                                                        value={ authFormState.password }
                                                        error={ errors.password }/>
                                                </>
                                            )
                                            : (
                                                <>
                                                    <AuthFormInput
                                                        handleInputChange={ handleInputChange }
                                                        name={ "first_name" }
                                                        type={ "text" }
                                                        placeholder={ "Имя" }
                                                        value={ authFormState.first_name }
                                                        error={ errors.first_name }/>
                                                    <AuthFormInput
                                                        handleInputChange={ handleInputChange }
                                                        name={ "last_name" }
                                                        type={ "text" }
                                                        placeholder={ "Фамилия" }
                                                        value={ authFormState.last_name }
                                                        error={ errors.last_name }/>
                                                    <AuthFormInput
                                                        handleInputChange={ handleInputChange }
                                                        name={ "email" }
                                                        type={ "text" }
                                                        placeholder={ "Email" }
                                                        value={ authFormState.email }
                                                        error={ errors.email }/>
                                                    <AuthFormInput
                                                        handleInputChange={ handleInputChange }
                                                        name={ "password" }
                                                        type={ "password" }
                                                        placeholder={ "Пароль" }
                                                        value={ authFormState.password }
                                                        error={ errors.password }/>
                                                    <AuthFormInput
                                                        handleInputChange={ handleInputChange }
                                                        name={ "password_confirmation" }
                                                        type={ "password" }
                                                        placeholder={ "Подтверждение пароля" }
                                                        value={ authFormState.password_confirmation }
                                                        error={ errors.password_confirmation }/>
                                                </>
                                            )
                                    }

                                    <button className={ classNames("btn w-100 btn-custom-primary") } type="submit">
                                        { authType == AuthType.login ? "Вход" : "Регистрация" }
                                    </button>
                                </div>
                            </form>

                            <div className={ classNames("error", { "error-show": !!authError }) }>
                                <span className="w-100 text-center">{ authError }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AuthView;
