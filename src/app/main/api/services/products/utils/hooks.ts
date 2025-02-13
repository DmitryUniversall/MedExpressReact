import { useQuery } from '@tanstack/react-query';
import { fetchPopularProductsAPICall, fetchProductByIdAPICall, fetchRecommendedProductsAPICall } from "../service.ts";
import { Product } from "../models/product.ts";

export function usePopularProducts() {
    return useQuery<Product[], Error>({
        queryKey: [ 'products' ],
        queryFn: fetchPopularProductsAPICall
    });
}

export function useRecommendedProducts() {
    return useQuery<Product[], Error>({
        queryKey: [ 'products' ],
        queryFn: fetchRecommendedProductsAPICall
    });
}

export function useProduct(productId: number) {
    return useQuery<Product, Error>({
        queryKey: [ 'product', productId ],  // productId specified for cache
        queryFn: () => fetchProductByIdAPICall(productId),
        enabled: !!productId, // Prevents fetching if ID is not set
    });
}
