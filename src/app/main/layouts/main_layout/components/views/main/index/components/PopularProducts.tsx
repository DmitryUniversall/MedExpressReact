import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePopularProducts } from "../../../../../../../api/services/products/utils/hooks.ts";
import { Product } from "../../../../../../../api/services/products/models/product.ts";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

interface ProductSlideProps {
    product?: Product,
    isLoading: boolean,
    currency: string
}


const ProductSlide: FC<ProductSlideProps> = (props: ProductSlideProps) => {
    const { t } = useTranslation([ "common", "index" ])

    return (
        <div className="h-100 product-slide card p-3 border">
            <div className="image-container">
                {
                    !props.isLoading ? (
                        <>
                            {
                                props.product?.is_new && (
                                    <span className="new-badge text-light bg-danger rounded-1">
                                            { t("new-product") }
                                        </span>
                                )
                            }
                            <img src={ props.product?.image_src } className="card-img-top rounded-2" alt="image"/>
                        </>
                    ) : (
                        <Skeleton height="175px" width="100%"/>
                    )
                }
            </div>
            <div className="card-body mt-3 p-0 pb-0 d-flex flex-column">
                <div className="pb-3 border-bottom d-flex flex-column">
                        <span className="fw-bold h5 mb-1">
                            {
                                !props.isLoading ? (
                                    props.product?.title
                                ) : (
                                    <Skeleton height="1.25rem" width="50%"/>
                                )
                            }
                        </span>
                    <span className="h6 text-secondary mb-4">
                            {
                                !props.isLoading ? (
                                    props.product?.sort_description
                                ) : (
                                    <Skeleton height="1.25rem" width="100%"/>
                                )
                            }
                        </span>
                    <span className={ "fw-bold" }>
                            {
                                !props.isLoading ? (
                                    props.currency + props.product?.price.toFixed(2)
                                ) : (
                                    <Skeleton height="1.25rem" width="30%"/>
                                )
                            }
                        </span>
                </div>

                <div className="d-flex pt-3 w-100">
                    {
                        !props.isLoading ? (
                            <button className="btn btn-outline-primary w-100">
                                { t("common:add_to_cart_short") }
                            </button>
                        ) : (
                            <Skeleton height="37px" width="100%" containerClassName="w-100"/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


const PopularProducts: FC = () => {
    const { t } = useTranslation([ "common", "index" ])
    const { data: products, isLoading, error } = usePopularProducts();

    if (error) return <p>Error loading products</p>;

    console.log(isLoading, products)
    return (
        <div id="popular_products">
            <div className='popular-products'>
                <div className="d-flex flex-row justify-content-center title-container">
                    <div className="w-75">
                        <h2 className="title text-center">{ t("index:popular_products:title") }</h2>
                        <p className="description text-center">{ t("index:popular_products:description") }</p>
                    </div>
                </div>
                <Swiper
                    spaceBetween={ 15 }
                    slidesPerView={ "auto" }>
                    {
                        !isLoading && products != undefined ? (
                            products.map((product, index) => (
                                <SwiperSlide key={ index }>
                                    <ProductSlide isLoading={ isLoading } currency={ "$" } product={ product }/>
                                </SwiperSlide>
                            ))
                        ) : (
                            [ ...Array(5).keys() ].map((index) => (
                                <SwiperSlide key={ index }>
                                    <ProductSlide isLoading={ isLoading } currency={ "$" } product={ undefined }/>
                                </SwiperSlide>
                            ))
                        )
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default PopularProducts;
