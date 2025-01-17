import mainLayoutRouting from "./app/main/layouts/main_layout/routing.ts";
import {LayoutRouting} from "./app/core/routing/path.ts";

type Layouts = {
    [layoutName: string]: LayoutRouting;
};

interface ProjectRouting {
    layouts: Layouts;
}

const ProjectRouting: ProjectRouting = {
    layouts: {
        main: mainLayoutRouting
    }
}

const layout = ProjectRouting.layouts.main


export {
    ProjectRouting,
    layout
}

export type {
    LayoutRouting
}
