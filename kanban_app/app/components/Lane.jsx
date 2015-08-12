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
    const sourceData = sourceProps.data || {};

    if(!targetProps.notes.length) {
      LaneStore.attachToLane({
        laneId: targetProps.id,
        noteId: sourceData.id
      });
    }
  }
};

@reactiveComponent
@DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class Lane extends React.Component {
  render() {
    const { connectDropTarget, id, name, notes, ...props } = this.props;

    return connectDropTarget(
      <div {...props}>
        <div className='lane-header'>
          <Editable className='lane-name' value={name}
            onEdit={this.editName.bind(null, id)} />
          <div className='lane-add-note'>
            <button onClick={this.addNote.bind(null, id)}>+</button>
          </div>
        </div>
        <Notes items={NoteStore.get(notes)}
          onEdit={this.editNote}
          onDelete={this.deleteNote.bind(null, id)} />
      </div>
    );
  }
  addNote(laneId) {
    const noteId = NoteStore.addNote({task: 'New task'});
    LaneStore.attachToLane({laneId, noteId});
  }
  editNote(noteId, task) {
    NoteStore.editNote(noteId, task);
  }
  deleteNote(laneId, noteId) {
    NoteStore.deleteNote(noteId);
    LaneStore.detachFromLane({laneId, noteId});
  }
  editName(id, name) {
    if(name) {
      LaneStore.editLane(id, name);
    }
    else {
      LaneStore.deleteLane(id);
    }
  }
}
