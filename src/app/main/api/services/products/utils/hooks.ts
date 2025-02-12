import { useQuery } from '@tanstack/react-query';
import { fetchPopularProducts, fetchProductById, fetchRecommendedProducts } from "../service.ts";
import { Product } from "../models/product.ts";

export function usePopularProducts() {
    return useQuery<Product[], Error>({
        queryKey: [ 'products' ],
        queryFn: fetchPopularProducts
    });
}

export function useRecommendedProducts() {
    return useQuery<Product[], Error>({
        queryKey: [ 'products' ],
        queryFn: fetchRecommendedProducts
    });
}

export function useProduct(productId: number) {
    return useQuery<Product, Error>({
        queryKey: [ 'product', productId ],  // productId specified for cache
        queryFn: () => fetchProductById(productId),
        enabled: !!productId, // Prevents fetching if ID is not set
    });
}
