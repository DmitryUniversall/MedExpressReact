import { FC } from "react";
import { useTranslation } from "react-i18next";

const Header: FC = () => {
    const { t } = useTranslation("index");

    return (
        <header id="header" className="w-100">
            <div className="intro">
                <div className="overlay">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center intro-text">
                                <h1>
                                    { t("header.title") }
                                </h1>
                                <p>{ t("header.description") }</p>
                                <a className="btn btn-intro btn-lg page-scroll">
                                    { t("header.learn_more_button") }
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header;
