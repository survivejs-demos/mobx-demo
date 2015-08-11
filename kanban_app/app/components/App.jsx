import uuid from 'node-uuid';
import React from 'react';
import {reactiveComponent} from 'mobservable';
import Notes from './Notes.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }
  render() {
    const notes = this.props.store.notes;

    // XXX: why is this needed?
    console.log('notes', notes);

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes items={notes}
          onEdit={this.editNote} onDelete={this.deleteNote} />
      </div>
    );
  }
  // XXX
  deleteNote(id) {
    this.props.store.deleteNote(this.props.todo);
  }
  addNote() {
    this.props.store.addNote({task: 'New task'});
  }
  editNote(id, task) {
    // TODO
  }
}

export default reactiveComponent(App);
