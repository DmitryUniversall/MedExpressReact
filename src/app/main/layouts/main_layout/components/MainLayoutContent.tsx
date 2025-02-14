import { FC, ReactElement } from "react";
import { Routes } from "react-router-dom";

interface MainLayoutContentProps {
    get_routes: () => ReactElement[];
}


const MainLayoutContent: FC<MainLayoutContentProps> = ({ get_routes }) => {
    return (
        <div id="main_layout_content" className='w-100 h-100'>
            {/* View content */ }
            <Routes>
                { get_routes() }
            </Routes>
            {/* END View content*/ }
        </div>
    )
}

export default MainLayoutContent;
