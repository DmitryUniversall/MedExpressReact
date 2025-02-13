import { FC } from "react";
import CartItem from "./CartItem.tsx";
import { classNames } from "../../../../../../../../core/utils/utils.ts";
import Skeleton from "react-loading-skeleton";
import { useCartItems, usePurchase, useRemoveCartItem, useUpdateCartItem } from "../../../../../../../api/services/cart/utils/hooks.ts";
import { useTranslation } from "react-i18next";
import { CartItemLoadedD1 } from "../../../../../../../api/services/cart/models/cart_item.ts";

const currency: string = "₽"


const CartSection: FC = () => {
    const { t } = useTranslation([ "common", "cart" ])
    const { data: cartItems, isLoading: isLoading, error: error } = useCartItems();
    const { mutateAsync: updateCartItemAsync } = useUpdateCartItem();
    const { mutateAsync: removeCartItemAsync } = useRemoveCartItem();
    const { mutateAsync: purchaseAsync } = usePurchase()

    if (error) console.error(error);

    let sum: number | undefined = undefined
    let totalSum: number | undefined = undefined
    let deliverySum: number | undefined = undefined
    if (!isLoading && !error) {
        sum = cartItems?.reduce((sum: number, item: CartItemLoadedD1): number => sum + (item.product.price * item.quantity), 0);
        deliverySum = sum! * 0.1
        totalSum = sum! + deliverySum;
    }

    const updateCartItem = async (updatedItem: CartItemLoadedD1): Promise<void> => {
        if (isLoading) return;

        try {
            await updateCartItemAsync({ item_id: updatedItem.id, ...updatedItem });
        } catch (error) {
            console.error(error);
        }
    };

    const removeCartItem = async (itemId: number) => {
        if (isLoading) return;

        try {
            await removeCartItemAsync(itemId);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePurchase = async () => {
        if (isLoading) return;

        try {
            await purchaseAsync({ latitude: 0, longitude: 0 });  // TODO
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card border shadow-0">
                        <div className="m-4">
                            <h4 className="card-title mb-4">{ t("cart:your_shopping_cart") }</h4>
                            <div className="d-flex flex-column gap-3">
                                {
                                    !isLoading ? (
                                        cartItems && cartItems.length != 0 ? (
                                            cartItems?.map((cartItem, index) => (
                                                    <CartItem
                                                        key={ index }
                                                        isLoading={ false }
                                                        cartItem={ cartItem }
                                                        currency={ currency }
                                                        updateCartItem={ updateCartItem }
                                                        removeCartItem={ removeCartItem }
                                                    />
                                                )
                                            )
                                        ) : (
                                            <div className="w-100">
                                                <h3 className="message text-center">{ t("cart:has_no_items") }</h3>
                                            </div>
                                        )
                                    ) : (
                                        [ ...Array(5).keys() ].map(index =>
                                            <CartItem
                                                key={ index }
                                                isLoading={ true }
                                                cartItem={ null }
                                            />
                                        )
                                    )
                                }
                            </div>
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
                                    <button
                                        className={ classNames("btn btn-light border", { disabled: isLoading }) }>
                                        { t("common:apply") }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-0 border">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h3 className="mb-2">{ t("common:price") }:</h3>
                                {
                                    !isLoading && totalSum != null ? (
                                        <h4 className="mb-2">{ currency }{ sum!.toFixed(2) }</h4>
                                    ) : (
                                        <Skeleton height="1.25rem" width="100%" containerClassName="w-25"/>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-between">
                                <h3 className="mb-2">{ t("cart:discount") }:</h3>
                                {
                                    !isLoading ? (
                                        <h4 className="mb-2 text-success">-$0.00</h4>
                                    ) : (
                                        <Skeleton height="1.25rem" width="100%" containerClassName="w-25"/>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-between">
                                <h3 className="mb-2">{ t("common:delivery") }:</h3>
                                {
                                    !isLoading && totalSum != null ? (
                                        <h4 className="mb-2">{ currency }{ deliverySum!.toFixed(2) }</h4>
                                    ) : (
                                        <Skeleton height="1.25rem" width="100%" containerClassName="w-25"/>
                                    )
                                }
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between">
                                <h3 className="mb-2">{ t("cart:total") }:</h3>
                                {
                                    !isLoading && totalSum != null ? (
                                        <h4 className="mb-2 fw-bold">{ currency }{ totalSum!.toFixed(2) }</h4>
                                    ) : (
                                        <Skeleton height="1.25rem" width="100%" containerClassName="w-25"/>
                                    )
                                }
                            </div>

                            <div className="mt-3">
                                <button
                                    className={ classNames("btn btn-custom-primary w-100 mb-2", { disabled: isLoading || cartItems?.length == 0 }) }
                                    onClick={ handlePurchase }
                                >
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
    )
}

export default CartSection;
