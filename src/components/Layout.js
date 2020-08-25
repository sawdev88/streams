import React, { useState } from 'react';
import { Route } from "react-router-dom";
import Header from './Header';
import Nav from './Nav';

import { auth } from "../services/firebase";

function Layout(props) {
    const [user, setUser] = useState(auth().currentUser);
    
    return (
        <div className="layout">
            <Header user={ user } />
            <Nav />
            
            <div className="content-wrapper">
                <Route {...props} />
            </div>
        </div>
    )
}

export default Layout;