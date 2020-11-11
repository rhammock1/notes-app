import React from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext';


class Note extends React.Component {
  
  static defaultProps = {
    onDeleteNote: () => {}
  }
  static contextType = APIContext;

  handleDeleteClick = event => {
    event.preventDefault()
    const noteId = this.props.id
    console.log(noteId, 'Delete button clicked');
    
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => Promise.reject(error));
      }
      return res.json();
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({ error });
    })
  }
  
  render() {
    const { name, id, modified } = this.props
    return(
    <div className='note'>
      <h2>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <div className='buttonDate-container'>
        <p>{modified}</p>
        <button type='button' onClick={this.handleDeleteClick}>Delete Note</button>
      </div>
      

    </div>
    )
  }
  
}

export default Note;