import React from 'react';
import { Link } from 'react-router-dom';
import StoreContext from '../StoreContext';


class Note extends React.Component {
  constructor(props) {
    super(props)
  }
  static defaultProps = {
    history: {
      push: () => {}
    },
  }
  static contextType = StoreContext;

  handleDeleteClick = event => {
    event.preventDefault()
    const noteId = this.props.id
    const folderId = this.props.folderId
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
      this.props.onDeleteNote(folderId)
    })
    .catch(error => {
      console.error({ error });
    })
  }
  
  render() {
    const { name, id, modified } = this.props
    let date = new Date(modified);
    let hours = date.getHours();
    hours = ((hours + 11) % 12 + 1);
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes:'' + minutes;
    return(
    <div className='note'>
      <h2>
        <Link to={`/note/${id}`}>
          {name}
        </Link>
      </h2>
      <div className='buttonDate-container'>
        <p>{`Last modified on: ${hours}:${minutes} ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        
        }</p>
        <button onClick={this.handleDeleteClick}>Delete Note</button>
      </div>
      

    </div>
    )
  }
  
}

export default Note;