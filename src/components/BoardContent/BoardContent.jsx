import React, { useState, useEffect, useRef } from 'react'
import { isEmpty, cloneDeep } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'

import { fetchBoardDetail, createNewColumn, updateBoard, updateColumn, updateCard } from '../../actions/API.js'
import { mapOrder } from '../../untilities/sort.js'
import { applyDrag } from '../../untilities/applyDrag.js'
import Column from '../Column/Column'
import './boardcontent.scss'

function BoardContent() {

   const [board, setBoard] = useState({});
   const [columns, setColumns] = useState([]);

   const [openInputColumn, setOpenInputColumn] = useState(false)
   const toggleInputColumn = () => setOpenInputColumn(!openInputColumn)

   const [columnTitle, setColumnTitle] = useState('')
   const newColumnInputRef = useRef(null)

   useEffect(() => {

      const id = '6224ad67245fbe59fd575787'
      fetchBoardDetail(id).then(boardDb => {
         if(boardDb){
            setBoard(boardDb)
            setColumns(mapOrder(boardDb.columns, boardDb.columnOrder, '_id'));
         }
      })
   }, [])

   useEffect(() => {
      if (newColumnInputRef && newColumnInputRef.current) {
         newColumnInputRef.current.focus()
      }
   }, [openInputColumn])

   if (isEmpty(board)) {
      return (
         <div className='not-found'> board not found</div>
      )
   }

   const onColumnDrop = (dropResult) => {

      let newColumns = cloneDeep(columns);
      newColumns = applyDrag(newColumns, dropResult);

      let newBoard = cloneDeep(board);
      newBoard.columnOrder = newColumns.map(column => column._id)
      newBoard.columns = newColumns

      setColumns(newColumns);
      setBoard(newBoard);
      
      //call api update column orders in board detail
      updateBoard(newBoard._id, newBoard)
      .catch(error => {
         console.log(error)
         setColumns(columns);
         setBoard(board);
      })
   }

   const onCardDrop = (columnId, dropResult) => {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
         let newColumns = cloneDeep(columns);
         let currentColumns = newColumns.find(column => column._id === columnId)

         currentColumns.cards = applyDrag(currentColumns.cards, dropResult)
         currentColumns.cardOrder = currentColumns.cards.map(i => i._id)

         setColumns(newColumns)

         if(dropResult.removedIndex !== null && dropResult.addedIndex !== null){
            //action: when u drop card on its column + call api update cardOrder in is column
            updateColumn(currentColumns._id, currentColumns)
            .catch(()=> setColumns(newColumns))

         }else{
            //action: when u drop card to other column
            //call api update cardOrder in is column
            updateColumn(currentColumns._id, currentColumns)
            .catch(()=> setColumns(newColumns))

            if(dropResult.addedIndex !== null){
               //call api update columnId in current card
               const currentCard = cloneDeep(dropResult.payload)
               currentCard._id = currentColumns._id
               updateCard(currentCard._id, currentCard).catch((error)=>{
                  console.log(error)
               })
            }

         }
      }
   }

   const onUpdateColumnState = (newColumnToUpdate) => {

      const columnIdToUpdate = newColumnToUpdate._id

      let newColumns = [...columns]
      const columnIndexToUpdate = newColumns.findIndex(item => item._id === columnIdToUpdate)

      if (newColumnToUpdate._destroy) {
         newColumns.splice(columnIndexToUpdate, 1)
      } else {
         newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)
      }

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map(column => column._id)
      newBoard.columns = newColumns

      setColumns(newColumns);
      setBoard(newBoard);

   }

   const handleAddColumn = () => {
      if (!columnTitle) {
         newColumnInputRef.current.focus()
         return
      }
      let newColumnToAdd = {
         title: columnTitle.trim(),
         boardId: board._id,
      }

      createNewColumn(newColumnToAdd)
      .then(columnId=>{

         let newColumns = [...columns]
         newColumnToAdd = {
            _id:columnId,
            ...newColumnToAdd,
            cardOrder:[],
            cards:[]
         }
         newColumns.push(newColumnToAdd)
   
         let newBoard = { ...board };

         console.log(newColumns)
         newBoard.columnOrder = newColumns.map(column => column._id)
         newBoard.columns = newColumns
   
         setColumns(newColumns);
         setBoard(newBoard);
         setColumnTitle('');
         toggleInputColumn()
      })
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
                  <Column column={column} onCardDrop={onCardDrop} onUpdateColumnState={onUpdateColumnState} />
               </Draggable>
            ))}

         </Container>

         <BootstrapContainer className='trello-container'>
            {!openInputColumn &&
               <Row>
                  <Col className='addNew-column' onClick={toggleInputColumn}>
                     <i className='fa fa-plus icon' /> Add another column
                  </Col>
               </Row>
            }
            {openInputColumn &&
               <Row>
                  <Col className='enterNew-column'>
                     <Form.Control
                        type="text"
                        placeholder="Enter new column"
                        className='inputEnterNewCol'
                        ref={newColumnInputRef}
                        value={columnTitle}
                        onChange={e => setColumnTitle(e.target.value)}
                        onKeyDown={event => (event.key === 'Enter') && handleAddColumn()}
                     />
                     <Button className='btn' variant='info' size='sm' onClick={handleAddColumn}> add column</Button>
                     <Button className='cancel-btn btn' variant='danger' size='sm' onClick={toggleInputColumn}>
                        <i className='fa fa-trash icon'></i>
                     </Button>
                  </Col>
               </Row>
            }
         </BootstrapContainer>

      </div>
   )
}

export default BoardContent