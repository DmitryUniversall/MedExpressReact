import { LayoutRouting } from "../../../../project_routing.ts";
import MainLayout from "./MainLayout.tsx";
import { include, UrlPattern } from "../../../core/routing/path.ts";
import mainUrlPatterns from "./components/views/main/routing.tsx";
import authUrlPatterns from "./components/views/auth/routing.tsx";

const mainLayoutUrlPatterns: UrlPattern[] = [
    ...include("main", "", mainUrlPatterns),
    ...include("auth", "auth/", authUrlPatterns),
]


const mainLayoutRouting: LayoutRouting = {
    name: 'mainLayout',
    path: '/',
    urlPatterns: mainLayoutUrlPatterns,
    component: <MainLayout /> // IsInitializedWrapper()
}

export default mainLayoutRouting;
