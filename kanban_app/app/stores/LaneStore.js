import uuid from 'node-uuid';
import {makeReactive} from 'mobservable';
import update from 'react/lib/update';

class LaneStore {
  constructor() {
    this.lanes = makeReactive([
      {
        id: uuid.v4(),
        name: 'Todo',
        notes: []
      },
      {
        id: uuid.v4(),
        name: 'Doing',
        notes: []
      },
      {
        id: uuid.v4(),
        name: 'Done',
        notes: []
      }
    ])
  }
  addLane({name}) {
    this.lanes.push({id: uuid.v4(), name, notes: []})
  }
  editLane(id, name) {
    const lanes = this.lanes;
    const laneIndex = this.findLane(id);

    if(laneIndex < 0) {
      return;
    }

    this.lanes[laneIndex].name = name;
  }
  deleteLane(id) {
    const lanes = this.lanes;
    const laneIndex = this.findLane(id);

    if(laneIndex < 0) {
      return;
    }

    this.lanes.splice(laneIndex, 1);
  }
  findLane(id) {
    const lanes = this.lanes;
    const laneIndex = lanes.findIndex((lane) => lane.id === id);

    if(laneIndex < 0) {
      console.warn('Failed to find lane', lanes, id);
    }

    return laneIndex;
  }
  attachToLane({laneId, noteId}) {
    const lanes = this.lanes;
    const targetId = this.findLane(laneId);

    if(targetId < 0) {
      return;
    }

    this.removeNote(noteId);

    const lane = lanes[targetId];

    if(lane.notes.indexOf(noteId) === -1) {
      lane.notes.push(noteId);
    }
    else {
      console.warn('Already attached note to lane', lanes);
    }
  }
  removeNote(noteId) {
    const lanes = this.lanes;
    const removeLane = lanes.filter((lane) => {
      return lane.notes.indexOf(noteId) >= 0;
    })[0];

    if(!removeLane) {
      return;
    }

    const removeNoteId = removeLane.notes.indexOf(noteId);

    removeLane.notes = removeLane.notes.slice(0, removeNoteId).
      concat(removeLane.notes.slice(removeNoteId + 1));
  }
  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes;
    const targetId = this.findLane(laneId);

    if(targetId < 0) {
      return;
    }

    const lane = lanes[targetId];
    const notes = lane.notes;
    const removeId = notes.indexOf(noteId);

    if(lane.notes.indexOf(removeId) === -1) {
      lane.notes = notes.slice(0, removeId).concat(notes.slice(removeId + 1));
    }
    else {
      console.warn('Failed to remove note from a lane as it didn\'t exist', lanes);
    }
  }
  findLane(id) {
    let lanes = this.lanes;
    const laneIndex = lanes.findIndex((lane) => lane.id === id);

    if(laneIndex < 0) {
      console.warn('Failed to find lane', lanes, id);
    }

    return laneIndex;
  }
  move({sourceData, targetData}) {
    const lanes = this.lanes;
    const sourceId = sourceData.id;
    const targetId = targetData.id;

    if(!lanes) {
      // XXXXX: why this can happen?
      return;
    }

    const sourceLane = lanes.filter((lane) => {
      return lane.notes.indexOf(sourceId) >= 0;
    })[0];
    const targetLane = lanes.filter((lane) => {
      return lane.notes.indexOf(targetId) >= 0;
    })[0];
    const sourceNoteId = sourceLane.notes.indexOf(sourceId);
    const targetNoteId = targetLane.notes.indexOf(targetId);

    if(sourceLane === targetLane) {
      // move at once to avoid complications
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteId, 1],
          [targetNoteId, 0, sourceId]
        ]
      });
    }
    else {
      // get rid of the source
      sourceLane.notes.splice(sourceNoteId, 1);

      // and move it to target
      targetLane.notes.splice(targetNoteId, 0, sourceId);
    }

    this.setState({lanes});
  }
}

export default new LaneStore()
