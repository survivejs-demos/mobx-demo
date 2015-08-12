import uuid from 'node-uuid';
import {makeReactive} from 'mobservable';

class NoteStore {
  constructor() {
    this.notes = makeReactive([
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
    ]);
  }
  addNote({task}) {
    const id = uuid.v4();
    const note = {id, task};
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
}

export default new NoteStore()
