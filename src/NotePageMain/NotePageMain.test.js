import React from 'react';
import ReactDOM from 'react-dom';
import NotePageMain from './Note';


describe('Note component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotePageMain />, div)
  })
})