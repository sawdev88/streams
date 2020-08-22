import React , { useState, setState } from 'react';
import { User } from 'react-feather';
import { signOut } from "../helpers/auth";

function Header({ user }) {
    const [showDropdown, toggleDropdown] = useState(false);

    return (
        <div className="header d-flex">
            <div className="flex-1">
                <strong>streams</strong>
            </div>
            
            <div className="flex-1 text-right">
               <span onClick={ () => toggleDropdown(!showDropdown) } className="pointer">
                    hello { user.email } <User className="user-icon" />
               </span>

                {showDropdown && (    
                    <div  className="dropdown">
                        <div className="d-flex profile">
                            <div className="flex-1"><User className="user-icon" /></div>
                            <div className="flex-3">{ user.email }</div>
                        </div>
                        <ul>
                            <li onClick={ () => { signOut() } }>Sign out</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header;