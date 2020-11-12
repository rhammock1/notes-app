import React from 'react';
import ReactDOM from 'react-dom';
import NoteListMain from './NoteListMain';
import { BrowserRouter } from 'react-router-dom';

describe('NoteListMain component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NoteListMain />
    </BrowserRouter>, div)
  })
})