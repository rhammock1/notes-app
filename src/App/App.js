
import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListNav from '../NoteListNav/NoteListNav';
import './App.css';
import STORE from '../STORE';
import PropContext from '../APIContext';


const findFolder = function(folders, folderId) {
  return folders.find(folder => folder.id === folderId);
}

const findNote = function(notes, noteId) {
  return notes.find(note => note.id === noteId);
}

const getNotesForFolder = function(notes, folderId) {
  return (!folderId) ? notes : notes.filter(note => note.folderId === folderId)
}


class App extends Component {
  state = {
    notes: [],
    folders: []
  }
  
  // componentDidMount() {
  //   setTimeout(() => this.setState(STORE), 500);
  // }

  renderNavRoutes() {
    
    
    return (
      <>
      <PropContext.Provider>
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

      </PropContext.Provider>
        
      

      </>
    );
  }

  renderMainRoutes() {
    const {notes, folders} = this.state;
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              const notesForFolder = getNotesForFolder(notes, folderId);
              return (
                <NoteListMain {...routeProps} notes={notesForFolder} />
              );
            }} />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(notes, noteId);
            return <NotePageMain {...routeProps} note={note} />
          }} />
      </>
    )
  }

  render() {
    return(
      <div className='App'>
        <nav className='app-nav'>{this.renderNavRoutes()}</nav>
        <header>
          <h1>
            <Link to='/'>Noteful</Link>
          </h1>
        </header>
        <main className='app-main'>{this.renderMainRoutes()}</main>
      </div>
    )
  }
}

export default App;
