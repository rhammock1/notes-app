
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListNav from '../NoteListNav/NoteListNav';
import './App.css';
import STORE from '../STORE';
import APIContext from '../APIContext';




class App extends Component {
  state = {
    notes: [],
    folders: []
  }
  handleDeleteNote(noteId) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }
  
  // componentDidMount() {
  //   setTimeout(() => this.setState(STORE), 500);
  // }

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
      </>
    )
  }

  render() {
    const value= {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote
    };
    return(
      <APIContext.Provider value={value}>
        <div className='App'>
          <nav className='app-nav'>{this.renderNavRoutes()}</nav>
          <header>
            <h1>
              <Link to='/'>Noteful</Link>
            </h1>
          </header>
          <main className='app-main'>{this.renderMainRoutes()}</main>
        </div>
      </APIContext.Provider>
      
    )
  }
}

export default App;
