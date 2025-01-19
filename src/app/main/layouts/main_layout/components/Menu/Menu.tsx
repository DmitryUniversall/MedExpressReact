import { FC } from "react";
import "./menu.css"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pathSearch } from "../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../routing.ts";
import ScrollLink from "../../../../../core/routing/ScrollLink.tsx";
import { useAuth } from "../../../../api/services/auth/utils/context/hook.ts";


const Menu: FC = () => {
    const { t } = useTranslation(["menu", "common"])
    const { isAuthenticated } = useAuth();

    return (
        <nav id="menu" className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <ScrollLink className="navbar-brand" top={ 77 } to={ pathSearch(mainLayoutRouting, "main=>index", {}) }
                            id={ "header" }>
                    { t("common:company_name") }
                </ScrollLink>
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
                            <ScrollLink className="nav-link" top={ 77 }
                                        to={ pathSearch(mainLayoutRouting, "main=>index", {}) } id={ "features" }>
                                { t("menu:features") }
                            </ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link" top={ 77 }
                                        to={ pathSearch(mainLayoutRouting, "main=>index", {}) } id={ "about" }>
                                { t("menu:about") }
                            </ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link" top={ 77 }
                                        to={ pathSearch(mainLayoutRouting, "main=>index", {}) } id={ "services" }>
                                { t("menu:services") }
                            </ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link" top={ 77 }
                                        to={ pathSearch(mainLayoutRouting, "main=>index", {}) } id={ "FAQ" }>
                                { t("menu:FAQ") }
                            </ScrollLink>
                        </li>
                        <li className="nav-item">
                            {
                                isAuthenticated() ? (
                                    <Link className="nav-link" to={ pathSearch(mainLayoutRouting, "main=>profile", {}) }>
                                        { t("menu:profile") }
                                    </Link>
                                ) : (
                                    <Link className="nav-link" to={ pathSearch(mainLayoutRouting, "auth=>main", {}) }>
                                        { t("menu:login") }
                                    </Link>
                                )
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}


export default Menu;
