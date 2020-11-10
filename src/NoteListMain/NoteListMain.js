import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';

const NoteListMain = function(props) {
  return (
    <section className='NoteListMain'>
      <ul>
        {props.notes.map(note => {
          return(
            <li key={note.id}>
            <Note id={note.id} name={note.name} modified={note.modified} />
          </li>
            )
          
        })}
      </ul>
      <button type='button'>Add Note</button>
    </section>
    )
}
NoteListMain.defaultProps = {
  notes:[]
}
export default NoteListMain;