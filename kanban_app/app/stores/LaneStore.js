import uuid from 'node-uuid';
import {makeReactive, sideEffect} from 'mobservable';
import NoteStore from './NoteStore';
import storage from '../libs/storage';

class LaneStore {
  constructor() {
    this.lanes = makeReactive(this.load());
    // create some defaults for demo purposes...
    if (!this.lanes.length && NoteStore.notes.length >= 3) {
      this.lanes.push(
        {
          id: uuid.v4(),
          name: 'Todo',
          notes: [NoteStore.notes[0], NoteStore.notes[2]]
        },
        {
          id: uuid.v4(),
          name: 'Doing',
          notes: [NoteStore.notes[1]]
        },
        {
          id: uuid.v4(),
          name: 'Done',
          notes: []
        }
      );
    }

    this.toJson = makeReactive(() => {
      console.log('Serializing LaneStore');
      // MWE: if lane where classes, they could all have their own toJson, which would be slighlty nicer..
      return this.lanes.map(lane => ({
        ...lane,
        notes: lane.notes.map(note => note.id)
      }));
    });

    this.move = this.move.bind(this);
    this.persist();
  }
  addLane({name}) {
    this.lanes.push({id: uuid.v4(), name, notes: []})
  }
  editLane(lane, name) {
    lane.name = name;
  }
  deleteLane(lane) {
    const lanes = this.lanes;
    const laneIndex = lanes.indexOf(lane);

    if(laneIndex < 0) {
      return;
    }

    lanes.splice(laneIndex, 1);
  }
  attachToLane({lane, note}) {
    const lanes = this.lanes;

    if(!lane) {
      return;
    }

    this.removeNote(note);
    if(lane.notes.indexOf(note) === -1) {
      lane.notes.push(note);
    }
    else {
      console.warn('Already attached note to lane', lanes);
    }
  }
  removeNote(note) {
    const lanes = this.lanes;
    const removeLane = lanes.filter((lane) => {
      return lane.notes.indexOf(note) >= 0;
    })[0];

    if(!removeLane) {
      return;
    }

    const removeNoteIndex = removeLane.notes.indexOf(note);

    removeLane.notes.splice(removeNoteIndex, 1);
  }
  detachFromLane({lane, note}) {
    const notes = lane.notes;
    const removeIndex = notes.indexOf(note);

    if(removeIndex !== -1) {
      lane.notes.splice(removeIndex, 1);
    }
    else {
      console.warn('Failed to remove note from a lane as it didn\'t exist', lanes);
    }
  }
  move({sourceData, targetData}) {
    const lanes = this.lanes;

    const sourceLane = lanes.filter((lane) => {
      return lane.notes.indexOf(sourceData) >= 0;
    })[0];
    const targetLane = lanes.filter((lane) => {
      return lane.notes.indexOf(targetData) >= 0;
    })[0];
    const sourceNoteIndex = sourceLane.notes.indexOf(sourceData);
    const targetNoteIndex = targetLane.notes.indexOf(targetData);

    // get rid of the source
    sourceLane.notes.splice(sourceNoteIndex, 1);

    // and move it to target
    targetLane.notes.splice(targetNoteIndex, 0, sourceData);
  }
  load() {
    const rawLanes = storage.get('LaneStore') || [];
    return rawLanes.map(lane => ({
      ...lane,
      notes: lane.notes.map(id => NoteStore.find(id))
    }));
  }
  persist() {
    // MWE: This sideEffect triggers on each time 'toJson' changes (which has been declared reactively)
    sideEffect(() => {
      console.log('storing lanestore');
      // MWE: it woud be nicer to create a sideEffect per lane; in that case individual changed lanes are stored instead of all of them
      // MWE: at once, which would be more realistic when talking to a back-end
      // MWE: the toJSon method could also be inlined here, but separating the view generation and the side effect might trigger the right
      // MWE: mindset
      storage.set('LaneStore', this.toJson());
    });
  }
}

export default new LaneStore()
