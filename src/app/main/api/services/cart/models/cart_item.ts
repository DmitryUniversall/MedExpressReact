import { Cart } from "./cart.ts";
import { Product } from "../../products/models/product.ts";

export interface CartItem {
    id: number
    cart_id: number
    product_id: number
    quantity: number
    created_at: string
}

export interface CartItemLoadedD1 {
    id: number
    cart: Cart
    product: Product
    quantity: number
    created_at: string
}
