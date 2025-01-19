import { UrlPattern } from "../../../../../../core/routing/path.ts";
import IndexView from "./index/IndexView.tsx";
import CartView from "./cart/CartView.tsx";
import ProfileView from "./profile/ProfileView.tsx";

const mainUrlPatterns: UrlPattern[] = [
    {
        name: "index",
        path: "",
        component: IndexView
    },
    {
        name: "cart",
        path: "cart/",
        component: CartView
    },
    {
        name: "profile",
        path: "profile/",
        component: ProfileView
    }
]

export default mainUrlPatterns
