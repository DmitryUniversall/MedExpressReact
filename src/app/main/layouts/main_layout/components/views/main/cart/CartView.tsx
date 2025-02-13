import "./cart.css"

import { FC } from "react";
import CartSelection from "./components/CartSelection.tsx";
import RecommendedProductsSelection from "./components/RecommendedProductsSelection.tsx";

const CartView: FC = () => {
    return (
        <>
            <div id="cart_view">
                <section className="my-5">
                    <CartSelection/>
                </section>

                <section>
                    <RecommendedProductsSelection/>
                </section>
            </div>
        </>
    )
}

export default CartView;
