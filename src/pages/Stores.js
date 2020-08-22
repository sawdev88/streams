import React from 'react';
import Layout from '../components/Layout';
import { Home, Plus } from 'react-feather';

function Stores() {
    return (
        <Layout>
            <div className="callout">
                <h1><Home className="text-light" /> Stores</h1>
                <h4>other stuff here</h4>

                <button className="btn primary"><Plus /> Add New Store</button>
            </div>

            <div className="content">
                <div className="card">
                    <div className="card-header">test 123</div>
                    <div className="card-body">
                        hello
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">test 123</div>
                    <div className="card-body">
                        hello
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Stores;