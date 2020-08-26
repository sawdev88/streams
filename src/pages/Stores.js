import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../components/Layout';
import { Home, Edit2 } from 'react-feather';
import CreateStoreModal from '../components/CreateStoreModal';
import Moment from 'react-moment';

import { db, auth } from "../services/firebase"

function Stores(props) {
    const [loading, isLoading] = useState(true);
    const [stores, setStores] = useState([]);
    const history = useHistory();
    const storesRef = db.ref('/stores/' + auth().currentUser.uid);

    const fetchStores = () => {
        setStores([]);
        isLoading(true);

        storesRef.once(`value`).then(snapshot => {
            snapshot.forEach(snap => {
                setStores(searches => [...searches, snap.val()])
            })

            isLoading(false)
        });
    }

    useEffect(() => {
        fetchStores();
    }, []);

    const goToStorePage = (store) => {
        history.push('/stores/' + store);
    }

    return (
        <Layout>
            <div className="callout">
                <h1><Home className="text-light" /> Manage Stores</h1>
                <h4>create and edit stores</h4>
            </div>

            <div className="content">
                <div className="card">
                    <div className="card-header d-flex align-items-center">
                        <div className="flex-1">Stores</div>
                        <div className="flex-1 text-right"><CreateStoreModal db={ storesRef } refreshTable={ fetchStores } /></div>
                    </div>
                    <div className="card-body">

                        { loading && 'loading...' }
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th width="15%">Created</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                { 
                                    stores.map((item, idx) => {
                                    return ( 
                                        <tr onClick={ () => goToStorePage(item.name) } key={ idx }>
                                            <td><Moment format="MM/DD/YYYY" date={ item.created } /></td>
                                            <td>{ item.name }</td>
                                            <td>{ item.category }</td>
                                            <td>0</td>
                                        </tr> )
                                    })
                                }
                            </tbody>
                        </table>

                        { !loading && 
                        <div className="d-flex">
                            <div className="flex-1">total: { stores.length }</div>
                            <div className="flex-1">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-end">
                                        <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>  
                        </div>}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default Stores;