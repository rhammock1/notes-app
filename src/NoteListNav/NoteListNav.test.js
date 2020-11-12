import React from 'react';
import ReactDOM from 'react-dom';
import NoteListNav from './NoteListNav';
import { BrowserRouter } from 'react-router-dom';


describe('NoteListNav component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><NoteListNav />
    </BrowserRouter>, div)
  })
})