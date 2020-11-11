import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import APIContext from '../APIContext';
import { countNotesForFolder } from '../helperFunctions';


class NoteListNav extends React.Component {
  static contextType=APIContext;

  render() {
    const { folders, notes } = this.context;
    return (
    <div className='NoteListNav'>
      <ul className='folder-list'>
        {folders.map(folder => {
          return (
            <li key={folder.id}>
            <NavLink className='folder-link' to={`/folder/${folder.id}`} >
            <span>{countNotesForFolder(notes, folder.id)}</span>
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
  
}


export default NoteListNav;