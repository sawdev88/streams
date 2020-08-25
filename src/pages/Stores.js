import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Home, Plus } from 'react-feather';
import Spinner from '../components/Spinner';

import { db } from "../services/firebase"

function Stores() {
    const [loading, isLoading] = useState(true);
    const [stores, setStores] = useState([]);

    const fetchStores = () => {
        db.ref("stores").once("value").then(snapshot => {
            snapshot.forEach(snap => {
                setStores(searches => [...searches, snap.val()])
            })

            isLoading(false)
        });
    }

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <Layout>
            <div className="callout">
                <h1><Home className="text-light" /> Stores</h1>
                <h4>other stuff here</h4>

                <button className="btn primary"><Plus /> Add New Store</button>
            </div>

            <div className="content">
                <div className="card">
                    <div className="card-header">Stores</div>
                    <div className="card-body">

                        { loading && 'loading...' }
                        <table className="table table-sm table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Created</th>
                                    <th>Name</th>
                                    <th>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    stores.map((item, idx) => {
                                    return ( 
                                        <tr key={ idx }>
                                            <td>{ item }</td>
                                            <td>{ item }</td>
                                            <td>{ item }</td>
                                        </tr> )
                                    })
                                }
                            </tbody>
                        </table>

                            <div> {!loading && `total: ${ stores.length }`}</div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Stores;