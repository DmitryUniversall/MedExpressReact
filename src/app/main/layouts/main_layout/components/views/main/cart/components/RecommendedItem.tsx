import { FC } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "../../../../../../../../core/utils/utils.ts";

interface RecommendedItemProps {
    imageSrc: string;
    title: string;
    price: number;
    isNew: boolean;
    del?: number;
    currency: string  // TODO: Use icon
}

const RecommendedItem: FC<RecommendedItemProps> = (props: RecommendedItemProps) => {
    const { t } = useTranslation([ "common", "cart" ])

    return (
        <>
            <div className="recommended-item card p-4 border mb-4 mb-lg-0">
                <div className="image-container">
                    <span className="new-badge text-light bg-danger rounded-1">{ t("new-product") }</span>
                    <img src={ props.imageSrc } className="card-img-top rounded-2" alt="image"/>
                </div>
                <div className="card-body p-2 pb-0 d-flex flex-column">
                    <div className="pb-4 border-bottom">
                        <span className="h5">{ props.title }</span>
                        <div>
                            <span className={ classNames("fw-bold", { "pe-2": !!props.del }) }>
                                { props.currency } { props.price.toFixed(2) }
                            </span>
                            {
                                props.del && (
                                    <del>{ props.currency } { props.del.toFixed(2) }</del>
                                )
                            }
                        </div>
                    </div>

                    <div className="d-flex pt-4">
                        <button className="btn btn-outline-primary w-100">
                            { t("common:add_to_cart_short") }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecommendedItem;
