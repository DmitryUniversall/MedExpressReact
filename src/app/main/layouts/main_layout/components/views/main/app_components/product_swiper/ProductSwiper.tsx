import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "../../../../../../../api/services/products/models/product.ts";
import { ProductSlide } from "./ProductSlide.tsx";

interface ProductSwiperPropsLoading {
    isLoading: true;
    skeletonsCount: number;
}

interface ProductSwiperPropsLoaded {
    isLoading: false
    products: Product[]
    currency: string
}

type ProductSwiperProps = ProductSwiperPropsLoading | ProductSwiperPropsLoaded;


export const ProductSwiper: FC<ProductSwiperProps> = (props: ProductSwiperProps) => {
    return (
        <Swiper
            spaceBetween={ 15 }
            slidesPerView={ "auto" }>
            {
                !props.isLoading ? (
                    props.products && (props.products).map((product, index) => (
                        <SwiperSlide key={ index }>
                            <ProductSlide isLoading={ false } currency={ "₽" } product={ product }/>
                        </SwiperSlide>
                    ))
                ) : (
                    [ ...Array(props.skeletonsCount).keys() ].map((index) => (
                        <SwiperSlide key={ index }>
                            <ProductSlide isLoading={ true }/>
                        </SwiperSlide>
                    ))
                )
            }
        </Swiper>
    )
}
