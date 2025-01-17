import { FC } from "react";
import { useTranslation } from 'react-i18next';

const IndexView: FC = () => {
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        const nextLang = i18n.language === 'en' ? 'ru' : 'en';
        i18n.changeLanguage(nextLang);
    };

    return (
        <div id="index" className="d-flex flex-column justify-content-center align-items-center">
            <h1>{ t("index") }</h1>
            <button onClick={ toggleLanguage }>Switch</button>
        </div>
    )
}


export default IndexView;
