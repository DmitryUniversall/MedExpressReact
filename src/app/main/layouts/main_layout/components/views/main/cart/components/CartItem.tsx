import ScrollLink from "../../../../../../../../core/routing/ScrollLink.tsx";
import { pathSearch } from "../../../../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../../routing.tsx";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import LazyImage from "../../../../../../../utils/ui/LazyImage.tsx";
import { CartItemLoadedD1 } from "../../../../../../../api/services/cart/models/cart_item.ts";
import React from "react";

interface CartItemPropsLoading {
    isLoading: true
    cartItem: null
}

interface CartItemPropsLoaded {
    isLoading: false;
    cartItem: CartItemLoadedD1;
    currency: string;
    updateCartItem: (updatedItem: CartItemLoadedD1) => Promise<void>
}

type CartItemProps = CartItemPropsLoading | CartItemPropsLoaded;

const CartItem = (props: CartItemProps) => {
    const { t } = useTranslation([ "cart", "common" ]);

    const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (props.isLoading) return;

        const updatedItem = { ...props.cartItem, quantity: Number(event.target.value) };

        try {
            await props.updateCartItem(updatedItem);
        } catch (error) {
            console.error(error);
        }
    };

    const generateOptions = () => {
        if (props.isLoading) return [];

        const min = Math.max(1, props.cartItem.quantity - 5); // Prevent negative or zero values
        const max = props.cartItem.quantity + 5;

        const options = [];
        for (let i = min; i <= max; i++) options.push(<option key={ i } value={ i }>{ i }</option>);

        return options;
    };

    return (
        <>
            <div className="row mb-4 cart-item">
                <div className="col-12 col-md-8 col-lg-8">
                    <div className="me-lg-3">
                        <div className="d-flex flex-row">
                            {
                                !props.isLoading ? (
                                    <LazyImage
                                        src={ props.cartItem.product.small_image_src }
                                        className="border rounded me-3 cart-item-img"
                                        alt={ props.cartItem.product.code_name }
                                        skeletonProps={ { width: "96px", height: "96px" } }
                                    />
                                ) : (
                                    <Skeleton width={ "96px" } height={ "96px" }/>
                                )
                            }

                            <div className="ms-2 d-flex flex-column justify-content-center h-100">
                                {
                                    !props.isLoading ? (
                                        <ScrollLink
                                            className="cart-item-name text-dark"
                                            top={ 77 }
                                            to={ pathSearch(mainLayoutRouting, "main=>index", {}) }
                                            id={ "header" }>
                                            { props.cartItem.product.title }
                                        </ScrollLink>
                                    ) : (
                                        <Skeleton height="1.25rem" width="100%" containerClassName="w-100"/>
                                    )
                                }
                                {
                                    !props.isLoading ? (
                                        <p className="nav-link mb-0 text-muted">{ props.cartItem.product.description }</p>
                                    ) : (
                                        <Skeleton height="1.25rem" width="50%" containerClassName="w-100"/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4 col-lg-4 d-flex flex-row flex-lg-column mt-3 mt-lg-0">
                    <div className="row w-100">
                        <div className="col-4 col-sm-4 col-md-8 col-lg-8">
                            {
                                !props.isLoading ? (
                                    <select
                                        value={ props.cartItem.quantity }
                                        onChange={ handleChange }
                                        className="form-select mb-0 mb-2">
                                        { generateOptions() }
                                    </select>
                                ) : (
                                    <Skeleton height="50%" width="100%"/>
                                )
                            }
                            <div className="d-flex flex-column justify-content-center">
                                {
                                    !props.isLoading ? (
                                        <span className="mb-0 text-nowrap fw-bold">
                                            { props.currency }{ (props.cartItem.product.price * props.cartItem.quantity).toFixed(2) }
                                        </span>
                                    ) : (
                                        <Skeleton height="1.25rem" width="50%"/>
                                    )
                                }
                                {
                                    !props.isLoading ? (
                                        <span className="text-muted text-nowrap">
                                            { props.cartItem.product.price.toFixed(2) }/{ t("cart:price_per_item") }
                                        </span>
                                    ) : (
                                        <Skeleton height="1.25rem" width="50%"/>
                                    )
                                }
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
