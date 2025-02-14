import { FC } from "react";
import { ProductSwiper } from "../../app_components/product_swiper/ProductSwiper.tsx";
import { Product } from "../../../../../../../api/services/products/models/product.ts";
import { useTranslation } from "react-i18next";
import { useRecommendedProducts } from "../../../../../../../api/services/products/utils/hooks.ts";

const RecommendedProductsSection: FC = () => {
    const { t } = useTranslation([ "common", "cart" ])
    const { data: products, isLoading: isLoading, error: error } = useRecommendedProducts();

    if (error) console.error(error);

    return (
        <div className="container my-5">
            <header className="mb-4">
                <h3>{ t("cart:recommended_items") }</h3>
            </header>

            <div className="row">
                {
                    !error ? (
                        <ProductSwiper
                            isLoading={ isLoading }
                            currency={ "₽" }
                            products={ products as Product[] }
                            skeletonsCount={ 10 }
                        />
                    ) : (
                        <div className="error w-100">
                            <h3 className="message text-danger text-center">{ t("common:unknown_error_occurred") }</h3>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


export default RecommendedProductsSection;
