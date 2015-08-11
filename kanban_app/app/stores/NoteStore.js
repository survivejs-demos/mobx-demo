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

noteStore.editNote = function(id, task) {
  const notes = this.notes;
  const noteIndex = this.findNote(id);

  if(noteIndex < 0) {
    return;
  }

  // XXX: why doesn't this get committed?
  this.notes[noteIndex].task = task;
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

export default noteStore;
