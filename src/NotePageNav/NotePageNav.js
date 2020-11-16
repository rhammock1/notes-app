import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import { findNote, findFolder } from '../helperFunctions';
import './NotePageNav.css';
import PropTypes from 'prop-types';


class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => { }
    },
    match: {
      params: []
    }
  }

  static contextType = StoreContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {}
    const folder = findFolder(folders, note.folderId)
    return (
    <div className='NotePageNav'>
      <Link to='/'><button>Back</button></Link>
      {folder && (
        <h3 className='note-page-folder'>{folder.name}</h3>
      )}
    </div>

  )
  }
  
}
NotePageNav.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
}

export default NotePageNav;