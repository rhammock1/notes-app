import React from 'react';
import Note from '../Note/Note';
import { findNote } from '../helperFunctions';
import APIContext from '../APIContext';

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType=APIContext;

  handleDeleteNote = noteId => {
    this.props.history.push('/')
  }

  render() {
    const { notes } = this.context
    const { noteId } = this.props.match.params
    const note = findNote(notes, noteId) || { content: '' }

    return (
    <section className='notePageMain'>
      <Note id={note.id} name={note.name} modified={note.modified} onDeleteNote={this.handleDeleteNote} />
      <div className='notePageContent'>
        <p>{note.content}</p>
      </div>
    </section>
  )
  }
  
}



export default NotePageMain;