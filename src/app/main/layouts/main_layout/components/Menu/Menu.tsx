import { FC, RefObject, useEffect, useRef, useState } from "react";
import "./menu.css"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { pathSearch } from "../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../routing.ts";
import ScrollLink from "../../../../../core/routing/ScrollLink.tsx";
import { useAuth } from "../../../../api/services/auth/utils/context/hook.ts";
import { classNames } from "../../../../../core/utils/utils.ts";


const Menu: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const { t } = useTranslation(["menu", "common"])
    const { isAuthenticated } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (!event.target) return;
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            if (isMenuOpen) setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav id="menu" className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container" ref={ menuRef }>
                <ScrollLink className="navbar-brand" top={ 77 } to={ pathSearch(mainLayoutRouting, "main=>index", {}) }
                            id={ "header" }>
                    { t("common:company_name") }
                </ScrollLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={ toggleMenu }
                    aria-controls="navbarNav"
                    aria-expanded={ isMenuOpen ? 'true' : 'false' }
                    aria-label="Toggle navigation"
                >
                    <span className="fa fa-list toggler-icon"/>
                </button>
                <div className={ classNames("navbar-collapse", { collapse: !isMenuOpen }) } id="navbarNav">
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
                                    <Link className="nav-link"
                                          to={ pathSearch(mainLayoutRouting, "main=>profile", {}) }>
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
