import React from 'react';
import StoreContext from '../StoreContext';
import ValidateError from '../ValidateError';
import './AddNote.css';

class AddNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }

  static contextType=StoreContext;

  state = {
    title: {
      value: '',
      touched: false,
    },
    content: {
      value: '',
      touched: false,
    },
  }

  validateName = () => {
    const name = this.state.title.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }
  validateContent = () => {
    const content = this.state.content.value.trim();
    if(content.length === 0) {
      return 'Content is required'
    }
  }

  handleTitleChange = title => {
    this.setState({title: {
      value: title,
      touched:true,
    }})
  }

  handleContentChange = content => {
    this.setState({content: {
      value: content,
      touched:true,
    }})
  }

  

  handleSubmitNewNote = event => {
    event.preventDefault();
    let nameError = this.validateName();
    let contentError = this.validateContent();
    let newNote = {}
    if(!nameError && !contentError) {
      newNote = {
        name: this.state.title.value,
        content: this.state.content.value,
        folderId: event.target['folderId'].value,
        modified: new Date(),
      }
    } else {
      console.log('error');
      return;
    }
      
      
    
    fetch(`http://localhost:9090/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then(note => {
      this.context.addNote(note)
      this.props.history.push(`/folder/${note.folderId}`)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    const {folders} = this.context
    const nameError = this.validateName();
    const contentError = this.validateContent();
    return(
      <form className='add-note-form' onSubmit={event => this.handleSubmitNewNote(event)}>
        <fieldset>
          <legend>Add Note</legend>
          <label htmlFor='title'>Title</label>
          <input type='text' required id='title' name='title' value={this.state.title.value} onChange={event => this.handleTitleChange(event.target.value)} />
          <>{this.state.title.touched && (<ValidateError message={nameError} />)}</> <br />
          <label htmlFor='content'>Content</label>
          <input type='text' id='content' name='content' value={this.state.content.value} onChange={event => this.handleContentChange(event.target.value)}required /> <>{this.state.content.touched && (<ValidateError message={contentError} />)}</><br />
          <label htmlFor='folderId'>Folder</label>
          <select id='folderId' name='folderId' required >
            <option value=''>Choose Below</option>
            {folders.map(folder => {
              return (
                
                <option key={folder.id} value={folder.id} >{folder.name}</option>
              )
            })}
          </select>
          <button type='submit'>Save</button>
        </fieldset>
        
      </form>
      )
  }
}

export default AddNote;