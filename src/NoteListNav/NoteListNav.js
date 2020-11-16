import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import StoreContext from '../StoreContext';
import { countNotesForFolder } from '../helperFunctions';
import './NoteListNav.css';
import PropTypes from 'prop-types';


class NoteListNav extends React.Component {
  static contextType=StoreContext;



  render() {
    const { folders, notes } = this.context;
    return (
    <div className='NoteListNav'>
      <ul className='folder-list'>
        <Link to='add-folder'><button>Add Folder</button></Link>
        {folders.map(folder => {
          return (
            <li className='folder-nav'key={folder.id}>
            <NavLink className='folder-link' to={`/folder/${folder.id}`} >
            {folder.name}
            </NavLink>
            <span>{countNotesForFolder(notes, folder.id)}</span>
          </li>
          )
          
        })}
      </ul>
      
    </div>

    )
  }
  
}
NoteListNav.propTypes = {
  folders: PropTypes.array,
  notes: PropTypes.array,
}


export default NoteListNav;