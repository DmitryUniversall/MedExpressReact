import { UrlPattern } from "../../../../../../core/routing/path.ts";
import AuthView from "./auth/AuthView.tsx";


const authUrlPatterns: UrlPattern[] = [
    {
        name: "main",
        path: "",
        component: AuthView
    },
    {
        name: "logout",
        path: "logout/",
        component: AuthView
    }
]

export default authUrlPatterns
