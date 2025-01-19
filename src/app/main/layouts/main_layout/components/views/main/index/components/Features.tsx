import { FC } from "react";
import { useTranslation } from "react-i18next";

interface FeatureDetails {
    icon: string;
    title: string;
    text: string;
}

const Features: FC = () => {
    const { t } = useTranslation("index")
    const features: FeatureDetails[] = t("features.features", { returnObjects: true }) as FeatureDetails[]

    return (
        <>
            <div id="features" className="text-center pt-5 pb-5 ps-3 pe-3">
                <div className="container">
                    <div className="col-10 offset-1 section-title mb-5">
                        <h2>{t("features.title")}</h2>
                    </div>
                    <div className="row justify-content-center">
                        {
                            features.map((feature, index) => (
                                <div key={index} className="col-12 col-sm-6 col-md-4 mt-4 mt-md-0">
                                    <i className={feature.icon}></i>
                                    <h3>{ feature.title }</h3>
                                    <p>{ feature.text }</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Features;
