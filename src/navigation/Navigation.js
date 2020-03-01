import React from "react";
import { NavLink } from "react-router-dom";

import "../css/Navigation.css";

const Navigation = props => (
    <nav className="navbar">
        <ul className="navbar-nav">
            <li className="logo">
                <NavLink to="/home" className="nav-link">
                    <span className="link-text logo-text">athena.</span>
                    
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/cycle" className="nav-link">
                
                    <span className="link-text">Cycle</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/calendar" className="nav-link">
                    
                    <span className="link-text">Calendar</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                    
                    <span className="link-text">Home</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/insights" className="nav-link">
                    
                    <span className="link-text">Insights</span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                    
                    <span className="link-text">Profile</span>
                </NavLink>
            </li>
            <li className="nav-item" id="themeButton">
                
            </li>
        </ul>
    </nav>
);

export default Navigation;
