import { axiosClient } from "../../../../core/http/axios_client.ts";
import { Product } from "./models/product.ts";


export const fetchPopularProductsAPICall = async (): Promise<Product[]> => {
    const { data } = await axiosClient.get('/products/popular/');
    return data.data.products;
};


export const fetchRecommendedProductsAPICall = async (): Promise<Product[]> => {
    const { data } = await axiosClient.get('/products/recommended/');
    return data.data.products;
};


export const fetchProductByIdAPICall = async (id: number): Promise<Product> => {
    const { data } = await axiosClient.get(`/products/${ id }/`);
    return data;
};
