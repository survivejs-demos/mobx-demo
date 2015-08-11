import uuid from 'node-uuid';
import React from 'react';
import {reactiveComponent} from 'mobservable';
import Notes from './Notes.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addNote = props.store.addNote.bind(props.store, {task: 'New task'});
    this.editNote = this.editNote.bind(this);
    this.deleteNote = props.store.deleteNote.bind(props.store);
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
  editNote(id, task) {
    // TODO
  }
}

export default reactiveComponent(App);
