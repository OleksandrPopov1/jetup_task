import {FC} from "react";
import {NavLink} from "react-router-dom";

import './LayoutHeader.css';

const LayoutHeader: FC = () => {
    return (
        <div className={'layoutHeader'}>
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'addWord'}>Add New Word</NavLink>
            <NavLink to={'checkWord'}>Check Words</NavLink>
        </div>
    );
};

export {
    LayoutHeader
};