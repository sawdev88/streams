import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Plus, Home } from 'react-feather';
import { useForm } from "react-hook-form";
import CreateCategoryModal from './CreateCategoryModal';
import { db, auth } from "../services/firebase";

function CreateStoreModal(props) {
    const [show, setShow] = useState(false);
    const [storeError, setStoreError] = useState('');
    const [fadeModal, toggleFadeModal] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const handleClose = () => setShow(false);
    const handleShow = () => { 
        setShow(true);
        fetchCategories()
    }
    const categoriesRef = db.ref('/categories/' + auth().currentUser.uid);
    const [categoires, setCategories] = useState([])

    const fetchCategories = () => {
        setCategories([]);
        toggleFadeModal(false);

        categoriesRef.once("value").then(snapshot => {
            snapshot.forEach(snap => {
                setCategories(searches => [...searches, snap.val()])
            })
        });
    }

    const onSubmit = data => {
        let {storeName, storeCategory} = data;
        setStoreError('');

        props.db.orderByChild("name").equalTo(storeName).once("value", snapshot => {
            if (snapshot.exists()){
                // category already exists
                setStoreError(' * ' + storeName + ' already exists. Please use a different name')
                return
            } else {
                props.db.push({
                    name: storeName,
                    category: storeCategory,
                    created: Date.now(),
                    userId: auth().currentUser.uid
                }, error => {
                    if (error) {
                      console.log(error)
                    } else {
                      props.refreshTable();
                      handleClose();
                    }
                });
            }
        });
    }

    return (
        <>
          <Button variant="primary" onClick={handleShow}>
            <Plus /> Create New Store
          </Button>
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><Home /> Create New Store</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className="form-group">
                    <label htmlFor="storeName">Store name</label>
                    <input name="storeName"
                           type="text"
                           className="form-control"
                           ref={register({
                             required: '* Please enter a store name'
                            })} /> 
                    <span className="text-danger">{errors.storeName && errors.storeName.message}</span>
                    { storeError && <span className="text-danger">{ storeError }</span> }
                </div>

                <div className="form-group">
                    <label htmlFor="storeCategory" className="d-block">
                        Category 
                        <span className="float-right">
                            <CreateCategoryModal refresh={ fetchCategories } />
                        </span>
                    </label>
                    <select className="form-control" id="storeCategory" name="storeCategory" ref={register({
                             required: '* Please select a category'
                            })}>
                        { categoires.length && 
                            categoires.map((item, idx) => {
                                return <option key={idx}>{ item.name }</option>
                            })
                        }
                    </select>
                </div>
                <span className="text-danger">{errors.storeCategory && errors.storeCategory.message}</span>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>
                    Close
                </Button>

                <Button variant="primary" onClick={ handleSubmit(onSubmit) }>
                    <Plus /> Save Store
                </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default CreateStoreModal;