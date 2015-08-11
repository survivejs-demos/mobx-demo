import uuid from 'node-uuid';
import React from 'react';
import Notes from './Notes.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const store = props.store;

    this.addNote = store.addNote.bind(store, {task: 'New task'});
    this.editNote = store.editNote.bind(store);
    this.deleteNote = store.deleteNote.bind(store);
  }
  render() {
    const notes = this.props.store.notes;

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes items={notes}
          onEdit={this.editNote} onDelete={this.deleteNote} />
      </div>
    );
  }
};
