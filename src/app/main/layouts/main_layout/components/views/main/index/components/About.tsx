import { FC } from "react";
import { useTranslation } from "react-i18next";
import aboutImage from '../../../../../../../../../assets/images/about.jpg';

const About: FC = () => {
    const { t } = useTranslation("index")
    const items_column_1: string[] = t('about.items_column_1', { returnObjects: true }) as string[];
    const items_column_2: string[] = t('about.items_column_2', { returnObjects: true }) as string[];

    return (
        <div id="about">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center mb-5 mb-md-0">
                        <img
                            src={ aboutImage }
                            className="img-fluid"
                            alt="About Us"
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="about-text">
                            <h2>{ t("about.about") }</h2>
                            <p>{ t("about.paragraph") }</p>
                            <h3>{ t("about.why_choose_us") }</h3>
                            <div className="list-style">
                                <div className="row">
                                    <div className="col-6">
                                        <ul>
                                            { items_column_1.map((d, i) => (
                                                <li key={ `${ d }-${ i }` }>{ d }</li>
                                            )) }
                                        </ul>
                                    </div>
                                    <div className="col-6">
                                        <ul>
                                            { items_column_2.map((d, i) => (
                                                <li key={ `${ d }-${ i }` }>{ d }</li>
                                            )) }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default About;
