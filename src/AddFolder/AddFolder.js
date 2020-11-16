import React from 'react';
import PropTypes from 'prop-types';
import StoreContext from '../StoreContext';
import ValidateError from '../ValidateError';


class AddFolder extends React.Component {

  static defaultProps = {
    history: {
      push: () => {}
    },
  }
  static contextType = StoreContext;

  constructor(props) {
    super(props);
    this.handleFolderName = this.handleFolderName.bind(this)
  }
  state = {
    name: {
      value: '',
      touched: false,
    },
  }
  validateName = () => {
    const folderName = this.state.name.value.trim();
    console.log(folderName);
    if (folderName.length === 0 ) {
      return 'Folder name is required';
    } else if (folderName.length < 3) {
      return 'Folder name must at least 3 characters';
    }
  }

  handleFolderName = (name) => {
    
    this.setState({name: {value: name, touched: true,}})
  }

  handleSubmitClick = event => {
    event.preventDefault();
    const nameError = this.validateName();
    let newFolder = {}
    if(!nameError) {
      newFolder = {
        name: this.state.name.value,
        touched: true,
        }
    } else {
      console.log('error')
      return;
    }
    
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
    const nameError = this.validateName();
    return (
      <form className='add-folder-form' onSubmit={event => this.handleSubmitClick(event)}>
        <fieldset>
          <legend>Add Folder</legend>
          <label htmlFor='name'>Folder Name: </label>
          <input type='text' id='name' name='name' value={this.state.name.value} onChange={event => this.handleFolderName(event.target.value)}  />
          <>{this.state.name.touched && (<ValidateError message={nameError} />)}</>
          <button type='submit' >Save Folder</button>
        </fieldset>
      </form>
      )
  }


}

AddFolder.propTypes = {
  history: PropTypes.object,
}

export default AddFolder;
