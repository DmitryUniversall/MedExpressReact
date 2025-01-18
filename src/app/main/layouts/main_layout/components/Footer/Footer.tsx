import React from "react";
import "./footer.css"
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation(['footer', 'common']);

    return (
        <div id="footer">
            <div className="container text-center">
                <p>&copy; { t("common:company_name") }; {t("footer:footer_text")}</p>
            </div>
        </div>
    )
}

export default Footer;
