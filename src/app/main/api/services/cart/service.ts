import { axiosClient } from "../../../../core/http/axios_client.ts";
import { CartItem } from "./models/cart_item.ts";
import { DeliveryOrder } from "../delivery/models/delivery_order.ts";

export interface AddCartItemPayload {
    product_id: number
    quantity: number
}

export const addCartItemAPICall = async (payload: AddCartItemPayload): Promise<CartItem> => {
    const { data } = await axiosClient.post('/cart/add/', payload);
    return data.data;
};


export const fetchCartItemsAPICall = async (): Promise<CartItem[]> => {
    const { data } = await axiosClient.get('/cart/items/');
    return data.data.items;
};


export const removeCartItemAPICall = async (item_id: number): Promise<void> => {
    await axiosClient.get(`/cart/items/item/${ item_id }/`);
};


export const updateCartItemAPICall = async (item_id: number): Promise<void> => {
    await axiosClient.get(`/cart/items/item/${ item_id }/`);
};


export interface PurchasePayload {
    latitude: number
    longitude: number
}

export const purchaseAPICall = async (payload: PurchasePayload): Promise<DeliveryOrder[]> => {
    const { data } = await axiosClient.post('/cart/purchase/', payload);
    return data.data.orders;
};
