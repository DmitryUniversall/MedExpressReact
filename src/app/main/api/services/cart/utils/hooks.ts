import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addCartItemAPICall, fetchCartItemsAPICall, purchaseAPICall, removeCartItemAPICall, updateCartItemAPICall } from "../service.ts";

export const useCartItems = () => {
    return useQuery({
        queryKey: [ 'cartItems' ],
        queryFn: fetchCartItemsAPICall,
    });
};

export const useAddCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addCartItemAPICall,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ 'cartItems' ] })
    });
};

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeCartItemAPICall,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ 'cartItems' ] })
    });
};

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCartItemAPICall,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ 'cartItems' ] })
    });
};

export const usePurchase = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: purchaseAPICall,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ 'cartItems' ] })
    });
};
