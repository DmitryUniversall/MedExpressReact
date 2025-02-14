import React from "react";
import "./footer.css"
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation([ 'footer', 'common' ]);

    return (
        <div id="footer">
            <div className="container text-center">
                <p>&copy; { t("common:company_name") }</p>
            </div>
        </div>
    )
}

export default Footer;
