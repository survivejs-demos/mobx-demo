import React from 'react';
import {observer} from 'mobx-react';
import Lane from './Lane.jsx';

@observer
export default class Lanes extends React.Component {
  render() {
    const lanes = this.props.items;

    return <div className='lanes'>{lanes.map(this.renderLane)}</div>;
  }
  renderLane(lane) {
    return <Lane className='lane' key={`lane${lane.id}`} lane={lane} />;
  }
}
