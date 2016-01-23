import React from 'react';
import {observer} from 'mobservable-react';
import Note from './Note.jsx';

@observer
export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.renderNote = this.renderNote.bind(this);
  }
  render() {
    const notes = this.props.items;

    return <ul className='notes'>{notes.map(this.renderNote)}</ul>;
  }
  renderNote(note) {
    return (
      <li className='note' key={`note${note.id}`}>
        <Note
          task={note.task}
          onEdit={this.props.onEdit.bind(null, note)}
          onDelete={this.props.onDelete.bind(null, note)} />
      </li>
    );
  }
}
