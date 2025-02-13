import { UrlPattern } from "../../../../../../core/routing/path.ts";
import IndexView from "./index/IndexView.tsx";
import CartView from "./cart/CartView.tsx";
import { RequireAuthentication } from "../../../../../api/services/auth/utils/RequireAuthentication.tsx";
import ProfileView from "./profile/ProfileView.tsx";

const mainUrlPatterns: UrlPattern[] = [
    {
        name: "index",
        path: "",
        element: <IndexView/>
    },
    {
        name: "cart",
        path: "cart/",
        element: (
            <RequireAuthentication>
                <CartView/>
            </RequireAuthentication>
        )
    },
    {
        name: "profile",
        path: "profile/",
        element: (
            <RequireAuthentication>
                <ProfileView/>
            </RequireAuthentication>
        )
    }
]

export default mainUrlPatterns
