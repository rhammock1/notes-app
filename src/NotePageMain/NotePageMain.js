import React from 'react';
import Note from '../Note/Note';
import { findNote } from '../helperFunctions';
import StoreContext from '../StoreContext';

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    },
    
  }
  static contextType=StoreContext;

  handleDeleteNote = (folderId) => {
    this.props.history.push(`/folder/${folderId}`)
  }

  render() {
    const { notes } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }

    return (
    <section className='notePageMain'>
      <Note id={note.id} folderId={note.folderId} name={note.name} modified={note.modified} onDeleteNote={this.handleDeleteNote} />
      <div className='notePageContent'>
        <p>{note.content}</p>
      </div>
    </section>
  )
  }
  
}



export default NotePageMain;