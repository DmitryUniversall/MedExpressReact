import { UserPrivate } from "../../auth/models/user.ts";
import { Product } from "../../products/models/product.ts";

export type DeliveryOrderStatus = 'packaging' | 'on_the_way' | 'arrive_soon';

export interface DeliveryOrder {
    id: number
    user_id: number
    product_id: number
    quantity: number
    created_at: string
    latitude: number
    longitude: number
    status: DeliveryOrderStatus
}

export interface DeliveryOrderLoadedD1 {
    id: number
    user: UserPrivate
    product: Product
    quantity: number
    created_at: number
    latitude: number
    longitude: number
    status: DeliveryOrderStatus
}
