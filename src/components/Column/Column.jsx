import React, { useState } from 'react'
import { mapOrder } from '../../untilities/sort.js'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form } from 'react-bootstrap'
import Card from '../Card/Card'
import './column.scss'
import { MODAL_ACTION_CONFIRM } from '../commom/constants'
import ConfirmModal from '../commom/ConfirmModal.jsx'

function Column({ column, onCardDrop , onUpdateColumn}) {

   const [showConfirmModal, setShowConfirmModal] = useState(false)
   const [columnTitle, setColumnTitle] = useState(column.title);
   const cards = mapOrder(column.cards, column.cardOrder, 'id');
   
   const confirmModalAction = (type) => {
      if (type === MODAL_ACTION_CONFIRM) {
         const newColumn = {
            ...column,
            _destroy: true
         }
         onUpdateColumn(newColumn)
      }

      toggleShowConfirmModal()
   }

   const handleUpdateColumnTitle = ()=>{
      const newColumn = {
         ...column,
         title: columnTitle
      }
      onUpdateColumn(newColumn)
   }

   const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

   return (
      <div className='column'>

         <header className='column-drag-handle'>
            <div className='column-title'>
               <Form.Control
                  type="text"
                  size='sm'
                  className='titleTrelloEditable'
                  spellCheck='false'
                  value={columnTitle}
                  onChange={e => setColumnTitle(e.target.value)}
                  //onMouseDown={(e) => e.preventDefault()}
                  onKeyDown={event => (event.key === 'Enter') && event.target.blur()}
                  onBlur={handleUpdateColumnTitle}
               />
            </div>

            <div className='column-dropdown'>
               <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" size='sm' className='dropdown-btn' />
                  <Dropdown.Menu>
                     <Dropdown.Item >Add card...</Dropdown.Item>
                     <Dropdown.Item onClick={toggleShowConfirmModal}>remove card</Dropdown.Item>
                     <Dropdown.Item >edit card</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>

         </header>

         <div className='card-list'>

            <Container
               {...column.props}
               groupName="col"
               onDrop={dropResult => onCardDrop(column.id, dropResult)}
               getChildPayload={index => cards[index]}
               dragClass="card-ghost"
               dropClass="card-ghost-drop"
               onDropReady={p => console.log('Drop ready: ', p)}
               dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'card-drop-preview'
               }}
               dropPlaceholderAnimationDuration={200}
            >

               {cards.map((card, index) => (
                  <Draggable key={index}>
                     <Card card={card} />
                  </Draggable>
               ))}

            </Container>


         </div>
         <footer>
            <div className='footer-actions'>
               <i className='fa fa-plus icon'></i>  add another card
            </div>
         </footer>

         <ConfirmModal
            show={showConfirmModal}
            onAction={confirmModalAction}
            title='remove column'
            content={`are you sure to remove column ${column.title}! and all related cards will also be remove`}
         />
      </div>
   )
}

export default Column