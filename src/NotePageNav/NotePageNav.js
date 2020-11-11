import React from 'react';
import APIContext from '../APIContext';
import { findNote, findFolder } from '../helperFunctions';


class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: []
    }
  }

  static contextType = APIContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
    <div className='NotePageNav'>
      <button>Back</button>
      {folder && (
        <h3>{folder.name}</h3>
      )}
    </div>

  )
  }
  
}

export default NotePageNav;