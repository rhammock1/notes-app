import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import Note from '../Note/Note';
import { getNotesForFolder } from '../helperFunctions';
import './NoteListMain.css';

class NoteListMain extends React.Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = StoreContext;
  
  render() {
    const { folderId } = this.props.match.params
    const { notes } = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)

    return (
    <section className='NoteListMain'>
      <ul>
        <Link to='/add-note'><button type='button'>Add Note</button></Link>
        {notesForFolder.map(note => {
          return(
            <li key={note.id}>
            <Note id={note.id} name={note.name} modified={note.modified} />
          </li>
            )
          
        })}
      </ul>
      
    </section>
    )
  }
  
}

export default NoteListMain;