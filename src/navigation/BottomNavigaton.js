import React from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.css";

const BottomNavigation = props => (
    <nav className="BottomNav">
        <NavLink to="/cycle">Cycle</NavLink>
        <NavLink to="/calendar">Calendar</NavLink>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/insights">Insights</NavLink>
        <NavLink to="/profile">Profile</NavLink>
    </nav>
);

export default BottomNavigation;
