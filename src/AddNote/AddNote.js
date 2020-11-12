import React from 'react';
import APIContext from '../APIContext';
class AddNote extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }

  static contextType=APIContext;

  state = {
    title: {
      value: ''
    },
    content: {
      value: ''
    },
  }

  handleTitleChange = title => {
    this.setState({title: {
      value: title
    }})
  }

  handleContentChange = content => {
    this.setState({content: {
      value: content
    }})
  }

  

  handleSubmitNewNote = event => {
    event.preventDefault();
      const newNote = {
        name: this.state.title.value,
        content: this.state.content.value,
        folderId: event.target['folderId'].value,
        modified: new Date(),
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
    return(
      <form className='add-note-form' onSubmit={event => this.handleSubmitNewNote(event)}>
        <fieldset>
          <legend>Add Note</legend>
          <label htmlFor='title'>Title</label>
          <input type='text' required id='title' name='title' value={this.state.title.value} onChange={event => this.handleTitleChange(event.target.value)} />
          <label htmlFor='content'>Content</label>
          <input type='text' id='content' name='content' value={this.state.content.value} onChange={event => this.handleContentChange(event.target.value)}required />
          <label htmlFor='folderId'>Folder</label>
          <select id='folderId' name='folderId' required >
            <option value=''>Choose Below</option>
            {folders.map(folder => {
              return (
                console.log(folder.id),
                <option key={folder.id} value={folder.id} >{folder.name}</option>
              )
            })}
          </select>
        </fieldset>
        <button type='submit'>Save</button>
      </form>
      )
  }
}

export default AddNote;