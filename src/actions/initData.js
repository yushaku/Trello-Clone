export const initdata = {
   boards:[
      {
         id:'board-1',
         columnOrder: ['column-3', 'column-1', 'column-2'],
         columns:[
            {
               id: 'column-1',
               boardId: 'board-1',
               title: 'todo list',
               cardOrder: ['card-1', 'card-2'],
               cards:[
                  {
                     id: 'card-1',
                     boardId:'board-1',
                     columnId: 'column-1',
                     title:'this is title of card 1',
                     cover: null,
                  },
                  {
                     id: 'card-2',
                     boardId:'board-1',
                     columnId: 'column-1',
                     title:'this is title of card 2',
                     cover: null,
                  }
               ]
            },
            {
               id: 'column-2',
               boardId: 'board-1',
               title: 'in process',
               cardOrder: ['card-3','card-10', 'card-4'],
               cards:[
                  {
                     id: 'card-3',
                     boardId:'board-1',
                     columnId: 'column-2',
                     title:'this is title of card 3',
                     cover: null,
                  },
                  {
                     id: 'card-4',
                     boardId:'board-1',
                     columnId: 'column-2',
                     title:'this is title of card 4',
                     cover: 'https://images.unsplash.com/photo-1640622842523-4825918c4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
                  },
                  {
                     id: 'card-10',
                     boardId:'board-1',
                     columnId: 'column-2',
                     title:'this is title of card 10',
                     cover: null,
                  }
               ]
            },
            {
               id: 'column-3',
               boardId: 'board-1',
               title: 'done',
               cardOrder: ['card-6', 'card-5'],
               cards:[
                  {
                     id: 'card-5',
                     boardId:'board-1',
                     columnId: 'column-3',
                     title:'this is title of card 5',
                     cover: null,
                  },
                  {
                     id: 'card-6',
                     boardId:'board-1',
                     columnId: 'column-3',
                     title:'this is title of card 6',
                     cover: null,
                  }
               ]
            }
         ]

      }
   ]
}