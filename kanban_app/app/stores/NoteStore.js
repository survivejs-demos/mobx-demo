import uuid from 'node-uuid';
import mobservable, {makeReactive, sideEffect} from 'mobservable';
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
    // MWE: the json representation for storage, just another view on this store..
    this.toJson = makeReactive(() => {
      console.log('Serializing NoteStore');
      return mobservable.toJson(this.notes);
    });
    this.persist();
  }
  addNote({task}) {
    const note = {id: uuid.v4(), task};

    this.notes.push(note);

    return note;
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
    sideEffect(() => {
      console.log('storing notes');
      storage.set('NoteStore', this.toJson());
    });
  }
}

export default new NoteStore()
