import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePopularProducts } from "../../../../../../../api/services/products/utils/hooks.ts";
import { Product } from "../../../../../../../api/services/products/models/product.ts";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import LazyImage from "../../../../../../../utils/ui/LazyImage.tsx";
import { useAddCartItem } from "../../../../../../../api/services/cart/utils/hooks.ts";
import { useAuth } from "../../../../../../../api/services/auth/utils/context/hook.ts";
import { useNavigate } from "react-router-dom";
import { pathSearch } from "../../../../../../../../core/routing/path.ts";
import mainLayoutRouting from "../../../../../routing.ts";
import { toast } from "react-toastify";
import { classNames } from "../../../../../../../../core/utils/utils.ts";

interface ProductSlidePropsLoading {
    isLoading: true
}

interface ProductSlidePropsLoaded {
    isLoading: false
    product: Product
    currency: string
}

type ProductSlideProps = ProductSlidePropsLoading | ProductSlidePropsLoaded;


const ProductSlide: FC<ProductSlideProps> = (props: ProductSlideProps) => {
    const { t } = useTranslation([ "common", "index" ]);
    const { mutateAsync, status } = useAddCartItem();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (props.isLoading) return;

        if (!isAuthenticated()) {
            navigate(pathSearch(mainLayoutRouting, "auth=>main", {}))
            return;
        }

        try {
            await mutateAsync({ product_id: props.product.id, quantity: 1 });
            toast.success(t("common:added_to_cart"))
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error(t("common:failed_to_add_to_cart"))
        }
    };

    return (
        <div className="h-100 product-slide card p-3 border d-flex flex-column justify-content-between h-100">
            <div>
                <div className="image-container">
                    {
                        !props.isLoading ? (
                            <>
                                {
                                    props.product.is_new && (
                                        <span
                                            className="new-badge text-light bg-danger rounded-1"> { t("new-product") } </span>
                                    )
                                }
                                <LazyImage src={ props.product.medium_image_src } className={ "card-img-top rounded-2" }
                                           alt="image" skeletonProps={ { height: "175px", width: "100%" } }/>
                            </>
                        ) : (
                            <Skeleton height="175px" width="100%"/>
                        )
                    }
                </div>
                <div className="card-body mt-3 p-0 pb-0 d-flex flex-column">
                    <div className="pb-3 d-flex flex-column">
                        <span className="fw-bold h5 mb-1">
                            {
                                !props.isLoading ? (
                                    props.product.title
                                ) : (
                                    <Skeleton height="1.25rem" width="50%"/>
                                )
                            }
                        </span>
                        <span className="h6 text-secondary mb-4">
                            {
                                !props.isLoading ? (
                                    props.product.sort_description
                                ) : (
                                    <Skeleton height="1.25rem" width="100%"/>
                                )
                            }
                        </span>
                        <span className={ "fw-bold" }>
                            {
                                !props.isLoading ? (
                                    props.currency + props.product.price.toFixed(2)
                                ) : (
                                    <Skeleton height="1.25rem" width="30%"/>
                                )
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className="d-flex pt-3 border-top w-100">
                {
                    !props.isLoading ? (
                        <button
                            onClick={ handleAddToCart }
                            className={ classNames("btn btn-outline-primary w-100", { "disabled": status == "pending" }) }>
                            { status == "pending" && t("common:pending") }
                            { status != "pending" && t("common:add_to_cart_short") }
                        </button>
                    ) : (
                        <Skeleton height="37px" width="100%" containerClassName="w-100"/>
                    )
                }
            </div>
        </div>
    )
}


const PopularProducts: FC = () => {
    const { t } = useTranslation([ "common", "index" ])
    const { data: products, isLoading, error } = usePopularProducts();

    if (error) console.error(error)

    return (
        <div id="popular_products">
            <div className='popular-products'>
                <div className="d-flex flex-row justify-content-center title-container">
                    <div className="w-75">
                        <h2 className="title text-center">{ t("index:popular_products:title") }</h2>
                        <p className="description text-center">{ t("index:popular_products:description") }</p>
                    </div>
                </div>
                {
                    !error ? (
                        <Swiper
                            spaceBetween={ 15 }
                            slidesPerView={ "auto" }>
                            {
                                !isLoading ? (
                                    (products as Product[]).map((product, index) => (
                                        <SwiperSlide key={ index }>
                                            <ProductSlide isLoading={ false } currency={ "$" } product={ product }/>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    [ ...Array(5).keys() ].map((index) => (
                                        <SwiperSlide key={ index }>
                                            <ProductSlide isLoading={ isLoading }/>
                                        </SwiperSlide>
                                    ))
                                )
                            }
                        </Swiper>
                    ) : (
                        <div className="error w-100">
                            <h3 className="message text-danger text-center">{ t("unknown_error_occurred") }</h3>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PopularProducts;
