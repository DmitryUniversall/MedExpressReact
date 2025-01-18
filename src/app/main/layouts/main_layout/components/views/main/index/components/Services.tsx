import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ServiceDetails {
    icon: string;
    title: string;
    text: string;
}

const Services: FC = () => {
    const { t } = useTranslation("index");
    const services: ServiceDetails[] = t("services.services", { returnObjects: true }) as ServiceDetails[]

    return (
        <div id="services" className="text-center">
            <div className="container">
                <div className="section-title mb-5">
                    <h2>{ t("services.title") }</h2>
                    <p>{ t("services.text") }</p>
                </div>
                <div className="row">
                    {
                        services.map((service, i) => (
                            <div key={ `${ service.title }-${ i }` } className="col-12 col-sm-6 col-md-4 p-3 pb-4 pb-sm-3">
                                <i className={ service.icon }></i>
                                <div className="service-desc">
                                    <h3>{ service.title }</h3>
                                    <p>{ service.text }</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default Services;
