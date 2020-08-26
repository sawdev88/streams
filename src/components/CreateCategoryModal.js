import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Plus, Grid } from 'react-feather';
import { useForm } from "react-hook-form";
import { db, auth } from "../services/firebase"

// TODO check if category already exists //

function CreateCategoryModal(props) {
    const [show, toggleShow] = useState(false);
    const [categoryError, setCategoryError] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const handleClose = () => { toggleShow(false); };
    const handleShow = () => toggleShow(true);
    const categoryRef = db.ref('/categories/' + auth().currentUser.uid);

    const onSubmit = data => {
        let {categoryName} = data;
        setCategoryError('')

        categoryRef.orderByChild("name").equalTo(categoryName).once("value", snapshot => {
            if (snapshot.exists()){
                // category already exists
                setCategoryError(categoryName + ' already exists. Please try again')
            } else {
                // create new category
                categoryRef.push({
                    name: categoryName,
                    userId: auth().currentUser.uid
                }, error => {
                    if (error) {
                        console.log(error)
                    } else {
                        // refresh table
                        props.refresh();
                        handleClose();
                    }
                });
            }
        });
    };


    return (
        <>
        <Plus onClick={handleShow} className="pointer" size={18} />
    
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><Grid /> Create New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
              <div className="form-group">
                  <label htmlFor="categoryName">Store name</label>
                  <input name="categoryName"
                         type="text"
                         className="form-control"
                         ref={register({
                           required: '* Please enter a category name'
                          })} /> 
                  <span className="text-danger">{errors.categoryName && errors.categoryName.message}</span>
              </div>

                { categoryError && <span className="text-danger">{ categoryError }</span> }
          </form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={ handleClose }>
                  Close
              </Button>
    
              <Button variant="primary" onClick={ handleSubmit(onSubmit) }>
                  <Plus /> Save Category
              </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default CreateCategoryModal;