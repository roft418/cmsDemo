import React from "react";
import { DraggableItem } from "../commonComponent";
const initialSrc =
  "https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png";

@DraggableItem("content")
class SplitLine extends React.Component {
  render() {
    const { items, templateType } = this.props;
    console.log("SplitLine", items);

    return (
      <div
        className={`SplitLine ${
          this.props.sortId === this.props.curEditorSortId ? "active" : ""
        }`}
      >
        <span className={`img-item ${templateType ? "" : "initial"}`}>
          <img src={templateType ? templateType : initialSrc} alt="" />
        </span>
      </div>
    );
  }
}

export default SplitLine;
