import React from "react";
import { DragSource, DropTarget } from "react-dnd";
import _ from "lodash";
import cn from "classnames";

const App = WrappedComponent => {
  class Hoc extends React.Component {
    render() {
      // console.info("Hoc", this.props);
      return _.flowRight(
        this.props.connectDragSource,
        this.props.connectDropTarget
      )(
        <div
          className={cn("DraggableItem", {
            active: this.props.sortId === this.props.curEditorSortId,
            "Item--dragging": this.props.isDragging,
            "Item--spacer": this.props.isSpacer
          })}
        >
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  }
  return Hoc;
};

export default DndTypes => WrappedComponent =>
  _.flowRight([
    DropTarget(
      DndTypes,
      {
        // hover(props, monitor) {
        //   const { sortId: destId } = props;
        //   const draggingItem = monitor.getItem();
        //   // console.info("hover", DndTypes, draggingItem.sortId, destId, props);
        //   if (draggingItem.sortId !== destId) {
        //     DndTypes === "content"
        //       ? props.handleMoveContent(draggingItem.sortId, destId)
        //       : props.handleMoveItem(draggingItem.sortId, destId);
        //   }
        // }
        drop(props, monitor) {
          const { sortId: destId } = props;
          const draggingItem = monitor.getItem();
          // console.info("hover", DndTypes, draggingItem.sortId, destId, props);
          if (draggingItem.sortId !== destId) {
            DndTypes === "content"
              ? props.handleMoveContent(draggingItem.sortId, destId)
              : props.handleMoveItem(draggingItem.sortId, destId);
          }
        }
      },
      connect => ({
        connectDropTarget: connect.dropTarget()
      })
    ),
    DragSource(
      DndTypes,
      {
        beginDrag(props) {
          console.info("DraggableItem", props);

          return { sortId: props.sortId };
        },
        isDragging(props, monitor) {
          // console.info(props.sortId === monitor.getItem().sortId);
          return props.sortId === monitor.getItem().sortId;
        }
      },
      (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
      })
    )
  ])(App(WrappedComponent));

//装饰器只能装饰class，导致后面全改写了！！！
//用key来识别会被每层消化，导致后面全改写了！！！
