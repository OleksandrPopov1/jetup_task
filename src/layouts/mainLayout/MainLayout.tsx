import {FC} from "react";
import {Outlet} from "react-router-dom";

import {LayoutHeader} from "../../components";

const MainLayout: FC = () => {
    return (
        <div>
            <LayoutHeader/>
            <Outlet/>
        </div>
    );
};

export {
    MainLayout
};