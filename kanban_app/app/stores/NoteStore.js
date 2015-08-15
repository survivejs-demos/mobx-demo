import uuid from 'node-uuid';
import {makeReactive, sideEffect} from 'mobservable';
import storage from '../libs/storage';

class NoteStore {
  constructor() {
    this.notes = makeReactive(this.load());
    if (!this.notes.length) {
      this.notes.push(
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
      );
    }
    // The storage representation of the notes collection.
    this.toJson = makeReactive(() => {
      return this.notes.slice();
    });
    this.persist();
  }
  addNote({task}) {
    const notes = this.notes;

    notes.push({id: uuid.v4(), task});
    return notes[notes.length - 1];
  }
  editNote(note, task) {
    if(!note < 0) {
      return;
    }

    note.task = task
  }
  deleteNote(note) {
    const notes = this.notes;
    const noteIndex = notes.indexOf(note);

    if(noteIndex < 0) {
      return;
    }

    notes.splice(noteIndex, 1);
  }
  find(id) {
    const note = this.notes.find(note => note.id === id); // find is es7 'polyfill' provided by reactive arrays

    if (!note) {
      console.warn('Failed to find note: ' + id);
    }

    return note;
  }
  load() {
    return storage.get('NoteStore') || [];
  }
  persist() {
    // Whenever the Json representation of the notes changes, store them.
    sideEffect(() => {
      storage.set('NoteStore', this.toJson());
    });
  }
}

export default new NoteStore()
