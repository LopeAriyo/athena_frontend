import React from "react";
import {NavLink} from "react-router-dom";

import "./NavBar.css";

const NavigationBar = props => 
            <nav className="NavBar">
            <NavLink to="/cycle">Cycle</NavLink>
            <NavLink to="/journal">Journal</NavLink>
            <NavLink exact to="/home">Home </NavLink>
            <NavLink to="/insights">Insights</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            </nav>
            
export default NavigationBar;