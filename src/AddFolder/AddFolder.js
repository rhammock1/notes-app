import React from 'react';
import APIContext from '../APIContext';


class AddFolder extends React.Component {

  static defaultProps = {
    history: {
      push: () => {}
    },
  }
  static contextType = APIContext;

  constructor(props) {
    super(props);
    this.handleFolderName = this.handleFolderName.bind(this)
  }
  state = {
    name: {
      value: '',
    },
  }

  handleFolderName = (name) => {
    
    this.setState({name: {value: name}})
  }

  handleSubmitClick = event => {
    event.preventDefault();
    console.log('submit button pressed');
    const newFolder = {
      name: this.state.name.value,
    };
    
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(event => Promise.reject(event))
      }
      
      return res.json()
    })
    .then(newFolder => {
      console.log(newFolder)
      this.context.addFolder(newFolder)
      this.props.history.push(`/folder/${newFolder.id}`)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {
    return (
      <form className='add-folder-form' onSubmit={event => this.handleSubmitClick(event)}>
        <fieldset>
          <legend>Add Folder</legend>
          <label htmlFor='name'>Folder Name: </label>
          <input type='text' id='name' name='name' value={this.state.name.value} onChange={event => this.handleFolderName(event.target.value)}  />
          <button type='submit' >Save Folder</button>
        </fieldset>
      </form>
      )
  }


}

export default AddFolder;