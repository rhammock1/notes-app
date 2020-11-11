import React from 'react';


const APIContext = React.createContext({
  notes:[],
  fodlers:[],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

export default APIContext;