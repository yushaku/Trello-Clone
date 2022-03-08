import React, { useState, useEffect, useRef } from 'react'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BootstrapContainer, Row, Col, Form, Button } from 'react-bootstrap'
import { fetchBoardDetail } from '../../actions/API.js'
import { mapOrder } from '../../untilities/sort.js'
import { applyDrag } from '../../untilities/applyDrag.js'
import { initdata } from '../../actions/initData.js'
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
         setBoard(boardDb)
         setColumns(mapOrder(boardDb.columns, boardDb.columnOrder, '_id'));
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
      let newColumns = [...columns];

      newColumns = applyDrag(newColumns, dropResult);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map(column => column._id)
      newBoard.columns = newColumns

      console.log(newColumns)

      setColumns(newColumns);
      setBoard(newBoard);
   }

   const onCardDrop = (columnId, dropResult) => {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
         let newColumns = [...columns]
         let currentColumns = newColumns.find(column => column._id === columnId)

         currentColumns.cards = applyDrag(currentColumns.cards, dropResult)
         currentColumns.cardOrder = currentColumns.cards.map(i => i._id)

         setColumns(newColumns)
      }
   }

   const onUpdateColumn = (newColumnToUpdate) => {

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
      const newColumnToAdd = {
         id: Math.random().toString(36).substring(2, 5),
         boardId: board._id,
         title: columnTitle.trim(),
         cardOrder: [],
         cards: []
      }
      let newColumns = [...columns]
      newColumns.push(newColumnToAdd)

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map(column => column._id)
      newBoard.columns = newColumns

      setColumns(newColumns);
      setBoard(newBoard);
      setColumnTitle('');
      toggleInputColumn()
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
                  <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
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