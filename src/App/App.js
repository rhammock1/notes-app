
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListNav from '../NoteListNav/NoteListNav';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import APIContext from '../APIContext';
import AddNote from '../AddNote/AddNote';




class App extends Component {
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    let baseURL = 'http://localhost:9090';
    Promise.all ([
      fetch(`${baseURL}/notes`),
      fetch(`${baseURL}/folders`)
    ])
    .then(([notesRes, foldersRes]) => {
      if(!notesRes.ok) {
        return notesRes.json().then(error => Promise.reject(error));
      }
      if(!foldersRes.ok) {
        return foldersRes.json().then(error => Promise.reject(error));
      }
      return Promise.all([notesRes.json(), foldersRes.json()]);
    })
    .then(([notes, folders]) => {
      this.setState({notes, folders});
    })
    .catch(error => {
      console.error({error});
    })
  }
   handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  handleAddFolder = newFolder => {
    this.setState({
      folders: [
        ...this.state.folders, newFolder
      ]
    });
  }
  handleAddNote = newNote => {
    this.setState({
      notes: [
        ...this.state.notes, newNote
      ]
    });
  }

  renderNavRoutes() {
    
    
    return (
      <>
      
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            component={NoteListNav}
           />
        ))}
        <Route  
          path='/note/:noteId'
          componenet={NotePageNav}
        />
        <Route path='/add-folder' component={NotePageNav} />
        <Route path='/add-note' component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
           />
        ))}
        <Route
          path='/note/:noteId'
          component={NotePageMain} />
        <Route path='/add-folder' component={AddFolder} />
        <Route path='/folder/add-folder' component={AddFolder} />
        <Route path='/add-note' component={AddNote} />
      </>
    )
  }

  render() {
    const value= {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
    };
    return(
      <APIContext.Provider value={value}>
        <div className='App'>
          <header>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <div className='nav-main'>
            <nav className='app-nav'>{this.renderNavRoutes()}</nav>
          
            <main className='app-main'>{this.renderMainRoutes()}</main>
        </div>
          </div>
          
      </APIContext.Provider>
      
    )
  }
}

export default App;
