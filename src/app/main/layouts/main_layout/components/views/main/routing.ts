import {UrlPattern} from "../../../../../../core/routing/path.ts";
import IndexView from "./index/IndexView.tsx";

const mainUrlPatterns: UrlPattern[] = [
    {
        name: "index",
        path: "/",
        component: IndexView
    }
]

export default mainUrlPatterns
