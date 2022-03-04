import React from 'react'
import { mapOrder } from '../../untilities/sort.js'
import { Container, Draggable } from 'react-smooth-dnd'

import Card from '../Card/Card'
import './column.scss'

function Column({ column, onCardDrop }) {

   const cards = mapOrder(column.cards, column.cardOrder, 'id');

   return (
      <div className='column'>
         <header className='column-drag-handle'> {column.title} </header>
         <div className='card-list'>

            <Container
               {...column.props}
               groupName="col"
               onDrop={dropResult =>  onCardDrop(column.id, dropResult) }
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
      </div>
   )
}

export default Column