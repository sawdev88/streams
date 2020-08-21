import React from 'react';
import { User } from 'react-feather';

function Header({ user }) {
    console.log(user)
    return (
        <div className="header d-flex">
            <div className="flex-1">
                <strong>streams</strong>
            </div>
            
            <div className="flex-1 text-right">
                hello { user.email } <User className="user-icon" />
            </div>
        </div>
    )
}

export default Header;