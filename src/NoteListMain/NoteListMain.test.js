import React from 'react';
import ReactDOM from 'react-dom';
import NoteListMain from './NoteListMain';

describe('NoteListMain component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoteListMain />, div)
  })
})