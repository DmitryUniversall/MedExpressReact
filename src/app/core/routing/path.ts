import {ReactComponent} from "../../../types/global";

interface LayoutRouting {
    name: string;
    path: string;
    urlPatterns: UrlPattern[];
    component: ReactComponent;
}

interface UrlPattern {
    path: string
    name: string
    component: ReactComponent
}

function include(name: string, path: string, patterns: UrlPattern[]) {
    return patterns.map((pattern: UrlPattern) => {
        pattern.path = `${path}${pattern.path}`
        pattern.name = `${name}=>${pattern.name}`

        return pattern
    })
}


function pathSearch<P extends Record<string, string>>(layout: LayoutRouting, name: string, params: P): string {
    let path = `/${layout.urlPatterns.find((pattern) => pattern.name === name)?.path}`;
    if (!path) throw new Error(`Pattern with name '${name}' not found.`);

    try {
        let m: RegExpExecArray | null;

        do {
            m = /:(\w+)/g.exec(path);
            if (m) path = path.replace(m[0], params[m[1]]);
        } while (m);

        return path;
    } catch (error) {
        throw error instanceof TypeError ? new Error(`Endpoint '${name}' not found: ${error.message}`) : error;
    }
}

export {
    include,
    pathSearch
}

export type {
    LayoutRouting,
    UrlPattern
}
