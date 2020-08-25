import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Plus, Grid } from 'react-feather';
import { useForm } from "react-hook-form";
import { db } from "../services/firebase"


// TODO check if category already exists //

function CreateCategoryModal(props) {
    const [show, setShow] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const handleClose = () => { props.showModal(); setShow(false); };
    const handleShow = () => setShow(true);

    const onSubmit = data => {
        const categoryRef = db.ref("categories");
        let {categoryName} = data;

        try {
            categoryRef.push({name: categoryName})
        } catch (error) {
            // todo display error
            console.log(error)
            return;
        }

        // refresh table
        props.refresh();
        handleClose();
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