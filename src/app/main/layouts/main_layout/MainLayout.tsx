import React, {ReactElement, useMemo} from "react";
import {Route} from "react-router-dom";
import {ThemeContextProvider} from "../../../core/themes/ThemeContextProvider.tsx";
import {UrlPattern} from "../../../core/routing/path.ts";
import mainLayoutRouting from "./routing.ts";
import Footer from "./components/Footer/Footer.tsx";
import MainLayoutContent from "./components/MainLayoutContent.tsx";
import Menu from "./components/Menu/Menu.tsx";

const MainLayout: React.FC = () => {
    const routesRendered: ReactElement[] = useMemo(
        () =>
            mainLayoutRouting.urlPatterns.map((path: UrlPattern) => (
                <Route key={path.name} path={path.path} element={<path.component/>}/>
            )),
        []
    );

    return (
        <ThemeContextProvider>
            {/* MENU */}
            <Menu/>
            {/* END MENU */}

            {/* MAIN CONTENT */}
            <div id="main_content">
                <MainLayoutContent get_routes={() => routesRendered}/>
            </div>
            {/* END MAIN CONTENT */}

            {/* FOOTER */}
            <Footer/>
            {/* END FOOTER */}
        </ThemeContextProvider>
    );
}


export default MainLayout;