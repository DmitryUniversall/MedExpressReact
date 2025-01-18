import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface FaqData {
    title: string;
    content: string;
}

const FAQCard: FC<FaqData> = ({ title, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);


    const toggleCard = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className={ `faq-card mb-1 ${ isExpanded ? "expanded" : "" }` }>
            <div className="faq-card-header" onClick={ toggleCard }>
                <span className="faq-card-title">{ title }</span>
                <i className="fa fa-angle-down arrow-icon" aria-hidden="true"/>
            </div>
            <div className="faq-card-content">
                { content }
            </div>
        </div>
    )
}

const FAQ: FC = () => {
    const { t } = useTranslation("index")
    const faqData: FaqData[] = t("faq.faq", { returnObjects: true }) as FaqData[]

    return (
        <div id="FAQ" className="w-100 pt-5 pb-5 ps-3 pe-3">
            <div className="container">
                <div className="faq-title d-flex flex-column justify-content-center text-bold mb-4">
                    <h2>{ t("faq.title") }</h2>
                    <p>{ t("faq.text") }</p>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="col-10">
                        <div className="d-flex flex-column gap-1">
                            {
                                faqData.map((data, index) => (
                                    <FAQCard key={ index } { ...data } />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FAQ;
