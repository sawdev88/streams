import React from 'react';

function Header({ user }) {
    console.log(user)
    return (
        <div className="header">
            <strong>header</strong> hello { user.email }
        </div>
    )
}

export default Header;