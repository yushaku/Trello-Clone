import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import {MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../commom/constants'


function ConfirmModal({title, content, show, onAction}) {


   return (
      <>
         <Modal backdrop='static' show={show} onHide={()=> onAction(MODAL_ACTION_CLOSE)}>
            
            <Modal.Header closeButton>
               <Modal.Title className='h5'>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{content}</Modal.Body>

            <Modal.Footer>
               <Button variant="secondary" onClick={()=> onAction(MODAL_ACTION_CLOSE)}>
                  Close
               </Button>
               <Button variant="primary" onClick={()=> onAction(MODAL_ACTION_CONFIRM)}>
                  Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ConfirmModal