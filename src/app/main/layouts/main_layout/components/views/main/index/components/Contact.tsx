import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

const initialState = {
    name: "",
    email: "",
    message: "",
};

const Contact: FC = () => {
    const [{ name, email, message }, setState] = useState(initialState);
    const { t } = useTranslation("index");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, email, message);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!e.target) return;
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div id="contact">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="section-title text-center mb-5">
                            <h2>{ t("contact.get_in_touch") }</h2>
                            <p>{ t("contact.fill_the_form") }</p>
                        </div>
                        <form name="sentMessage" onSubmit={ handleSubmit } className="pt-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder={ t("contact.name_placeholder") }
                                            required
                                            onChange={ handleChange }
                                        />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder={ t("contact.email_placeholder") }
                                            required
                                            onChange={ handleChange }
                                        />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="message"
                                    id="message"
                                    className="form-control"
                                    rows={ 4 }
                                    placeholder={ t("contact.message_placeholder") }
                                    required
                                    onChange={ handleChange }
                                />
                                <p className="help-block text-danger"></p>
                            </div>
                            <div className="d-flex justify-content-center w-100">
                                <button type="submit" className="btn btn-custom-contact btn-lg">
                                    { t("contact.send_message_button") }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Contact
