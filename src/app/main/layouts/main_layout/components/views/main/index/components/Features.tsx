import { FC } from "react";
import { useTranslation } from "react-i18next";

const Features: FC = () => {
    const { t } = useTranslation("index")

    return (
        <>
            <div id="features" className="text-center pt-5 pb-5 ps-3 pe-3">
                <div className="container">
                    <div className="col-10 offset-1 section-title mb-5">
                        <h2>Features</h2>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-6 col-md-4 mt-4 mt-md-0">
                            <i className="fa fa-comments-o"></i>
                            <h3>{ t("features.comments.title") }</h3>
                            <p>{ t("features.comments.text") }</p>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 mt-4 mt-md-0">
                            <i className="fa fa-bullhorn"></i>
                            <h3>{ t("features.bullhorn.title") }</h3>
                            <p>{ t("features.bullhorn.text") }</p>
                        </div>
                        <div className="col-12  col-sm-6 col-md-4 mt-4 mt-md-0">
                            <i className="fa fa-group"></i>
                            <h3>{ t("features.group.title") }</h3>
                            <p>{ t("features.group.text") }</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Features;
