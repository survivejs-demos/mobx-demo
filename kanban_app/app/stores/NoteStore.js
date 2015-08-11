import uuid from 'node-uuid';
import {makeReactive} from 'mobservable';

const noteStore = makeReactive({
  notes: [
    {
      id: uuid.v4(),
      task: 'Learn webpack'
    },
    {
      id: uuid.v4(),
      task: 'Learn React'
    },
    {
      id: uuid.v4(),
      task: 'Do laundry'
    }
  ]
});

noteStore.addNote = function({task}) {
  console.log('add note 2');

  this.notes.push({id: uuid.v4(), task});
};

noteStore.deleteNote = function(id) {
  // TODO
  //this.notes.splice(this.notes.indexOf(id), 1);
};

/*

// delete
const notes = this.state.notes;
const noteIndex = this.findNote(id);

if(noteIndex < 0) {
  return;
}

this.setState({
  notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
});
};

// edit
let notes = this.state.notes;
const noteIndex = this.findNote(id);

if(noteIndex < 0) {
  return;
}

notes[noteIndex].task = task;

this.setState({notes});

// find
const notes = this.state.notes;
const noteIndex = notes.findIndex((note) => note.id === id);

if(noteIndex < 0) {
  console.warn('Failed to find note', notes, id);
}

return noteIndex;
 */

export default noteStore;
