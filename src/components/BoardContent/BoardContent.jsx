import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'

import { mapOrder } from '../../untilities/sort.js'
import { applyDrag } from '../../untilities/applyDrag.js'
import { initdata } from '../../actions/initData.js'
import Column from '../Column/Column'
import './boardcontent.scss'

function BoardContent() {
   const [board, setBoard] = useState({});
   const [columns, setColumns] = useState([]);

   useEffect(() => {
      const boardDb = initdata.boards.find(board => board.id === 'board-1')
      if (boardDb) {
         setBoard(boardDb)

         setColumns(mapOrder(boardDb.columns, boardDb.columnOrder, 'id'));
      }
   }, [])

   if (isEmpty(board)) {
      return (
         <div className='not-found'> board not found</div>
      )
   }

   const onColumnDrop = (dropResult) => {
      let newColumns = [...columns];
      let newBoard = {...board };

      newColumns = applyDrag(newColumns, dropResult);
      newBoard.columnOrder = newColumns.map(column => column.id)
      newBoard.columns = newColumns

      setColumns(newColumns);
      setBoard(newBoard);
   }

   const onCardDrop = (columnId, dropResult) => {
      if(dropResult.removedIndex !== null || dropResult.addedIndex !== null){
         let newColumns = [...columns]
         let currentColumns = newColumns.find(column => column.id === columnId)

         console.log(currentColumns)
         currentColumns.cards = applyDrag(currentColumns.cards, dropResult)
         currentColumns.cardOrder = currentColumns.cards.map(i => i.id)

         setColumns(newColumns)
      }
   } 
   return (
      <div className='board-content'>
         <Container
            orientation='horizontal'
            onDrop={onColumnDrop}
            dragHandleSelector=".column-drag-handle"
            getChildPayload={index => columns[index]}
            dropPlaceholder={{
               animationDuration: 150,
               showOnTop: true,
               className: 'column-drop-preview'
            }}
         >
            {columns.map((column, index) => (
               <Draggable key={index}>
                  <Column column={column} onCardDrop={onCardDrop} />
               </Draggable>
            ))}

         </Container>

         <div className='addNew-column'>
            <i className='fa fa-plus icon'/> Add another column
         </div>
      </div>
   )
}

export default BoardContent