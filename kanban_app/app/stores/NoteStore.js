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
  this.notes.push({id: uuid.v4(), task});
};

noteStore.deleteNote = function(id) {
  const notes = this.notes;
  const noteIndex = this.findNote(id);

  if(noteIndex < 0) {
    return;
  }

  this.notes.splice(noteIndex, 1);
};

noteStore.findNote = function(id) {
  const notes = this.notes;
  const noteIndex = notes.findIndex((note) => note.id === id);

  if(noteIndex < 0) {
    console.warn('Failed to find note', notes, id);
  }

  return noteIndex;
};

/*
// edit
let notes = this.state.notes;
const noteIndex = this.findNote(id);

if(noteIndex < 0) {
  return;
}

notes[noteIndex].task = task;

this.setState({notes});
*/

export default noteStore;
