import {LayoutRouting} from "../../../../project_routing.ts";
import MainLayout from "./MainLayout.tsx";
import {include, UrlPattern} from "../../../core/routing/path.ts";
import mainUrlPatterns from "./components/views/main/routing.ts";

const mainLayoutUrlPatterns: UrlPattern[] = [
    ...include("main", "", mainUrlPatterns),
]


const mainLayoutRouting: LayoutRouting = {
    name: 'mainLayout',
    path: '/',
    urlPatterns: mainLayoutUrlPatterns,
    component: MainLayout // IsInitializedWrapper()
}

export default mainLayoutRouting;
