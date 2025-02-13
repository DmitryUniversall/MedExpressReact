import { UrlPattern } from "../../../../../../core/routing/path.ts";
import AuthView from "./auth/AuthView.tsx";


const authUrlPatterns: UrlPattern[] = [
    {
        name: "main",
        path: "",
        element: <AuthView/>
    },
    {
        name: "logout",
        path: "logout/",
        element: <AuthView/>
    }
]

export default authUrlPatterns
