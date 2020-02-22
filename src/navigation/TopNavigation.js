import React from "react";
// import { NavLink } from "react-router-dom";

import "./NavBar.css";

const TopNavigation = props => (
    <nav className="TopNav">
        <h5 className="white-text">{props.pageName}</h5>
    </nav>
);

export default TopNavigation;
