import "./cart.css"

import { FC } from "react";
import CartItem from "./components/CartItem.tsx";
import { useTranslation } from "react-i18next";
import RecommendedItem from "./components/RecommendedItem.tsx";

const CartView: FC = () => {
    const { t } = useTranslation([ "common", "cart" ])

    return (
        <>
            <div id="cart_view">
                <section className="my-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4">{ t("cart:your_shopping_cart") }</h4>
                                        {
                                            [ ...Array(4) ].map(index =>
                                                <CartItem
                                                    key={ index }
                                                    imageSrc={ "https://dummyimage.com/400x400/ff0/000" }
                                                    description={ "Winter jacket for men and lady" }
                                                    name={ "Yellow, Jeans" }
                                                    pricePerItem={ 460.00 }
                                                    currency="$"
                                                    itemCount={ 3 }
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card shadow-0 border mb-3 mt-3 mt-lg-0">
                                    <div className="card-body">
                                        <div className="p-2">
                                            <h4>
                                                { t("cart:delivery_info") }
                                            </h4>
                                            <span className="text-muted">
                                                { t("cart:delivery_description") }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3 border shadow-0 mt-3 mt-lg-0">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label className="form-label h6 fw-bold">
                                                { t("cart:have_coupon") }
                                            </label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control border"
                                                    name="coupon_code"
                                                    placeholder={ t("cart:coupon_code") }/>
                                                <button className="btn btn-light border">{ t("common:apply") }</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow-0 border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h3 className="mb-2">{ t("common:price") }:</h3>
                                            <h4 className="mb-2">$329.00</h4>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h3 className="mb-2">{ t("cart:discount") }:</h3>
                                            <h4 className="mb-2 text-success">-$60.00</h4>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <h3 className="mb-2">{ t("common:delivery") }:</h3>
                                            <h4 className="mb-2">$14.00</h4>
                                        </div>
                                        <hr/>
                                        <div className="d-flex justify-content-between">
                                            <h3 className="mb-2">{ t("cart:total") }:</h3>
                                            <h4 className="mb-2 fw-bold">$283.00</h4>
                                        </div>

                                        <div className="mt-3">
                                            <button className="btn btn-custom-primary w-100 shadow-0 mb-2">
                                                { t("cart:purchase") }
                                            </button>
                                            <button className="btn btn-light w-100 border mt-2">
                                                { t("common:back_to_market") }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="container my-5">
                        <header className="mb-4">
                            <h3>{ t("cart:recommended_items") }</h3>
                        </header>

                        <div className="row">
                            {
                                [ ...Array(4) ].map(index => (
                                    <div key={ index } className="col-lg-3 col-md-6 col-sm-6">
                                        <RecommendedItem
                                            imageSrc="https://dummyimage.com/600x400/ff0/000"
                                            title="Gaming Headset with Mic"
                                            price={ 18.95 }
                                            del={ 34.35 }
                                            isNew={ true }
                                            currency={ "$" }/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CartView;
