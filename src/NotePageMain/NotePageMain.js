import React from 'react';
import Note from '../Note/Note';
import { findNote } from '../helperFunctions';
import StoreContext from '../StoreContext';
import PropTypes from 'prop-types';

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
NotePageMain.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
}



export default NotePageMain;