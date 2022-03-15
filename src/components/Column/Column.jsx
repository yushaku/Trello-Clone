import React, { useEffect, useRef, useState } from 'react'
import { mapOrder } from '../../untilities/sort.js'
import { Container, Draggable } from 'react-smooth-dnd'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

import { createNewCard, updateColumn } from '../../actions/API.js'
import Card from '../Card/Card'
import { MODAL_ACTION_CONFIRM } from '../commom/constants'
import ConfirmModal from '../commom/ConfirmModal.jsx'
import './column.scss'

function Column({ column, onCardDrop, onUpdateColumnState }) {

   const [showConfirmModal, setShowConfirmModal] = useState(false)
   const [columnTitle, setColumnTitle] = useState('');
   const cards = mapOrder(column.cards, column.cardOrder, '_id');

   const [openInputCard, setOpenInputCard] = useState(false)
   const toggleInputCard = () => setOpenInputCard(!openInputCard)


   useEffect(() => {
      setColumnTitle(column.title)
   }, [column.title])


   //auto focus
   const newCardInputRef = useRef(null);
   useEffect(() => {
      if (newCardInputRef && newCardInputRef.current) {
         newCardInputRef.current.focus()
      }
   }, [openInputCard])

   //add card title
   const [cardTitle, setCardTitle] = useState('')
   const handleAddCard = () => {
      if (!cardTitle) {
         newCardInputRef.current.focus()
         return
      }

      let newCardToAdd = {
         title: cardTitle.trim(),
         boardId: column.boardId,
         columnId: column._id,
      }

      createNewCard(newCardToAdd).then(cardId=>{

         newCardToAdd ={
            _id: cardId,
            ...newCardToAdd,
            cover: null,
         }
         let newColumn = cloneDeep(column)
         newColumn.cards.push(newCardToAdd);
         newColumn.cardOrder.push(cardId)
         onUpdateColumnState(newColumn)
         setCardTitle('')
         toggleInputCard()
      })
   }

   const confirmModalAction = (type) => {
      if (type === MODAL_ACTION_CONFIRM) {
         const newColumn = {
            ...column,
            _destroy: true
         }
         updateColumn(newColumn._id,newColumn)
         onUpdateColumnState(newColumn)
      }

      toggleShowConfirmModal()
   }

   const handleUpdateColumnTitle = () => {
      if(columnTitle !== column.title){
         const newColumn = {
            ...column,
            title: columnTitle
         }
         updateColumn(newColumn._id,newColumn)
         onUpdateColumnState(newColumn)
      }
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
                  onMouseDown={(event) => event.target.blur()}
                  onChange={e => setColumnTitle(e.target.value)}
                  onKeyDown={event => (event.key === 'Enter') && event.target.blur()}
                  onBlur={handleUpdateColumnTitle}
               />
            </div>

            <div className='column-dropdown'>
               <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" size='sm' className='dropdown-btn' />
                  <Dropdown.Menu>
                     <Dropdown.Item>Column action</Dropdown.Item>
                     <Dropdown.Divider />
                     <Dropdown.Item >Add card to column</Dropdown.Item>
                     <Dropdown.Item onClick={toggleShowConfirmModal}>store column</Dropdown.Item>
                     <Dropdown.Item >edit column</Dropdown.Item>
                     <Dropdown.Item >follow</Dropdown.Item>
                     <Dropdown.Divider />
                     <Dropdown.Item >copy column</Dropdown.Item>
                     <Dropdown.Item >move column</Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>

         </header>

         <div className='card-list'>

            <Container
               {...column.props}
               groupName="col"
               onDrop={dropResult => onCardDrop(column._id, dropResult)}
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
         {openInputCard &&
            <div className='add-card_area'>
               <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter new card..."
                  className='inputNewCard'
                  ref={newCardInputRef}
                  value={cardTitle}
                  onChange={e => setCardTitle(e.target.value)}
                  onKeyDown={event => (event.key === 'Enter') && handleAddCard()}
               />
               <Button className='btn' variant='info' size='sm' onClick={handleAddCard}> add card</Button>
               <Button className='cancel-btn btn' variant='danger' size='sm' onClick={toggleInputCard}>
                  <i className='fa fa-trash icon'></i>
               </Button>
            </div>
         }
         {!openInputCard &&
            <footer onClick={toggleInputCard}>
               <div className='footer-actions'>
                  <i className='fa fa-plus icon'></i>  add another card
               </div>
            </footer>
         }

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