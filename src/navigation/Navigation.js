import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/icons/Logo.svg";
import { ReactComponent as Cycle } from "../assets/icons/Cycle.svg";
import { ReactComponent as Calendar } from "../assets/icons/Calendar.svg";
// import { ReactComponent as Home } from "../assets/icons/Home.svg";
// import { ReactComponent as Insights } from "../assets/icons/Insights.svg";
import { ReactComponent as Profile } from "../assets/icons/Profile.svg";

import "../css/Navigation.css";

const Navigation = props => (
    <nav className="navbar">
        <ul className="navbar-nav">
            <li className="logo">
                <NavLink to="/home" className="nav-link">
                    <span className="link-text logo-text">
                        <h5>athena.</h5>
                    </span>
                    <Logo />
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/cycle" className="nav-link">
                    <Cycle />
                    <span className="link-text">
                        <p className="white-text normal-text">Cycle</p>
                    </span>
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/calendar" className="nav-link">
                    <Calendar />
                    <span className="link-text">
                        <p className="white-text normal-text">Calendar</p>
                    </span>
                </NavLink>
            </li>

            {/* <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                    <Home />

                    <span className="link-text">Home</span>
                </NavLink>
            </li> */}

            {/* <li className="nav-item">
                <NavLink to="/insights" className="nav-link">
                    <Insights />
                    <span className="link-text">Insights</span>
                </NavLink>
            </li> */}

            {/* <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                    <Profile />
                    <span className="link-text">Profile</span>
                </NavLink>

            </li> */}

            <li className="nav-item" id="profile">
                <Profile />
                <h5 className="light-text">
                    {props.first_name} {props.last_name}
                </h5>
                <p className="white-text">{props.email}</p>
                <p className="light-text">Goal</p>
                <p className="white-text">Track Cycle</p>
                <button
                    onClick={props.signOut}
                    className="light-btn normal-btn"
                >
                    <p className="normal-text dark-text"> Sign Out</p>
                </button>
            </li>
            {/* <li className="nav-item" id="themeButton"></li> */}
        </ul>
    </nav>
);

export default Navigation;
