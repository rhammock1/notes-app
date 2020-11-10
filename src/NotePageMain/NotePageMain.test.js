import React from 'react';
import ReactDOM from 'react-dom';
import NotePageMain from './NotePageMain';
import { BrowserRouter } from 'react-router-dom';

describe('NotePageMain component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NotePageMain />
    </BrowserRouter>, div)
  })
})