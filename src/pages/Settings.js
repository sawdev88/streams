import React from 'react';
import Layout from '../components/Layout';
import { Settings as Cog } from 'react-feather';

function Settings() {
    return (
        <Layout>
            <div className="callout">
                <h1><Cog className="text-light" /> Settings</h1>
                <h4>other stuff here</h4>
            </div>

            <div className="content">
                <div className="card-row">
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

export default Settings;