import React, { FC } from "react";
import { classNames } from "../../../../../../../../core/utils/utils.ts";

interface AuthFormInputProps {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    error: string | undefined;
}

const AuthFormInput: FC<AuthFormInputProps> = ({ handleInputChange, name, type, placeholder, value, error }) => {
    return (
        <div>
            <label htmlFor={ name } className="form-label d-flex justify-content-left">
                { placeholder }
            </label>
            <input
                type={ type }
                name={ name }
                className={ classNames("form-control", { "is-invalid": !!error }) }
                placeholder={ placeholder }
                value={ value }
                onChange={ handleInputChange }
            />
            { error && <div className="invalid-feedback">{ error }</div> }
        </div>
    );
};


export default AuthFormInput
