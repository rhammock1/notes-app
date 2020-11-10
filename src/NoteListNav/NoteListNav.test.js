import React from 'react';
import ReactDOM from 'react-dom';
import NoteListNav from './NoteListNav';

describe('NoteListNav component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NoteListNav />, div)
  })
})