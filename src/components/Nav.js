import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Home } from 'react-feather';

function Nav() {
    return (
        <div className="nav">
            <ul>
                <li>
                    <NavLink to="/dashboard">
                        <Activity /> Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/stores">
                        <Home /> Stores
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Nav;