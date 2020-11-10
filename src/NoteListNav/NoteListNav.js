import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const countNotesForFolder = function(notes, folderId) {
  return notes.filter(note => note.folderId === folderId).length
}

const NoteListNav = function(props) {
  return (
    <div className='NoteListNav'>
      <ul className='folder-list'>
        {props.folders.map(folder => {
          return (
            <li key={folder.id}>
            <NavLink className='folder-link' to={`/folder/${folder.id}`} >
            <span>{countNotesForFolder(props.notes, folder.id)}</span>
            {folder.name}
            </NavLink>
          </li>
          )
          
        })}
      </ul>
      <button>Add Folder</button>
    </div>

    )
}

NoteListNav.defaultProps = {
  folders:[]
}

export default NoteListNav;