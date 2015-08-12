import React from 'react';
import Lanes from './Lanes.jsx';
import LaneStore from '../stores/LaneStore'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  constructor(props) {
    super(props);

    const store = LaneStore;

    this.addLane = store.addLane.bind(store, {name: 'New lane'});
  }
  render() {
    return (
      <div>
        <button onClick={this.addLane}>+</button>
        <Lanes items={LaneStore.lanes} />
      </div>
    );
  }
};
