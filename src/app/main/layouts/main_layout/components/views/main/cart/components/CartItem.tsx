import ScrollLink from "../../../../../../../../core/routing/ScrollLink.tsx";
import { pathSearch } from "../../../../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../../routing.ts";
import { useTranslation } from "react-i18next";

interface CartItemProps {
    description: string;
    imageSrc: string;
    name: string;
    pricePerItem: number;
    itemCount: number;
    currency: string  // TODO: Use icon
}

const CartItem = (props: CartItemProps) => {
    const { t } = useTranslation([ "cart", "common" ]);
    const finalPrice = (props.pricePerItem * props.itemCount).toFixed(2)

    return (
        <>
            <div className="row mb-4 cart-item">
                <div className="col-12 col-md-8 col-lg-8">
                    <div className="me-lg-3">
                        <div className="d-flex flex-row">
                            <img src={ props.imageSrc } className="border rounded me-3 cart-item-img" alt="item"/>
                            <div className="d-flex flex-column justify-content-center h-100">
                                <ScrollLink
                                    className="cart-item-name text-dark" top={ 77 }
                                    to={ pathSearch(mainLayoutRouting, "main=>index", {}) }
                                    id={ "header" }>
                                    { props.name }
                                </ScrollLink>

                                <p className="nav-link mb-0 text-muted">{ props.description }</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 col-lg-4 d-flex flex-row flex-lg-column mt-3 mt-lg-0">
                    <div className="row w-100">
                        <div className="col-4 col-sm-4 col-md-8 col-lg-8">
                            <select className="form-select mb-0 mb-2">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <div className="d-flex flex-column justify-content-center">
                                <span className="mb-0 text-nowrap fw-bold">
                                    { props.currency }{ finalPrice }
                                </span>
                                <span className="text-muted text-nowrap">
                                    { props.pricePerItem.toFixed(2) }/{ t("cart:price_per_item") }
                                </span>
                            </div>
                        </div>
                        <div className="col-2 col-sm-2 col-md-4 col-lg-4">
                            <div className="d-flex w-100 justify-content-center">
                                <div className="btn btn-danger rounded ">
                                    <i className="fa fa-trash"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem
