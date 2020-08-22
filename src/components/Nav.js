import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Home, Package, Settings, ChevronRight } from 'react-feather';

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

                <li>
                    <NavLink to="/products">
                        <Package /> Products
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/settings">
                        <Settings /> Settings <ChevronRight className="arrow" />
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Nav;