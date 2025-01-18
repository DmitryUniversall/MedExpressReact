import { FC } from "react";
import "./menu.css"
import { useTranslation } from "react-i18next";


const Menu: FC = () => {
    const { t } = useTranslation(["menu", "common"])

    return (
        <nav id="menu" className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <a className="navbar-brand page-scroll" href="#page-top">
                    { t("common:company_name") }
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link page-scroll" href="#features">
                                Features
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link page-scroll" href="#about">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link page-scroll" href="#services">
                                Services
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link page-scroll" href="#contact">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}


export default Menu;
