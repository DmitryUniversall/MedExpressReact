import "./cart.css"

import { FC } from "react";
import CartSection from "./components/CartSection.tsx";
import RecommendedProductsSection from "./components/RecommendedProductsSection.tsx";

const CartView: FC = () => {
    return (
        <>
            <div id="cart_view" className="d-flex flex-column">
                <section className="my-5">
                    <CartSection/>
                </section>

                <section>
                    <RecommendedProductsSection/>
                </section>
            </div>
        </>
    )
}

export default CartView;
