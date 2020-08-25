import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Home, Plus } from 'react-feather';
import CreateStoreModal from '../components/CreateStoreModal';
import Moment from 'react-moment';

import { db } from "../services/firebase"

function Stores() {
    const [loading, isLoading] = useState(true);
    const [stores, setStores] = useState([]);
    const storesRef = db.ref("stores");

    const fetchStores = () => {
        setStores([]);
        isLoading(true);

        storesRef.once("value").then(snapshot => {
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

                {/* <button className="btn primary"><Plus /> Add New Store</button> */}
            </div>

            <div className="content">
                <div className="card">
                    <div className="card-header d-flex align-items-center">
                        <div className="flex-1">Stores</div>
                        <div className="flex-1 text-right"><CreateStoreModal db={ storesRef } refreshTable={ fetchStores } /></div>
                    </div>
                    <div className="card-body">

                        { loading && 'loading...' }
                        <table className="table table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th width="15%">Created</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    stores.map((item, idx) => {
                                    return ( 
                                        <tr key={ idx }>
                                            <td><Moment format="MM/DD/YYYY" date={ item.created } /></td>
                                            <td>{ item.name }</td>
                                            <td>{ item.category }</td>
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