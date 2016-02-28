import React from 'react';
import {observer} from 'mobx-react';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from './ItemTypes';

const noteSource = {
  beginDrag(props) {
    return {
      data: props.data
    };
  },
  isDragging(props, monitor) {
    return props.data === monitor.getItem().data;
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetData = targetProps.data;
    const sourceProps = monitor.getItem();
    const sourceData = sourceProps.data;

    if(sourceData.id !== targetData.id) {
      targetProps.onMove({sourceData, targetData});
    }
  }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@observer
export default class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget, isDragging,
      onMove, data, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <li style={{
        opacity: isDragging ? 0 : 1
      }} {...props}>{props.children}</li>
    ));
  }
}
