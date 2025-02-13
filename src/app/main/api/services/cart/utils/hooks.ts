import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    addCartItemAPICall,
    fetchCartItemsAPICall,
    purchaseAPICall,
    removeCartItemAPICall,
    updateCartItemAPICall,
    UpdateCartItemPayload
} from "../service.ts";
import { DeliveryOrder } from "../../delivery/models/delivery_order.ts";

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
        mutationFn: (payload: UpdateCartItemPayload) => updateCartItemAPICall(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ 'cartItems' ] })
    });
};

export const usePurchase = (latitude: number, longitude: number) => {
    const queryClient = useQueryClient();

    return useMutation<DeliveryOrder[]>({
        mutationFn: () => purchaseAPICall({ latitude, longitude }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ 'cartItems' ] })
    });
};
