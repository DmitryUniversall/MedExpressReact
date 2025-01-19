import { UrlPattern } from "../../../../../../core/routing/path.ts";
import IndexView from "./index/IndexView.tsx";
import CartView from "./cart/CartView.tsx";

const mainUrlPatterns: UrlPattern[] = [
    {
        name: "index",
        path: "",
        component: IndexView
    },
    {
        name: "cart",
        path: "/cart/",
        component: CartView
    }
]

export default mainUrlPatterns
