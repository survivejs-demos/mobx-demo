import uuid from 'node-uuid';
import {extendObservable, computed, autorun} from 'mobx';
import storage from '../libs/storage';

class NoteStore {
  @computed get toJson() {
    // The storage representation of the notes collection.
    return this.notes.slice();
  }
  constructor() {
    extendObservable(this, {
      notes: this.load()
    });

    // Create some defaults for demo purposes...
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
    autorun(() => {
      storage.set('NoteStore', this.toJson);
    });
  }
}

export default new NoteStore()
