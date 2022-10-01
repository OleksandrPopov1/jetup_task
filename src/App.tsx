import {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AddingWordPage, CheckWordPage, HomePage} from "./pages";

const App: FC = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<Navigate to={'home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'addWord'} element={<AddingWordPage/>}/>
                    <Route path={'checkWord'} element={<CheckWordPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export {
    App
};