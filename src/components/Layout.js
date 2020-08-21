import React from 'react';
import { Route } from "react-router-dom";
import Header from './Header';
import Nav from './Nav';
import { auth } from "../services/firebase";

function Layout(props) {
    const user = auth().currentUser;
    
    return (
        <div className="layout">
            <Header user={ user } />
            <Nav />
            
            <div className="container">
                <Route {...props} />
            </div>
        </div>
    )
}

export default Layout;