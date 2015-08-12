import React from 'react';
import Notes from './Notes.jsx';

import NoteStore from '../stores/NoteStore'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const store = NoteStore;

    this.addNote = store.addNote.bind(store, {task: 'New task'});
    this.editNote = store.editNote.bind(store);
    this.deleteNote = store.deleteNote.bind(store);
  }
  render() {
    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes items={NoteStore.notes}
          onEdit={this.editNote} onDelete={this.deleteNote} />
      </div>
    );
  }
};
