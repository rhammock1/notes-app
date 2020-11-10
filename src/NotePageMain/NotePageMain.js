import React from 'react';
import Note from '../Note/Note';

const NotePageMain = function(props) {
  return (
    <section className='notePageMain'>
      <Note id={props.note.id} name={props.note.name} modified={props.note.modified} />
      <div className='notePageContent'>
        <p>{props.note.content}</p>
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

export default NotePageMain;