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
    ])
  }
  addNote({task}) {
    this.notes.push({id: uuid.v4(), task})
  }
  editNote(id, task) {
    const notes = this.notes
    const noteIndex = this.findNote(id)

    if(noteIndex < 0) {
      return
    }

    this.notes[noteIndex].task = task
  }
  deleteNote(id) {
    const notes = this.notes
    const noteIndex = this.findNote(id)

    if(noteIndex < 0) {
      return
    }

    this.notes.splice(noteIndex, 1)
  }
  findNote(id) {
    const notes = this.notes
    const noteIndex = notes.findIndex((note) => note.id === id)

    if(noteIndex < 0) {
      console.warn('Failed to find note', notes, id)
    }

    return noteIndex
  }
}

export default new NoteStore()
