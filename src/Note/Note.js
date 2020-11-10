import React from 'react';
import { Link } from 'react-router-dom';

const Note = function(props) {
  return(
    <div className='note'>
      <h2>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <div className='buttonDate-container'>
        <p>{props.modified}</p>
        <button type='button'>Delete Note</button>
      </div>
      

    </div>
    )
}

export default Note;