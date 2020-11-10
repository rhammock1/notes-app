import React from 'react';

const NotePageNav = function(props) {
  return (
    <div className='NotePageNav'>
      <button>Back</button>
      {props.folder && (
        <h3>{props.folder.name}</h3>
      )}
    </div>

  )
}

export default NotePageNav;