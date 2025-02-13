import { FC } from "react";
import { usePopularProducts } from "../../../../../../../api/services/products/utils/hooks.ts";
import { useTranslation } from "react-i18next";
import { ProductSwiper } from "../../app_components/product_swiper/ProductSwiper.tsx";
import { Product } from "../../../../../../../api/services/products/models/product.ts";

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
                        <ProductSwiper
                            isLoading={ isLoading }
                            currency={ "$" }
                            products={ products as Product[] }
                            skeletonsCount={ 10 }
                        />
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
