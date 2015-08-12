import React from 'react';
import Notes from './Notes.jsx';
import Editable from './Editable.jsx';
import { DropTarget } from 'react-dnd';
import {reactiveComponent} from 'mobservable';
import ItemTypes from './ItemTypes';
import NoteStore from '../stores/NoteStore';
import LaneStore from '../stores/LaneStore';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceData = sourceProps.data;
    const lane = targetProps.lane;

    if(!lane.notes.length) {
      LaneStore.attachToLane({
        lane: lane,
        note: sourceData
      });
    }
  }
};

@DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@reactiveComponent
export default class Lane extends React.Component {
  render() {
    const { connectDropTarget, lane, ...props } = this.props;
    const { name, notes } = lane;
    return connectDropTarget(
      <div {...props}>
        <div className='lane-header'>
          <Editable className='lane-name' value={name}
            onEdit={this.editName.bind(null, lane)} />
          <div className='lane-add-note'>
            <button onClick={this.addNote.bind(null, lane)}>+</button>
          </div>
        </div>
        <Notes items={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote.bind(null, lane)} />
      </div>
    );
  }
  addNote(lane) {
    const note = NoteStore.addNote({task: 'New task'});
    LaneStore.attachToLane({lane, note});
  }
  editNote(note, task) {
    NoteStore.editNote(note, task);
  }
  deleteNote(lane, note) {
    NoteStore.deleteNote(note);
    LaneStore.detachFromLane({lane, note});
  }
  editName(lane, name) {
    if(name) {
      LaneStore.editLane(lane, name);
    }
    else {
      LaneStore.deleteLane(lane);
    }
  }
}
